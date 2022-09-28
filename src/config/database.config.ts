import { ConfigService } from '@nestjs/config';
import { useFactoryType } from 'src/types/db.types';
import { ENTITIES } from 'src/utils/entities.util';

export const useFactory: useFactoryType = (configService: ConfigService) => ({
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: +configService.get('DB_PORT'),
  username: configService.get('DB_USER'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  // autoLoadEntities: configService.get('DB_AUTO_LOAD_ENTITIES'),
  synchronize: configService.get('DB_SYNCHRONIZE'), // not use in production this will refresh db
  entities: [...ENTITIES],
});
