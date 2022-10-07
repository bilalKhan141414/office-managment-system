import { ProjectEntity } from '../entities/project.entity';
import { EmployeeEntity } from '../entities/employee.entity';
export class EmployeeProjectsDto {
  employee: EmployeeEntity;
  projects: ProjectEntity[];
}

export class ProjectEmployeesDto {
  project: ProjectEntity;
  employees: EmployeeEntity[];
}
