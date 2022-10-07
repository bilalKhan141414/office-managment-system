import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { EmployeeEntity } from '../entities/employee.entity';
export class ProjectDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsArray()
  employeeIds?: string[];

  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  employees?: EmployeeEntity[];
}

export class CreateProjectDto extends OmitType(ProjectDto, [
  'employeeIds',
  'employees',
] as const) {}

export class UpdateProjectControllerDto extends PartialType(ProjectDto) {}

export class UpdateProjectDto extends PartialType(
  OmitType(ProjectDto, ['employeeIds'] as const),
) {}
