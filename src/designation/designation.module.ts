import { Module } from '@nestjs/common';
import { DesignationController } from './designation.controller';
import { DesignationService } from './designation.service';
import { DesignationRepository } from '../repositories/designation.repository';

@Module({
  controllers: [DesignationController],
  providers: [DesignationService, DesignationRepository],
  exports: [DesignationService, DesignationRepository],
})
export class DesignationModule {}
