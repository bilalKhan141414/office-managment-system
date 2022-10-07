import { Injectable } from '@nestjs/common';
import { ProjectDto, UpdateProjectDto } from 'src/dtos/project.dto';
import { ProjectEntity } from 'src/entities/project.entity';
import { Repository, DataSource, In } from 'typeorm';
import { CreateProjectDto } from '../dtos/project.dto';
import { EmployeesProjectsRepository } from './employee-projects.repository';
import { EmployeeEntity } from '../entities/employee.entity';
import { ProjectEmployeesDto } from 'src/dtos/employee-projects.dto';

@Injectable()
export class ProjectRepository extends Repository<ProjectEntity> {
  constructor(
    dataSource: DataSource,
    private readonly epRepo: EmployeesProjectsRepository,
  ) {
    super(ProjectEntity, dataSource.createEntityManager());
  }

  async getAll(): Promise<ProjectEntity[]> {
    return this.find();
  }

  async getById(id: string): Promise<ProjectEntity> {
    return this.findOneBy({ id });
  }

  async getByIds(ids: string[]): Promise<ProjectEntity[]> {
    return this.find({
      where: {
        id: In(ids),
      },
    });
  }
  async createRecord(
    createProjectDto: CreateProjectDto,
  ): Promise<ProjectEntity> {
    const project: ProjectEntity = await this.create(createProjectDto);
    return this.save(project);
  }

  async updateRecord(
    id: string,
    createProjectDto: CreateProjectDto,
  ): Promise<ProjectEntity> {
    return this.save({
      id,
      ...createProjectDto,
    });
  }

  async deleteRecord(id: string): Promise<boolean> {
    const project = await this.getById(id);
    await this.epRepo.deleteRecordByProjectEntity(project);
    const deletedResult = await this.delete(id);
    return deletedResult.affected > 0;
  }

  async assignProjectToEmployees(
    projectEmployeeDto: ProjectEmployeesDto,
  ): Promise<void> {
    await this.epRepo.assignProjectToEmployees(projectEmployeeDto);
  }
}
