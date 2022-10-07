import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { UpdateProjectDto } from 'src/dtos/project.dto';

import { ProjectService } from 'src/project/project.service';

@Injectable()
export class ProjectPipe implements PipeTransform {
  constructor(private readonly projectService: ProjectService) {}
  async transform(value: any, metadata: ArgumentMetadata) {
    const updateProjectDto: UpdateProjectDto =
      await this.projectService.getRequiredData(value);
    return !value.title
      ? updateProjectDto
      : {
          ...updateProjectDto,
          slug: value.title.trim().replace(/ /g, '_').toUpperCase(),
        };
  }
}
