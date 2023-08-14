import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Role } from './role';
import { Reflector } from '@nestjs/core';
@Injectable()
export class AaaGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // ExecutionContext相比ArgumentsHost多了getClass和getHandle
    // export interface ExecutionContext extends ArgumentsHost {
    //         getClass<T = any>(): Type<T>;
    //         /**
    //          * Returns a reference to the handler (method) that will be invoked next in the
    //          * request pipeline.
    //          */
    //         getHandler(): Function;
    //  }
    console.log(context.getClass(), context.getHandler());
    const requiredRoles = this.reflector.get<Role[]>(
      'roles',
      context.getHandler(),
    );
    if (!requiredRoles) return true;
    const { user } = context.switchToHttp().getRequest().body;
    console.log(context.switchToHttp().getRequest().body);
    return requiredRoles.some((role) => user && user.roles?.includes(role));
  }
}
