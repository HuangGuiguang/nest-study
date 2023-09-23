import {
  Controller,
  DefaultValuePipe,
  Get,
  HttpException,
  Param,
  ParseArrayPipe,
  ParseEnumPipe,
  ParseIntPipe,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { HttpStatus } from '@nestjs/common';
import { Ddd } from './enum';
import { AaaPipe } from './aaa.pipe';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(
    @Query(
      'aa',
      new ParseIntPipe({
        // errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        exceptionFactory: (error) => {
          // 优先级更高一点
          throw new HttpException('sorry ' + error, HttpStatus.BAD_REQUEST);
        },
        optional: true,
      }),
    )
    aa: string,
  ): object {
    return {
      total: aa + 1,
    };
  }

  @Get('ee')
  getEe(
    @Query(
      'ee',
      new ParseArrayPipe({
        items: Number,
      }),
    )
    ee: Array<number>,
  ) {
    return JSON.stringify(ee);
  }

  @Get('dd/:enum')
  getDd(
    @Param('enum', new ParseEnumPipe(Ddd))
    ee: Ddd,
  ) {
    return ee;
  }

  @Get('uuid')
  getUuid(@Query('uuid', ParseUUIDPipe) uuid: string) {
    return uuid;
  }

  @Get('default')
  getDefault(
    @Query('default', new DefaultValuePipe('aaa')) defaultVal: string,
  ) {
    return defaultVal;
  }

  @Get('customPipe')
  getCustomPire(@Query('custom', AaaPipe) custom: string) {
    return custom;
  }
}
