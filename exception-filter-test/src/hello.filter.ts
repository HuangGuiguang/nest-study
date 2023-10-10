import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  BadRequestException,
  HttpException,
  Inject,
} from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Catch(HttpException)
export class HelloFilter implements ExceptionFilter {
  @Inject(AppService)
  private service: AppService;
  catch(exception: HttpException, host: ArgumentsHost) {
    // debugger;
    const http = host.switchToHttp();
    const response = http.getResponse<Response>();

    const statusCode = exception.getStatus();

    response.status(statusCode).json({
      code: statusCode,
      message: exception.message,
      error: 'bad request',
      xxx: 111,
      yyy: this.service.getHello(),
    });
  }
}
