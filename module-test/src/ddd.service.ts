import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { CccService } from './ccc.service';

@Injectable()
export class DddService {
  @Inject(forwardRef(() => CccService))
  private ccc: CccService;
  //   constructor(@Inject(forwardRef(() => CccService)) private ccc: CccService) {}
}
