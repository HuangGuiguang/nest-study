import { Module } from '@nestjs/common';
import { BbbService } from './bbb.service';
import { BbbController } from './bbb.controller';
import { AaaModule } from 'src/aaa/aaa.module';

@Module({
  // 导入AaaModule, 就能注入AaaModule导出的providers
  imports: [AaaModule],
  controllers: [BbbController],
  providers: [BbbService],
})
export class BbbModule {}
