import { Global, Module } from '@nestjs/common';
import { AaaService } from './aaa.service';
import { AaaController } from './aaa.controller';

// 全局模块声明，使用后不需要单独导出providers
// @Global()
@Module({
  controllers: [AaaController],
  providers: [AaaService],
  // 导出AaaService
  exports: [AaaService],
})
export class AaaModule {}
