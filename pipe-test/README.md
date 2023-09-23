# pipe和自定义pipe
pipe的作用是对传入的数据做处理或者对传入的参数进行校验


# ParseIntPipe
```js
// 转换成整型数字
// 均可以传参errorHttpStatusCode和exceptionFactory
getHello(
    @Query(
      'aa',
      new ParseIntPipe({
        // errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        exceptionFactory: (error) => {
          // 优先级更高一点
          throw new HttpException('sorry ' + error, HttpStatus.BAD_REQUEST);
        },
      }),
    )
    aa: string,
  ): string {
    return aa + 1;
  }
```

# ParseFloatPipe、ParseBoolPipe、ParseArrayPipe、ParseEnumPipe、ParseUUIDPipe、DefaultValuePipe
```js
export enum Ddd {
  AAA = '111',
  BBB = '222',
  CCC = '333',
}
// 如果传入的param不是111、222、333中的其中一个，便会错误,ParseUUIDPipe同理
@Get('dd/:enum')
  getDd(
    @Param('enum', new ParseEnumPipe(Ddd))
    ee: Ddd,
  ) {
    return ee;
  }
```

```js
// default参数没传时默认为aaa
@Get('default')
  getDefault(
    @Query('default', new DefaultValuePipe('aaa')) defaultVal: string,
  ) {
    return defaultVal;
  }
```

# 自定义pipe
```shell
nest g pipe aaa --flat --no-spec
```

```js
@Injectable()
export class AaaPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return 'value';
  }
}

@Get('customPipe')
// custom怎么传返回的都是value
getCustomPire(@Query('custom', AaaPipe) custom: string) {
    return custom;
}
```

# post请求参数Pipe ValidationPipe
```js
// dto格式定义
import { IsInt } from 'class-validator';

export class CreateAaaDto {
  name: string;
  // 装饰器不用分号的
  @IsInt()
  age: number;
  hobbies: Array<string>;
}
```
```js
// 请求中使用
@Post()
// 单个请求设置Validation
create(@Body(new ValidationPipe()) createAaaDto: CreateAaaDto): CreateAaaDto {
    console.log(createAaaDto);
    return createAaaDto;
}
```

# 全局设置ValidationPipe
```js
// app.module.ts
providers: [
    AppService,
    // 全局注入ValidationPipe
    {
        provide: APP_PIPE,
        useClass: ValidationPipe,
    },
]
```

```js
// 请求中就不用写了
@Post()
create(@Body() createAaaDto: CreateAaaDto): CreateAaaDto {
    console.log(createAaaDto);
    return createAaaDto;
}
```

# 更多Validation设置
```js
export class CreatePppDto {
  @Length(10, 20)
  title: string;

  @Contains('hello')
  text: string;

  @IsInt()
  @Min(0)
  @Max(10)
  rating: number;

  @IsEmail()
  email: string;

  @IsFQDN() // 域名
  @IsOptional()
  site: string;
}
```

# 自定义Validation返回的错误消息
```js
@Length(10, 20, {
    message(args) {
        console.log(args);
        // 这样返回的消息就是xxx了，也可以拿到args中相关的参数自己组合返回的错误消息
        return 'xxx';
    },
})
```