import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_CONTANTS } from 'src/constants/cache.contants';
import { SettingsService } from '../settings/settings.service';
@Injectable()
export class BlacklistService {
  private readonly blackListConstant = CACHE_CONTANTS.BLACK_LIST;

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly settings: SettingsService,
  ) {
    this.init();
  }
  /** Getters and setters */
  public get list() {
    return this.getBlackList();
  }
  /** Getters and setters */

  /** Private Methods */
  private async init() {
    const blacklist: string[] = await this.settings.getBlackList();
    await this.updateBlacklistInCache(blacklist ?? []);
  }
  private async updateBlacklistInCache(blacklist: string[]): Promise<void> {
    this.cacheManager.set(this.blackListConstant.NAME, blacklist);
  }
  private async updateBlacklistInDB(blacklist: string[]): Promise<string[]> {
    return this.settings.updateOrCreate({
      name: this.blackListConstant.NAME,
      description: this.blackListConstant.DESCRIPTION,
      value: blacklist,
    });
  }
  /** Private Methods */

  async getBlackList(): Promise<string[]> {
    return this.cacheManager.get(this.blackListConstant.NAME);
  }

  async verify(userId: string): Promise<boolean> {
    return !!(await this.list)?.find(item => item === userId);
  }

  async add(userId: string): Promise<void> {
    const isUserAlreadyBlacklisted = await this.verify(userId);
    if (isUserAlreadyBlacklisted) return;

    const blacklist: string[] = (await this.list) ?? [];

    const result: string[] = await this.updateBlacklistInDB([
      ...blacklist,
      userId,
    ]);

    await this.updateBlacklistInCache(result);
  }

  async remove(userId) {
    const isUserBlacklisted = await this.verify(userId);
    if (!isUserBlacklisted) return;

    const blacklist: string[] = await this.list;
    const filteredBlackList = blacklist.filter(item => item !== userId);
    await this.settings.removeItemFromBlackList(userId);
    await this.updateBlacklistInCache(filteredBlackList);
  }
}
