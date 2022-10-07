import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AllExceptionsFilter } from './exception.filter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { useFactory } from './config/database.config';
import { JwtAuthGuard } from './auth/jwt/jwt.guard';
import { BlacklistModule } from './cache/blacklist.module';
import { JwtService } from '@nestjs/jwt';
import { EmployeeModule } from './employee/employee.module';
import { ProjectModule } from './project/project.module';
import { DesignationModule } from './designation/designation.module';
import { EmployeeProjectModule } from './employees-projects/employees-projects.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory,
    }),
    BlacklistModule,
    AuthModule,
    EmployeeModule,
    ProjectModule,
    DesignationModule,
    EmployeeProjectModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    JwtService,
  ],
})
export class AppModule {}
