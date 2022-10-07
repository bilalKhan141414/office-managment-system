import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { ProjectRepository } from '../repositories/project.repository';
import { EmployeeModule } from 'src/employee/employee.module';
import { EmployeesProjectsRepository } from 'src/repositories/employee-projects.repository';

@Module({
  imports: [EmployeeModule],
  controllers: [ProjectController],
  providers: [ProjectService, ProjectRepository, EmployeesProjectsRepository],
  exports: [ProjectRepository],
})
export class ProjectModule {}
