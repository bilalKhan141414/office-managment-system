import { CacheModule, CacheModuleOptions, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SettingsModule } from 'src/settings/settings.module';
import { BlacklistService } from './blacklist.service';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService): CacheModuleOptions => ({
        ttl: config.get<number>('CACHE_EXPIRATION_TIME'),
      }),
      isGlobal: true,
    }),
    SettingsModule,
  ],
  providers: [BlacklistService],
  exports: [BlacklistService],
})
export class BlacklistModule {}
