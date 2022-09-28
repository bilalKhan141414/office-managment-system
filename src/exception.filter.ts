import { Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { QueryFailedError } from 'typeorm';
import { sendCustomExceptionResponse } from './utils/exception.util';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const isUniqueFiledException =
      exception instanceof QueryFailedError && exception['code'] === '23505';

    if (isUniqueFiledException) {
      const message = exception['detail'].replace(
        /^Key \((.*)\)=\((.*)\) (.*)/,
        'This $1 $2 already exists.',
      );
      return sendCustomExceptionResponse(
        exception,
        host,
        httpAdapter,
        message,
        HttpStatus.BAD_REQUEST,
      );
    }

    super.catch(exception, host);
  }
}
