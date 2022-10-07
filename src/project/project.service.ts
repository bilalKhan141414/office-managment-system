import { BadRequestException, Injectable } from '@nestjs/common';
import { ProjectDto, UpdateProjectDto } from 'src/dtos/project.dto';
import { ProjectRepository } from '../repositories/project.repository';
import { ProjectEntity } from '../entities/project.entity';
import { EmployeeService } from '../employee/employee.service';
import { CreateProjectDto } from '../dtos/project.dto';

@Injectable()
export class ProjectService {
  constructor(
    private readonly repo: ProjectRepository,
    private readonly employeeService: EmployeeService,
  ) {}
  // this method is used in employee.pipe.ts
  async getRequiredData(projectDto: ProjectDto): Promise<UpdateProjectDto> {
    const { employeeIds, ...rest } = projectDto;
    let employees = null;
    if (employeeIds?.length) {
      employees = await this.employeeService.getEmployeesByIds(employeeIds);
      if (!employees?.length) {
        throw new BadRequestException(
          'Employees with provided employeeIds donot exist',
        );
      }
    }
    return {
      employees,
      ...rest,
    };
  }
  async getRecords(): Promise<ProjectEntity[]> {
    return this.repo.getAll();
  }
  async getRecord(id: string): Promise<ProjectEntity> {
    return this.repo.getById(id);
  }
  async create({
    employees,
    ...employeeDto
  }: ProjectDto): Promise<ProjectEntity> {
    const project = await this.repo.createRecord(employeeDto);
    if (employees?.length) {
      await this.repo.assignProjectToEmployees({ project, employees });
    }
    return project;
  }

  async update(
    id: string,
    { employees, ...employeeDto }: UpdateProjectDto,
  ): Promise<ProjectEntity> {
    const project = await this.repo.updateRecord(
      id,
      employeeDto as CreateProjectDto,
    );
    if (employees?.length) {
      await this.repo.assignProjectToEmployees({ project, employees });
    }
    return project;
  }

  async delete(id: string): Promise<boolean> {
    return this.repo.deleteRecord(id);
  }
}
