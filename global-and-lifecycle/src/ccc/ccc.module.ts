import {
  Module,
  OnApplicationBootstrap,
  OnModuleInit,
  OnModuleDestroy,
  BeforeApplicationShutdown,
  OnApplicationShutdown,
} from '@nestjs/common';
import { CccService } from './ccc.service';
import { CccController } from './ccc.controller';
import { ModuleRef } from '@nestjs/core';

@Module({
  controllers: [CccController],
  providers: [CccService],
})
export class CccModule
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  constructor(private moduleRef: ModuleRef) {}
  onModuleInit() {
    console.log('onCccModuleInit');
  }
  onApplicationBootstrap() {
    console.log('onCccModuleApplicationBootstrap');
  }

  onModuleDestroy() {
    console.log('Module ccc, ModuleDestroy');
  }

  beforeApplicationShutdown(signal?: string) {
    console.log('Module ccc, ModuleBeforeApplicationShutdown', signal);
    const cccService = this.moduleRef.get<CccService>(CccService);
    console.log(
      '--------------------------------cccService.findAll()',
      cccService.findAll(),
    );
  }

  onApplicationShutdown(signal?: string) {
    console.log('Module ccc, ModuleApplicationShutdown', signal);
  }
}
