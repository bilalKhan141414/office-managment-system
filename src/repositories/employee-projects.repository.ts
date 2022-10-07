import { Injectable } from '@nestjs/common';
import { ProjectDto, UpdateProjectDto } from 'src/dtos/project.dto';
import { Repository, DataSource } from 'typeorm';
import { CreateProjectDto } from '../dtos/project.dto';
import { EmployeeProjectsEntity } from '../entities/employee-projects.entity';
import { ProjectEntity } from '../entities/project.entity';
import { EmployeeEntity } from '../entities/employee.entity';
import { EmployeeProjectsDto } from 'src/dtos/employee-projects.dto';
import { ProjectEmployeesDto } from '../dtos/employee-projects.dto';

@Injectable()
export class EmployeesProjectsRepository extends Repository<EmployeeProjectsEntity> {
  constructor(dataSource: DataSource) {
    super(EmployeeProjectsEntity, dataSource.createEntityManager());
  }

  async assignProjectToEmployees({
    project,
    employees,
  }: ProjectEmployeesDto): Promise<void> {
    const allProjectEmployees: Promise<EmployeeProjectsEntity>[] = employees
      .map(employee =>
        this.create({
          project,
          employee,
        }),
      )
      .map(entity => this.save(entity));
    await Promise.all(allProjectEmployees);
  }
  async assignEmployeeToProjects({
    projects,
    employee,
  }: EmployeeProjectsDto): Promise<void> {
    const allProjectEmployees: Promise<EmployeeProjectsEntity>[] = projects
      .map(project =>
        this.create({
          project,
          employee,
        }),
      )
      .map(entity => this.save(entity));
    await Promise.all(allProjectEmployees);
  }

  async deleteRecordByProjectEntity(project: ProjectEntity): Promise<boolean> {
    const deletedResult = await this.delete({
      project,
    });
    return deletedResult.affected > 0;
  }

  async deleteRecordByEmployeeEntity(
    employee: EmployeeEntity,
  ): Promise<boolean> {
    const deletedResult = await this.delete({
      employee,
    });
    return deletedResult.affected > 0;
  }
}
