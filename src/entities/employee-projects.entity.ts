import { Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { EmployeeEntity } from './employee.entity';
import { ProjectEntity } from './project.entity';

@Entity({
  name: 'tbl_employe_projects',
})
@Unique('employee_project_unique', ['employee', 'project'])
export class EmployeeProjectsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => EmployeeEntity, employee => employee.projects, {
    cascade: true,
  })
  employee: EmployeeEntity;

  @ManyToOne(() => ProjectEntity, project => project.employees, {
    eager: true,
    cascade: true,
  })
  project: ProjectEntity;
}
