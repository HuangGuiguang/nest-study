import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  // 简写
  // providers: [AppService],
  // 完整版
  providers: [
    // { provide: AppService, useClass: AppService }
    AppService,
    {
      provide: 'app_service',
      useClass: AppService,
    },
    // 注入值
    {
      provide: 'person',
      useValue: {
        name: 'huang',
        age: 17,
      },
    },
    // 注入动态生成的值
    {
      provide: 'person2',
      useFactory() {
        return {
          name: 'huang',
          age: 18,
        };
      },
    },
    // 支持参数注入
    {
      provide: 'person3',
      // 注入已经在provider里面的person和AppService
      inject: ['person', AppService],
      useFactory(person: { name: string }, appService: AppService) {
        return {
          name: person.name,
          desc: appService.getHello(),
        };
      },
    },
    // 支持异步
    {
      provide: 'person4',
      async useFactory() {
        await new Promise<void>((resolve, reject) => {
          setTimeout(resolve, 1000);
        });
        return {
          name: 'bbb',
          desc: 'cccc',
        };
      },
    },
    // 给provider起别名
    {
      provide: 'person5',
      useExisting: 'person4',
    },
  ],
})
export class AppModule {}
