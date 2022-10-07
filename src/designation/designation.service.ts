import { Injectable } from '@nestjs/common';
import { DesignationDto } from 'src/dtos/designation.dto';
import { DesignationEntity } from 'src/entities/designation.entity';
import { DesignationRepository } from 'src/repositories/designation.repository';

@Injectable()
export class DesignationService {
  constructor(private readonly repo: DesignationRepository) {}
  async getDesignations(): Promise<DesignationEntity[]> {
    return this.repo.getAll();
  }
  async getDesignation(id: string): Promise<DesignationEntity> {
    return this.repo.getById(id);
  }
  async create(designation: DesignationDto): Promise<DesignationEntity> {
    return this.repo.createDesignation(designation);
  }

  async update(
    id: string,
    designation: DesignationDto,
  ): Promise<DesignationEntity> {
    return this.repo.updateDesignation(id, designation);
  }

  async delete(id: string): Promise<boolean> {
    return this.repo.deleteDesignation(id);
  }
}
