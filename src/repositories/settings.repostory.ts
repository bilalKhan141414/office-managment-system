import { Injectable } from '@nestjs/common';
import { CACHE_CONTANTS } from 'src/constants/cache.contants';
import { SettingsEntity } from 'src/entities/settings.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateSettingsDto } from '../dtos/create-settings.dto';

@Injectable()
export class SettingsRepository extends Repository<SettingsEntity> {
  private readonly settingsConstants = CACHE_CONTANTS;
  constructor(datasource: DataSource) {
    super(SettingsEntity, datasource.createEntityManager());
  }

  async updateOrCreateSettings(
    settings: CreateSettingsDto,
  ): Promise<SettingsEntity> {
    const result: SettingsEntity = await this.getSetting(
      this.settingsConstants.BLACK_LIST.NAME,
    );
    const setting: SettingsEntity = this.create(settings);
    return this.save({
      id: result?.id,
      ...setting,
    });
  }

  async GetAllSettings(): Promise<SettingsEntity[]> {
    return this.find();
  }

  async getSetting(name: string): Promise<SettingsEntity> {
    return this.findOneBy({ name: name });
  }

  async removeFromBlackList(userId: string): Promise<string[]> {
    const setting: SettingsEntity = await this.getSetting(
      this.settingsConstants.BLACK_LIST.NAME,
    );
    const blacklist: string[] = (setting?.value ?? []) as string[];

    const result = await this.updateOrCreateSettings({
      value: blacklist?.filter((uid: string) => uid !== userId),
    });
    return (result?.value ?? []) as string[];
  }
}
