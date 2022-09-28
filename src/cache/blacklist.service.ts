import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_CONTANTS } from 'src/constants/cache.contants';
@Injectable()
export class BlacklistService {
  blackListConstant: string = CACHE_CONTANTS.BLACK_LIST;
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  public get list() {
    return this.getBlackList();
  }

  async getBlackList(): Promise<string[]> {
    return this.cacheManager.get(this.blackListConstant);
  }

  async verify(userId: string): Promise<boolean> {
    return !!(await this.list)?.find((item) => item === userId);
  }

  async add(userId: string): Promise<void> {
    const isUserAlreadyBlacklisted = await this.verify(userId);
    if (isUserAlreadyBlacklisted) return;
    const blacklist: string[] = (await this.list) ?? [];
    await this.cacheManager.set(this.blackListConstant, [...blacklist, userId]);
  }

  async remove(userId) {
    const isUserBlacklisted = await this.verify(userId);
    if (!isUserBlacklisted) return;

    const blacklist: string[] = await this.list;
    const filteredBlackList = blacklist.filter((item) => item !== userId);
    await this.cacheManager.set(CACHE_CONTANTS.BLACK_LIST, filteredBlackList);
  }
}
