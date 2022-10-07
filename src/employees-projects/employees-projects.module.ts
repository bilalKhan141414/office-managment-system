import { Module } from '@nestjs/common';
import { EmployeeProjectService } from './employees-projects.service';

@Module({
  providers: [EmployeeProjectService],
})
export class EmployeeProjectModule {}
