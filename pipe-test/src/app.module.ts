import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AaaModule } from './aaa/aaa.module';
import { APP_PIPE } from '@nestjs/core';
import { PppModule } from './ppp/ppp.module';

@Module({
  imports: [AaaModule, PppModule],
  controllers: [AppController],
  providers: [
    AppService,
    // 全局注入ValidationPipe
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
