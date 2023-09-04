## 创建动态Module
provider可以通过useFactory动态生成, Module也同样可以

### 通过register函数
```typescript
// 在BbbModule中定义register函数
import { Module, DynamicModule } from '@nestjs/common';
import { BbbService } from './bbb.service';
import { BbbController } from './bbb.controller';

@Module({})
export class BbbModule {
  static register(option: Record<string, any>): DynamicModule {
    return {
      module: BbbModule,
      controllers: [BbbController],
      providers: [
        {
          provide: 'CONFIG_OPTIONS',
          useValue: option,
        },
        BbbService,
      ],
      exports: [],
    };
  }
}
```

```typescript
// 在appModule中使用
@Module({
  imports: [
    BbbModule.register({ testBbbModule: 1 })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

```typescript
// 在bbbControl中就可以读取到{ testBbbModule: 1 }
@Controller('bbb')
export class BbbController {
  constructor(
    private readonly bbbService: BbbService,
    @Inject('CONFIG_OPTIONS') private option: Record<string, any>,
  ) {}

  @Get()
  findAll() {
    return this.bbbService.findAll() + this.option.testBbbModule;
  }
}
```

### forRoot、forFeature和register的区别
- register：用一次模块传一次配置，比如这次调用是 BbbModule.register({aaa:1})，下一次就是 BbbModule.register({aaa:2}) 了

- forRoot：配置一次模块用多次，比如 XxxModule.forRoot({}) 一次，之后就一直用这个 Module，一般在 AppModule 里 import

- forFeature：用了 forRoot 固定了整体模块，用于局部的时候，可能需要再传一些配置，比如用 forRoot 指定了数据库链接信息，再用 forFeature 指定某个模块访问哪个数据库和表。

其实 forRoot、forFeature、register 有区别么？

本质上没区别，只是我们约定了它们使用上的一些区别。