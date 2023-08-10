import { Controller, Get, Inject, Optional } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  // 构造器注入
  constructor(
    // private readonly appService: AppService,
    @Inject('person') private person: { name: string; age: number },
  ) {}

  // 属性注入
  @Inject(AppService)
  private readonly appService: AppService;

  @Inject('app_Service')
  private readonly app_service: { name: string; age: number };

  // 注入非必需的provider
  @Optional()
  @Inject('person1')
  private person1: { name: string };

  @Get()
  getHello(): string {
    console.log(this.person, this.appService, this.app_service, this.person1);
    return this.appService.getHello();
  }
}
