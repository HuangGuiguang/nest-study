import {
  Injectable,
  OnModuleInit,
  OnApplicationBootstrap,
  OnModuleDestroy,
  BeforeApplicationShutdown,
  OnApplicationShutdown,
} from '@nestjs/common';

@Injectable()
export class AppService
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  onModuleInit() {
    console.log('onAppServiceModuleInit');
  }

  onApplicationBootstrap() {
    console.log('onAppServiceApplicationBootstrap');
  }

  onModuleDestroy() {
    console.log('Module app Service, ModuleDestroy');
  }

  beforeApplicationShutdown(signal?: string) {
    console.log('Module app Service, ModuleBeforeApplicationShutdown', signal);
  }

  onApplicationShutdown(signal?: string) {
    console.log('Module app Service, ModuleApplicationShutdown', signal);
  }
  getHello(): string {
    return 'Hello World!';
  }
}
