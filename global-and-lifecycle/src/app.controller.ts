import {
  Controller,
  Get,
  OnModuleInit,
  OnApplicationBootstrap,
  OnModuleDestroy,
  BeforeApplicationShutdown,
  OnApplicationShutdown,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  constructor(private readonly appService: AppService) {}
  onModuleInit() {
    console.log('onAppControlModuleInit');
  }

  onApplicationBootstrap() {
    console.log('onAppControlApplicationBootstrap');
  }

  onModuleDestroy() {
    console.log('Module app controller, ModuleDestroy');
  }

  beforeApplicationShutdown(signal?: string) {
    console.log(
      'Module app controller, ModuleBeforeApplicationShutdown',
      signal,
    );
  }

  onApplicationShutdown(signal?: string) {
    console.log('Module app controller, ModuleApplicationShutdown', signal);
  }
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
