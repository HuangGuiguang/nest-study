# middleware
在请求的前后完成一些逻辑

# 生成middleware
```shell
nest g middleware aaa
```

# 具体实现类
```js
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
```
# 调用
```js
// app.module.ts实现NestModule的configure方法
@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AaaMiddleware)
      // 应用到哪些路由上
      .forRoutes({ path: 'hello', method: RequestMethod.GET });
  }
}
```

# 与interceptor的区别
middleware 和 interceptor 功能类似，但也有不同，interceptor 可以拿到目标 class、handler 等，也可以调用 rxjs 的 operator 来处理响应，更适合处理具体的业务逻辑。
middleware 更适合处理通用的逻辑。