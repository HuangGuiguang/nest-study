import { Module } from '@nestjs/common';
import { PppService } from './ppp.service';
import { PppController } from './ppp.controller';

@Module({
  controllers: [PppController],
  providers: [PppService],
})
export class PppModule {}
