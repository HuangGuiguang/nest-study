import {
  Module,
  OnModuleInit,
  OnApplicationBootstrap,
  OnModuleDestroy,
  BeforeApplicationShutdown,
  OnApplicationShutdown,
} from '@nestjs/common';
import { DddService } from './ddd.service';
import { DddController } from './ddd.controller';

@Module({
  controllers: [DddController],
  providers: [DddService],
})
export class DddModule
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  onModuleInit() {
    console.log('onDddModuleInit');
  }

  onApplicationBootstrap() {
    console.log('onDddApplicationBootstrap');
  }

  onModuleDestroy() {
    console.log('Module ddd, ModuleDestroy');
  }

  beforeApplicationShutdown(signal?: string) {
    console.log('Module ddd, ModuleBeforeApplicationShutdown', signal);
  }

  onApplicationShutdown(signal?: string) {
    console.log('Module ddd, ModuleApplicationShutdown', signal);
  }
}
