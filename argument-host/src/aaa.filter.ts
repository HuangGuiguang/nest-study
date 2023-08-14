import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { AaaException } from './AaaException';
import { Response } from 'express';

// Catch会捕获所有异常
@Catch(AaaException)
export class AaaFilter<T> implements ExceptionFilter {
  catch(exception: AaaException, host: ArgumentsHost) {
    // console.log(exception, host);
    // console.log(host.getArgs(), host.getType(), host.switchToHttp());
    if (host.getType() === 'http') {
      const ctx = host.switchToHttp();
      const res = ctx.getResponse<Response>();
      const req = ctx.getRequest<Request>();

      res.status(500).json({
        aaa: exception.aaa,
        bbb: exception.bbb,
      });
    } else if (host.getType() === 'rpc') {
    } else if (host.getType() === 'ws') {
    }
  }
}
