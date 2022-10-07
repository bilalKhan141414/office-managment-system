import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Body,
  Param,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectEntity } from '../entities/project.entity';
import { RESPONSE_MESSAGES } from 'src/constants/message.constants';
import { ProjectDto, UpdateProjectControllerDto } from 'src/dtos/project.dto';
import { ProjectPipe } from 'src/pipes/project/project.pipe';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get('/')
  async Project() {
    const projects: ProjectEntity[] = await this.projectService.getRecords();
    return {
      data: projects,
    };
  }
  @Post('/')
  async CreateProject(@Body(ProjectPipe) projectDto: ProjectDto) {
    console.log('controller::', projectDto);
    const project: ProjectEntity = await this.projectService.create(projectDto);

    return {
      message: RESPONSE_MESSAGES.CRUD.CREATE.SUCCESS,
      data: project,
    };
  }

  @Put('/:id')
  async UpdateProject(
    @Param() { id },
    @Body(ProjectPipe) projectDto: UpdateProjectControllerDto,
  ) {
    const project: ProjectEntity = await this.projectService.update(
      id,
      projectDto,
    );

    return {
      message: RESPONSE_MESSAGES.CRUD.UPDATE.SUCCESS,
      data: project,
    };
  }

  @Delete('/:id')
  async DeleteProject(@Param() { id }) {
    const result = await this.projectService.delete(id);
    return {
      message: RESPONSE_MESSAGES.CRUD.DELETE.SUCCESS,
      data: { affected: result },
    };
  }
}
