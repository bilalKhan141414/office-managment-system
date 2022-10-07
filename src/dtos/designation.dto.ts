import { OmitType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';
export class DesignationDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  slug?: string;
}
