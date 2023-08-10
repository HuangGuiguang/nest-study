import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
  UseGuards,
  UsePipes,
  ParseIntPipe,
  ParseBoolPipe,
  HttpException,
  HttpStatus,
  Query,
  SetMetadata,
  Headers,
  Ip,
  Session,
  HostParam,
  Request,
  Response,
  Next,
  HttpCode,
  Header,
  Redirect,
  Render,
} from '@nestjs/common';
import { AaaService } from './aaa.service';
import { AaaModule } from './aaa.module';
import { CreateAaaDto } from './dto/create-aaa.dto';
import { UpdateAaaDto } from './dto/update-aaa.dto';
import { AaaDto } from './dto/aaa.dto';
import { AaaFilter } from './aaa.filter';
import { AaaGuard } from './aaa.guard';
import { NextFunction } from 'express';

// 符合xxx:0.0.1的才能进来
@Controller({ host: ':host.0.0.1', path: 'aaa' })
@SetMetadata('roles', ['user'])
export class AaaController {
  constructor(private readonly aaaService: AaaService) {}

  @Post()
  create(@Body() createAaaDto: CreateAaaDto) {
    return this.aaaService.create(createAaaDto);
  }

  @Get()
  @UseFilters(AaaFilter)
  findAll() {
    throw new HttpException('response str', HttpStatus.BAD_REQUEST, {
      cause: 'cause1',
      description: 'description',
    });
    return this.aaaService.findAll();
  }

  @Get('/render')
  @Render('user')
  render() {
    return { name: 'guang', age: 17 };
  }

  @Get('/header/httpCode')
  @Header('aaa', 'bbb')
  @HttpCode(222)
  @Redirect('http://juejin.cn')
  headerAndHttpCode() {
    console.log(1);
    // @Header('a111', 'bbb');
    return 'hello';
  }

  @Get('/next')
  next(@Next() next: NextFunction) {
    console.log('handle1');
    next();
    // 111就不会返回了
    return '111';
  }

  @Get('/next')
  next2() {
    console.log('handle2');
    return '222';
  }

  @Get('/reqAndRes')
  reqAndRes(@Request() request, @Response() response) {
    console.log(request.hostname);
    // 需要手动返回，否则需要@Response({ passthrough： true })
    response.end(request.hostname);
  }

  @Get('/hostParams')
  hostParam(@HostParam('host') host: string) {
    return host; // 127.0.0.1来请求返回127
  }

  @Get('/xxx/:aaa')
  // 顺序没关系
  @UseGuards(AaaGuard)
  @SetMetadata('roles', ['admin'])
  get1(
    @Param('aaa', ParseIntPipe) aaa: number,
    @Query('bbb', ParseBoolPipe) bbb: boolean,
  ) {
    console.log(typeof aaa, typeof bbb, aaa, bbb);
    return {
      aaa,
      bbb,
    };
  }

  @Get('/session')
  session(@Session() session: any) {
    if (!session.count) {
      session.count = 0;
    }
    session.count++;
    return session.count;
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Body() aaaDto: AaaDto) {
    console.log(aaaDto);
    return this.aaaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAaaDto: UpdateAaaDto) {
    return this.aaaService.update(+id, updateAaaDto);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Headers('host') host: string,
    @Headers() headers: Record<string, any>,
    @Ip() ip: string,
  ) {
    console.log(host, headers, 'ip=' + ip);
    return this.aaaService.remove(+id);
  }
}
