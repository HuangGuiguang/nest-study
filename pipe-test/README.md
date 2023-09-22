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