import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { DesignationModule } from '../designation/designation.module';
import { EmployeeRepository } from '../repositories/employee.repository';
import { EmployeesProjectsRepository } from 'src/repositories/employee-projects.repository';
import { ProjectRepository } from '../repositories/project.repository';

@Module({
  imports: [DesignationModule],
  controllers: [EmployeeController],
  providers: [
    EmployeeService,
    EmployeeRepository,
    EmployeesProjectsRepository,
    ProjectRepository,
  ],
  exports: [EmployeeService],
})
export class EmployeeModule {}
