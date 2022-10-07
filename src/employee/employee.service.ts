import { Injectable } from '@nestjs/common';
import { EmployeeRepository } from '../repositories/employee.repository';
import {
  CreateEmployeeDto,
  EmployeeDto,
  UpdateEmployeeDto,
} from '../dtos/employee.dto';
import { DesignationRepository } from '../repositories/designation.repository';
import { EmployeeEntity } from '../entities/employee.entity';
import { BadRequestException } from '@nestjs/common/exceptions';
import { ProjectRepository } from 'src/repositories/project.repository';
import { EmployeesProjectsRepository } from 'src/repositories/employee-projects.repository';

@Injectable()
export class EmployeeService {
  constructor(
    private readonly repo: EmployeeRepository,
    private readonly designationRepo: DesignationRepository,
    private readonly epRepo: EmployeesProjectsRepository,
    private readonly proejctRepo: ProjectRepository,
  ) {}
  // Private Methods

  // Private Methods

  // this method is used in employee.pipe.ts
  async getRequiredData(employeeDto: EmployeeDto): Promise<UpdateEmployeeDto> {
    const { designationId, projectIds, ...rest } = employeeDto;
    let projects = null;
    const designation = await this.designationRepo.getById(designationId);
    if (!designation) {
      throw new BadRequestException(
        'Designation with provided designationId is not found',
      );
    }
    if (projectIds?.length) {
      projects = await this.proejctRepo.getByIds(projectIds);
    }

    return {
      projects,
      designation,
      ...rest,
    };
  }
  async getEmployees(): Promise<EmployeeEntity[]> {
    return this.repo.getAll();
  }
  async getEmployeesByIds(ids: string[]): Promise<EmployeeEntity[]> {
    return this.repo.getByIds(ids);
  }
  async getEmployee(id: string): Promise<EmployeeEntity> {
    return this.repo.getById(id);
  }
  async create({
    projects,
    ...employeeDto
  }: EmployeeDto): Promise<EmployeeEntity> {
    const employee = await this.repo.createRecord(employeeDto);
    if (projects?.length) {
      await this.epRepo.assignEmployeeToProjects({ projects, employee });
    }
    return employee;
  }

  async update(
    id: string,
    employeeDto: UpdateEmployeeDto,
  ): Promise<EmployeeEntity> {
    return this.repo.updateRecord(id, employeeDto);
  }

  async delete(id: string): Promise<boolean> {
    return this.repo.deleteRecord(id);
  }
}
