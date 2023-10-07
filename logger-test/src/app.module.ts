import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Logger } from '@nestjs/common/services';
import { MyLogger3 } from './MyLogger';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, MyLogger3],
})
export class AppModule {}
