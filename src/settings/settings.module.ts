import { Module } from '@nestjs/common';
import { SettingsRepository } from 'src/repositories/settings.repostory';
import { SettingsService } from './settings.service';

@Module({
  providers: [SettingsRepository, SettingsService],
  exports: [SettingsService],
})
export class SettingsModule {}
