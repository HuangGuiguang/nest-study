import {
  Module,
  OnModuleInit,
  OnApplicationBootstrap,
  OnModuleDestroy,
  BeforeApplicationShutdown,
  OnApplicationShutdown,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AaaModule } from './aaa/aaa.module';
import { BbbModule } from './bbb/bbb.module';
import { CccModule } from './ccc/ccc.module';
import { DddModule } from './ddd/ddd.module';

@Module({
  imports: [AaaModule, BbbModule, DddModule, CccModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  onModuleInit() {
    console.log('onAppModuleInit');
  }

  onApplicationBootstrap() {
    console.log('onAppApplicationBootstrap');
  }

  onModuleDestroy() {
    console.log('Module app, ModuleDestroy');
  }

  beforeApplicationShutdown(signal?: string) {
    console.log('Module app, ModuleBeforeApplicationShutdown', signal);
  }

  onApplicationShutdown(signal?: string) {
    console.log('Module app, ModuleApplicationShutdown', signal);
  }
}
