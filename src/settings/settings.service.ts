import { Injectable } from '@nestjs/common';
import { CreateSettingsDto } from 'src/dtos/create-settings.dto';
import { SettingsRepository } from 'src/repositories/settings.repostory';
import { SettingsEntity } from '../entities/settings.entity';
import { CACHE_CONTANTS } from '../constants/cache.contants';

@Injectable()
export class SettingsService {
  private readonly settingsConstants = CACHE_CONTANTS;
  constructor(private repo: SettingsRepository) {}

  async updateOrCreate(settingsDetials: CreateSettingsDto): Promise<string[]> {
    const result: SettingsEntity = await this.repo.updateOrCreateSettings(
      settingsDetials,
    );
    return (result?.value ?? []) as string[];
  }

  async getBlackList(): Promise<string[]> {
    const result: SettingsEntity = await this.repo.getSetting(
      this.settingsConstants.BLACK_LIST.NAME,
    );
    return (result?.value ?? []) as string[];
  }

  async removeItemFromBlackList(userId: string): Promise<string[]> {
    return this.repo.removeFromBlackList(userId);
  }
}
