import { Controller, Inject, Get } from '@nestjs/common';
import {
  MODULE_OPTIONS_TOKEN,
  CccModuleOptions,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
} from './ccc.module-definition';

@Controller('ccc')
export class CccController {
  @Inject(MODULE_OPTIONS_TOKEN)
  //   private cccOption: CccModuleOptions;
  private cccOption: typeof OPTIONS_TYPE;

  @Get('')
  get() {
    console.log(MODULE_OPTIONS_TOKEN, OPTIONS_TYPE, ASYNC_OPTIONS_TYPE);
    return this.cccOption;
  }
}
