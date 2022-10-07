import { Injectable } from '@nestjs/common';
import { DesignationDto } from 'src/dtos/designation.dto';
import { Repository, DataSource } from 'typeorm';
import { DesignationEntity } from '../entities/designation.entity';
@Injectable()
export class DesignationRepository extends Repository<DesignationEntity> {
  constructor(dataSource: DataSource) {
    super(DesignationEntity, dataSource.createEntityManager());
  }
  async getAll(): Promise<DesignationEntity[]> {
    return this.find();
  }

  async getById(id: string): Promise<DesignationEntity> {
    return this.findOneBy({ id });
  }

  async createDesignation(
    designationDto: DesignationDto,
  ): Promise<DesignationEntity> {
    const designation: DesignationEntity = this.create(designationDto);
    return this.save(designation);
  }

  async updateDesignation(
    id: string,
    designationDto: DesignationDto,
  ): Promise<DesignationEntity> {
    return this.save({
      id,
      ...designationDto,
    });
  }
  async deleteDesignation(id: string): Promise<boolean> {
    const deletedResult = await this.delete(id);
    return deletedResult.affected > 0;
  }
}
