import { SetMetadata } from '@nestjs/common';
import { Role } from './role';

// 自定义装饰器
export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
