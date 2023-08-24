import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AaaGuard implements CanActivate {
  constructor(private reflect: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log(this.reflect.get('aaa', context.getHandler()));
    console.log(this.reflect.get('ddd', context.getClass()));

    return true;
  }
}
