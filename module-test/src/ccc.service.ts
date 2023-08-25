import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { DddService } from './ddd.service';

@Injectable()
export class CccService {
  constructor(@Inject(forwardRef(() => DddService)) private ddd: DddService) {}
}
