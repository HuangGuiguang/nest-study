import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  BadRequestException,
  Post,
  Body,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AaaDto } from './aaa.dto';
import { UnLoginException } from './unlogin.filter';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    // throw new HttpException('httpException', HttpStatus.ACCEPTED);
    // throw new HttpException('httpException', HttpStatus.ACCEPTED);
    return this.appService.getHello();
  }

  @Post('aaa')
  aaa(@Body() aaaDto: AaaDto) {
    throw new UnLoginException('unlogin');
    return 'success';
  }
}
