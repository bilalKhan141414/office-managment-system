import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export type useFactoryType = (
  ...args: any[]
) => Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions;
