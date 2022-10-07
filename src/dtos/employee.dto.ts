import { OmitType, PartialType } from '@nestjs/mapped-types';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { DesignationEntity } from '../entities/designation.entity';
import { ProjectEntity } from '../entities/project.entity';
export class EmployeeDto {
  @IsString()
  name: string;

  @IsNumber()
  salary: number;

  @IsString()
  joiningDate?: string;

  @IsString()
  designationId?: string;

  @IsString()
  @IsOptional()
  @IsArray()
  projectIds?: string[];

  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  projects?: ProjectEntity[];

  @IsOptional()
  @IsObject()
  designation?: DesignationEntity;
}

export class CreateEmployeeDto extends OmitType(EmployeeDto, [
  'designationId',
  'projectIds',
  'projects',
] as const) {}

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {
  @IsOptional()
  @IsBoolean()
  hasResigned?: boolean;
}
