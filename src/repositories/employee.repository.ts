import { Injectable } from '@nestjs/common';
import { Repository, DataSource, In } from 'typeorm';
import { EmployeeEntity } from '../entities/employee.entity';
import { CreateEmployeeDto, UpdateEmployeeDto } from '../dtos/employee.dto';
import { EmployeeProjectsDto } from '../dtos/employee-projects.dto';
import { EmployeesProjectsRepository } from './employee-projects.repository';

@Injectable()
export class EmployeeRepository extends Repository<EmployeeEntity> {
  constructor(
    dataSource: DataSource,
    private readonly epRepo: EmployeesProjectsRepository,
  ) {
    super(EmployeeEntity, dataSource.createEntityManager());
  }

  async getAll(): Promise<EmployeeEntity[]> {
    return this.find();
  }
  async getByIds(ids: string[]): Promise<EmployeeEntity[]> {
    return this.find({
      where: {
        id: In(ids),
      },
    });
  }
  async getById(id: string): Promise<EmployeeEntity> {
    return this.findOneBy({ id });
  }

  async createRecord(employeeDto: CreateEmployeeDto): Promise<EmployeeEntity> {
    const employee: EmployeeEntity = this.create(employeeDto);
    return this.save(employee);
  }

  async updateRecord(
    id: string,
    employeeDto: Partial<UpdateEmployeeDto>,
  ): Promise<EmployeeEntity> {
    return this.save({
      id,
      ...employeeDto,
    });
  }

  async deleteRecord(id: string): Promise<boolean> {
    const deletedResult = await this.delete(id);
    return deletedResult.affected > 0;
  }

  async assignEmployeeToProjects(
    employeeProjectsDto: EmployeeProjectsDto,
  ): Promise<void> {
    await this.epRepo.assignEmployeeToProjects(employeeProjectsDto);
  }
}
