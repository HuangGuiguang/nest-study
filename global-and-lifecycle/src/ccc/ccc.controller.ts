import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  OnModuleInit,
  OnApplicationBootstrap,
  OnModuleDestroy,
  BeforeApplicationShutdown,
  OnApplicationShutdown,
} from '@nestjs/common';
import { CccService } from './ccc.service';
import { CreateCccDto } from './dto/create-ccc.dto';
import { UpdateCccDto } from './dto/update-ccc.dto';
import { ModuleRef } from '@nestjs/core';

@Controller('ccc')
export class CccController
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  constructor(
    private readonly cccService: CccService,
    private readonly moduleRef: ModuleRef,
  ) {}

  onModuleInit() {
    console.log('onCccControlModuleInit');
  }

  onApplicationBootstrap() {
    console.log('onCccControlApplicationBootstrap');
  }
  onModuleDestroy() {
    console.log('Module ccc Control, ModuleDestroy');
  }

  beforeApplicationShutdown(signal?: string) {
    console.log('Module ccc Control, ModuleBeforeApplicationShutdown', signal);
  }

  onApplicationShutdown(signal?: string) {
    console.log('Module ccc Control, ModuleApplicationShutdown', signal);
  }
  @Post()
  create(@Body() createCccDto: CreateCccDto) {
    return this.cccService.create(createCccDto);
  }

  @Get()
  findAll() {
    return this.cccService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cccService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCccDto: UpdateCccDto) {
    return this.cccService.update(+id, updateCccDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cccService.remove(+id);
  }
}
