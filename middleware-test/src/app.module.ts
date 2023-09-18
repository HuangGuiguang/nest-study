import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NestModule } from '@nestjs/common/interfaces';
import { AaaMiddleware } from './aaa.middleware';
import { MiddlewareConsumer } from '@nestjs/common/interfaces';
import { RequestMethod } from '@nestjs/common/enums';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    /**
     * 返回一个MiddlewareConfigProxy对象，包含exclude和forRoutes两个方法
     * export interface MiddlewareConfigProxy {
    /**
     * Excludes routes from the currently processed middleware.
     *
     * @param {(string | RouteInfo)[]} routes
     * @returns {MiddlewareConfigProxy}
     */
    // exclude(...routes: (string | RouteInfo)[]): MiddlewareConfigProxy;
    // /**
    //  * Attaches passed either routes or controllers to the currently configured middleware.
    //  * If you pass a class, Nest would attach middleware to every path defined within this controller.
    //  *
    //  * @param {(string | Type | RouteInfo)[]} routes
    //  * @returns {MiddlewareConsumer}
    //  */
    // forRoutes(...routes: (string | Type<any> | RouteInfo)[]): MiddlewareConsumer;
    // }
    consumer
      .apply(AaaMiddleware)
      .forRoutes({ path: 'hello', method: RequestMethod.GET });
  }
}
