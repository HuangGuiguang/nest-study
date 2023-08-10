import {
  ExceptionFilter,
  Catch,
  HttpException,
  ArgumentsHost,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class AaaFilter implements ExceptionFilter {
  /**
   *
   * @param exception
   * @param host  * Provides methods for retrieving the arguments being passed to a handler.
   * Allows choosing the appropriate execution context (e.g., Http, RPC, or
   * WebSockets) to retrieve the arguments from.
   */
  catch(exception: HttpException, host: ArgumentsHost) {
    const response: Response = host.switchToHttp().getResponse();
    response.status(exception.getStatus()).json({
      msg: exception.message,
      other: exception.cause + exception.name,
    });
  }
}
