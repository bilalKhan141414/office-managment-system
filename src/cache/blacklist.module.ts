import {
  CacheModule,
  CacheModuleOptions,
  CACHE_MANAGER,
  Module,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BLACK_LIST_PROVIDER } from 'src/constants/provider.contants';
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
  ],
  providers: [BlacklistService],
  exports: [BlacklistService],
})
export class BlacklistModule {}
