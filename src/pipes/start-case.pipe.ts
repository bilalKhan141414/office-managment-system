import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
@Injectable()
export class StarCasePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return {
      ...value,
      slug: value.title.trim().replace(/ /g, '_').toUpperCase(),
    };
  }
}
