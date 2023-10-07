import { Controller, Get, ConsoleLogger, Logger } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private logger = new Logger();
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    // 不同类型的log, test pm2 change
    this.logger.debug('debug');
    this.logger.error('error');
    this.logger.fatal('fatal');
    this.logger.log('log');
    this.logger.verbose('verbose');
    this.logger.warn('warn');
    return this.appService.getHello();
  }
}
