import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// AppController 声明了 @Controller，代表这个 class 可以被注入，nest 也会把它放到 IOC 容器里
/**
 * 为什么 Controller 是单独的装饰器呢？
 * 因为 Service 是*可以被注入也是可以注入*到别的对象的，所以用 @Injectable 声明。
 * 而 Controller *只需要被注入*，所以 nest 单独给它加了 @Controller 的装饰器。
 */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    debugger;
    return this.appService.getHello();
  }
}
