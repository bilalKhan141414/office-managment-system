import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Body,
  Param,
} from '@nestjs/common';
import { DesignationService } from './designation.service';
import { DesignationEntity } from '../entities/designation.entity';
import { RESPONSE_MESSAGES } from 'src/constants/message.constants';
import { DesignationDto } from 'src/dtos/designation.dto';
import { StarCasePipe } from 'src/pipes/start-case.pipe';

@Controller('designation')
export class DesignationController {
  constructor(private readonly designationService: DesignationService) {}

  @Get('/')
  async Designation() {
    const designation: DesignationEntity[] =
      await this.designationService.getDesignations();
    return {
      data: designation,
    };
  }

  @Post('/')
  async CreateDesignation(@Body(StarCasePipe) designationDto: DesignationDto) {
    const designation: DesignationEntity = await this.designationService.create(
      designationDto,
    );

    return {
      message: RESPONSE_MESSAGES.CRUD.CREATE.SUCCESS,
      data: designation,
    };
  }

  @Put('/:id')
  async UpdateDesignation(
    @Param() { id }: { id: string },
    @Body(StarCasePipe) designationDto: DesignationDto,
  ) {
    const designation: DesignationEntity = await this.designationService.update(
      id,
      designationDto,
    );

    return {
      message: RESPONSE_MESSAGES.CRUD.UPDATE.SUCCESS,
      data: designation,
    };
  }

  @Delete('/:id')
  async DeleteDesignation(@Param() { id }: { id: string }) {
    const result = await this.designationService.delete(id);
    return {
      message: RESPONSE_MESSAGES.CRUD.DELETE.SUCCESS,
      data: { affected: result },
    };
  }
}
