import {
  Controller,
  Get,
  UseGuards,
  Headers,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AaaGuard } from './aaa.guard';
import { Aaa } from './aaa.decorator';
import { Bbb } from './bbb.decorator';
import { MyHeaders } from './myHeader.decorator';
import { MyQuery } from './myquery.decorator';
import { AppControlDecorator } from './app-control-decorator.decorator';

@AppControlDecorator('', 'app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Aaa('admin', 'user')
  @UseGuards(AaaGuard)
  getHello(): string {
    return this.appService.getHello();
  }

  // 合并装饰器bbb
  @Bbb('/bbb', 'admin')
  getBbb(): string {
    return 'bbb';
  }

  // 参数装饰器, 自己实现header和query, 并做数字判断
  @Get('ccc')
  getCcc(
    @MyHeaders('host') host,
    @Headers('host') host1,
    @MyQuery('aaa', new ParseIntPipe()) myAaa,
    @Query('aaa', new ParseIntPipe()) aaa,
  ) {
    return {
      host,
      host1,
      myAaa,
      aaa,
    };
  }
}
