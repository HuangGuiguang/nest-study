## nest 的装饰器

### @Module、@Global

```typescript
@Global()
@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    {
        provide: AppService,
        useClass: AppService
    },
    {
        provide: 'app_Service',
        useValue: {
            name: 'huang',
            age: 17
        }
    },
    {
        provide: 'person',
        useFactory() {
            return {
                name: 'huang',
                age: 17
            }
        }
    },
  ],
  exports: []
})
```

### @Control、@Injectable、@Inject、@Optional

```typescript
@Controller()
export class AppController {
  // 构造器注入
  constructor(
    private readonly appService: AppService,
    @Inject('person') private person: { name: string; age: number },
  ) {}

  // 属性注入
  @Inject(AppService)
  private readonly appService: AppService;

  @Inject('app_service')
  private readonly app_service: { name: string; age: number };

  // 注入非必需的provider
  @Optional('person1')
  private person1: { name: string };

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
```

### @Catch、@UseFilter(@UseGuard、@UseInterceptor、@UsePipes)

```typescript
@Catch(HttpException)
export class AaaFilter implements ExceptionFilter {
  /**
   *
   * @param exception
   * @param host  * Provides methods for retrieving the arguments being passed to a handler.
   * Allows choosing the appropriate execution context (e.g., Http, RPC, or
   * WebSockets) to retrieve the arguments from.
   */
  catch(exception: HttpException, host: ArgumentsHost) {
    const response: Response = host.switchToHttp().getResponse();
    response.status(exception.getStatus()).json({
      msg: exception.message, // response str
      other: exception.cause + exception.name, // cause1 + HttpException
    });
  }
}

@Get()
@UseFilters(AaaFilter)
findAll() {
    throw new HttpException('response str', HttpStatus.BAD_REQUEST, {
        cause: 'cause1',
        description: 'description',
    });
    return this.aaaService.findAll();
}
```

### @UsePipes

```typescript
@Get('/xxx/:aaa')
get1(
    @Param('aaa', ParseIntPipe) aaa: number,
    @Query('bbb', ParseBoolPipe) bbb: boolean,
) {
    console.log(typeof aaa, typeof bbb, aaa, bbb);
    return {
        aaa,
        bbb,
    };
}
```

### @SetMetadata

```typescript
// handler 和 class 可以通过 @SetMetadata 指定 metadata
@Controller('aaa')
@SetMetadata('roles', ['user'])
export class AaaController {
  @Get('/xxx/:aaa')
  @UseGuards(AaaGuard)
  @SetMetadata('roles', ['admin'])
  get1(
    @Param('aaa', ParseIntPipe) aaa: number,
    @Query('bbb', ParseBoolPipe) bbb: boolean,
  ) {
    console.log(typeof aaa, typeof bbb, aaa, bbb);
    return {
      aaa,
      bbb,
    };
  }
}
// 然后在 guard 或者 interceptor 里取出来
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
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const classMetaData = this.reflector.get('roles', context.getClass());
    const methodMetaData = this.reflector.get('roles', context.getHandler());
    console.log(classMetaData, methodMetaData);
    return true;
  }
}
```

### @Headers、@Ip

```typescript
@Delete(':id')
remove(
    @Param('id') id: string,
    @Headers('host') host: string,
    @Headers() headers: Record<string, any>,
    @Ip() ip: string,
) {
    console.log(host, headers, 'ip=' + ip);
    return this.aaaService.remove(+id);
}
```

### @Session

1. 安装

```powershell
npm install express-session
```

2. 引入(main.ts)

```typescript
// session导入
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: 'guang',
      cookie: { maxAge: 100000 },
    }),
  );
  await app.listen(3000);
}
bootstrap();
```

3. 使用

```typescript
// response header会自动加入set-cookie: connect.sid = 'xxx'
 @Get('/session')
session(@Session() session: any) {
    if (!session.count) {
      session.count = 0;
    }
    session.count++;
    return session.count;
}
```

### @HostParam 用于取域名部分的参数

```typescript
// 符合xxx:0.0.1的才能进来
@Controller({ host: ':host.0.0.1', path: 'aaa' })
@Get('/hostParams')
hostParam(@HostParam('host') host: string) {
    return host; // 127.0.0.1来请求返回127
}
```

### @Request(@Req) @Response(@Res)

```typescript
@Get('/reqAndRes')
reqAndRes(@Request() request, @Response() response) {
    console.log(request.hostname);
    // 需要手动返回，否则需要@Response({ passthrough： true })
    response.end(request.hostname);
}
```

### @Next

当你有两个 handler 来处理同一个路由的时候，可以在第一个 handler 里注入 next，调用它来把请求转发到第二个 handler

```typescript
@Get('/next')
next(@Next() next: NextFunction) {
    console.log('handle1');
    next();
    // 111就不会返回了
    return '111';
}

@Get('/next')
next2() {
    console.log('handle2');
    return '222';
}
```

### @Header、@HttpCode、@Redirect

```typescript
@Get('/header/httpCode')
@Header('aaa', 'bbb') // 设定返回头里加上值为bbb的aaa
@HttpCode(222) // handler 默认返回的是 200 的状态码，你可以通过 @HttpCode 修改它
@Redirect('http://juejin.cn')
headerAndHttpCode() {
    return 'hello';
}
```

### @Render 指定渲染引擎

1. 配置

```typescript
// 设定公开目录？
/**
 * Sets a base directory for public assets.
 * @example
 * app.useStaticAssets('public')
 *
 * @returns {this}
 */
console.log(join(__dirname, '..', 'public'));
app.useStaticAssets(join(__dirname, '..', 'public'));
// 设定模板目录？
/**
 * Sets one or multiple base directories for templates (views).
 *
 * @example
 * app.setBaseViewsDir('views')
 *
 * @returns {this}
 */
app.setBaseViewsDir(join(__dirname, '..', 'views'));
app.setViewEngine('hbs');
```

2. 创建静态资源公开目录和模板
   /views/user.hbs

```html
<img src="/1.jpg" />
<p>name: {{ name }}</p>
<p>age: {{ age }}</p>
```

3. 使用

```typescript
@Get('/render')
@Render('user')
render() {
    return { name: 'guang', age: 17 };
}
```
