import { ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';

export const sendCustomExceptionResponse = (
  exception: any,
  host: ArgumentsHost,
  httpAdapter: any,
  message?: string,
  statusCode?: HttpStatus,
) => {
  const ctx = host.switchToHttp();

  const httpStatus =
    statusCode ??
    (exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR);

  const responseBody = {
    statusCode: httpStatus,
    timestamp: new Date().toISOString(),
    path: httpAdapter.getRequestUrl(ctx.getRequest()),
    message,
  };

  httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
};
