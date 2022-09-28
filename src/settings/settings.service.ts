import { Injectable } from '@nestjs/common';
import { CreateSettingsDto } from 'src/dtos/create-settings.dto';
import { SettingsRepository } from 'src/repositories/settings.repostory';

@Injectable()
export class SettingsService {
  constructor(private repo: SettingsRepository) {}

  async create(settingsDetials: CreateSettingsDto) {}
}
