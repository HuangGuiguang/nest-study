import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppService } from './app.service';

@Injectable()
export class AaaMiddleware implements NestMiddleware {
  constructor(private readonly appService: AppService) {}
  /**
   * Nest 为什么要把 Middleware 做成 class 呢？
   * 当然是为了依赖注入了！
   */
  use(req: Request, res: Response, next: () => void) {
    console.log('before');
    console.log(this.appService.getHello());
    next();
    console.log('after');
  }
}
