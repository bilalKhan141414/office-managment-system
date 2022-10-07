import { UserEntity } from 'src/entities/user.entity';
import { SettingsEntity } from 'src/entities/settings.entity';
import { EmployeeEntity } from '../entities/employee.entity';
import { ProjectEntity } from '../entities/project.entity';
import { EmployeeProjectsEntity } from '../entities/employee-projects.entity';
import { DesignationEntity } from '../entities/designation.entity';

export const ENTITIES = [
  UserEntity,
  SettingsEntity,
  EmployeeEntity,
  ProjectEntity,
  EmployeeProjectsEntity,
  DesignationEntity,
];
