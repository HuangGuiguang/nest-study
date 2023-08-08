import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  // 构造器注入
  constructor(
    private readonly appService: AppService,
    @Inject('person2') private person2: { name: string; age: number },
  ) {}

  // 属性注入
  //   @Inject(AppService)
  //   private readonly appServiceInject: AppService;

  // token注入
  @Inject('app_service')
  private readonly appServiceInject: AppService;

  // 注入固定值
  @Inject('person')
  private test: { name: string; age: number };

  // 异步factory的注入
  @Inject('person4')
  private person3: { name: string; age: number };

  // person4别名person5注入
  @Inject('person5')
  private person4: { name: string; age: number };

  @Get()
  getHello(): string {
    return this.appServiceInject.getHello();
  }
}
