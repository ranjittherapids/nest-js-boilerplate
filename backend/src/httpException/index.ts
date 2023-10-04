import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { APP_URL } from '@src/config';
import { IBadRequest } from './dto';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private getErrorMessage = (exception: any) => {
    if (exception instanceof BadRequestException)
      return (exception.getResponse() as IBadRequest).message;

    return exception.message || 'Internal server error';
  };
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const { url, method, body } = request;
    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = this.getErrorMessage(exception);

    const data = {
      status: false,
      url: `${APP_URL}${url}`,
      method,
      body,
      message,
      timestamp: new Date().toISOString(),
    };

    Logger.error(`${method} ${url}, Error: ${message}`, 'HTTP');

    response.status(statusCode).json(data);
  }
}
