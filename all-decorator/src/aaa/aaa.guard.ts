import {
  CanActivate,
  Injectable,
  Inject,
  ExecutionContext,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
@Injectable()
export class AaaGuard implements CanActivate {
  /**
   * Reflector: Helper class providing Nest reflection capabilities.
   *
   * @see [Reflection](https://docs.nestjs.com/guards#putting-it-all-together)
   *
   * @publicApi
   */
  @Inject(Reflector)
  private readonly reflector: Reflector;

  /**
   * ExecutionContext: Interface describing details about the current request pipeline.
   *
   * @see [Execution Context](https://docs.nestjs.com/guards#execution-context)
   *
   * @publicApi
   */
  canActivate(
    context: ExecutionContext, // 切换不同上下文
  ): boolean | Promise<boolean> | Observable<boolean> {
    const classMetaData = this.reflector.get('roles', context.getClass());
    const methodMetaData = this.reflector.get('roles', context.getHandler());
    console.log(classMetaData, methodMetaData);
    return true;
  }
}
