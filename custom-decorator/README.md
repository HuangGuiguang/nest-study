## 自定义装饰器

内置装饰器不够用的时候，或者想把多个装饰器合并成一个的时候，都可以自定义装饰器。

### 自定义方法装饰器、自定义类装饰器

方法的装饰器就是传入参数，调用下别的装饰器就好了，比如对 @SetMetadata 的封装。

```typescript
import { SetMetadata } from '@nestjs/common';

export const Aaa = (...args: string[]) => SetMetadata('aaa', args);
```

如果组合多个方法装饰器，可以使用 applyDecorators api。

```typescript
import { applyDecorators, Get, UseGuards } from '@nestjs/common';
import { Aaa } from './aaa.decorator';
import { AaaGuard } from './aaa.guard';

export const Bbb = (path, role) => {
  return applyDecorators(Get(path), Aaa(role), UseGuards(AaaGuard));
};
```

class 装饰器和方法装饰器一样。

### 自定义参数装饰器

通过 createParamDecorator 来创建参数装饰器，
它能拿到 ExecutionContext，进而拿到 reqeust、response，可以实现很多内置装饰器的功能，比如 @Query、@Headers 等装饰器。

```typescript
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const MyHeaders = createParamDecorator(
  (key: string, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    return key ? request.headers[key] : request.headers;
  },
);
```
