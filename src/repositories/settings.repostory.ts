import { Injectable } from '@nestjs/common';
import { SettingsEntity } from 'src/entities/settings.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateSettingsDto } from '../dtos/create-settings.dto';

@Injectable()
export class SettingsRepository extends Repository<SettingsEntity> {
  constructor(datasource: DataSource) {
    super(SettingsEntity, datasource.createEntityManager());
  }

  async createSetting(settings: CreateSettingsDto): Promise<SettingsEntity> {
    const setting: SettingsEntity = this.create(settings);
    return this.save(setting);
  }

  async GetSettingByName(name: string): Promise<SettingsEntity> {
    return this.findOneBy({ name });
  }
  async GetAllSettings(): Promise<SettingsEntity[]> {
    return this.find();
  }
}
