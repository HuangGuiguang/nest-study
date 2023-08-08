## provider注入方式

## 提供类注入
```javascript
import { AppService } from './app.service';

@Module({
  providers: [
    // 1. 简写
    AppService,
    // 2. 简写的实际全部
    { provide: AppService, useClass: AppService }
  ]
})

// 注入方式
// 1. 构造函数注入
import { AppService } from './app.service';
constructor(
    private readonly appService: AppService,
) {}

// 2. 属性注入
@Inject(AppService)
private readonly appServiceInject: AppService;
```

## 提供类注入但是provide的token为字符串
```javascript
import { AppService } from './app.service';

@Module({
  providers: [
    { provide: 'app_service', useClass: AppService }
  ]
})

// 注入方式
// 1. 构造函数注入
import { AppService } from './app.service';
constructor(
    // 如果 token 是字符串的话，注入的时候就要用 @Inject 手动指定注入对象的 token 了
    @Inject('app_service') private readonly appService: AppService,
) {}

// 2. 属性注入
@Inject('app_service')
private readonly appServiceInject: AppService;
```

### 注入固定值
```javascript
@Module({
  providers: [
    // 注入值
    {
      provide: 'person',
      useValue: {
        name: 'huang',
        age: 17,
      },
    },
  ]
})
// 1. 构造函数注入
import { AppService } from './app.service';
constructor(
    // 如果 token 是字符串的话，注入的时候就要用 @Inject 手动指定注入对象的 token 了
    @Inject('person') private readonly person: { name: string; age: number },
) {}

// 2. 属性注入
@Inject('person')
private readonly person: { name: string; age: number };
// 
```

### 注入useFactory返回的固定值
```javascript
@Module({
  providers: [
    // 注入值
    {
      provide: 'person1',
      useFactory() {
        return {
          name: 'huang',
          age: 17,
        }
      }
    },
  ]
})
// 1. 构造函数注入
import { AppService } from './app.service';
constructor(
    // 如果 token 是字符串的话，注入的时候就要用 @Inject 手动指定注入对象的 token 了
    @Inject('person1') private readonly person1: { name: string; age: number },
) {}

// 2. 属性注入
@Inject('person1')
private readonly person1: { name: string; age: number };
// 
```

### useFactory也支持属性注入
```javascript
@Module({
  providers: [
    // 注入值
    {
      provide: 'person2',
      // 注入已经在provider里面的person和AppService
      inject: ['person1', AppService],
      useFactory(person1: { name: string; age: number }, appService: AppService) {
        return {
          name: person1.name,
          desc: appService.getHello(),
        }
      }
    },
  ]
})
```

### 支持异步
```javascript
@Module({
  providers: [
    {
      provide: 'person3',
      async useFactory() {
        await new Promisr((resolve) => {
          setTimeout(resolve, 3000)
        })
        return {
          name: 'person3',
          age: 17
        }
      }
    }
  ]
})
```

### 支持别名
```javascript
@Module({
  providers: [
    {
      provide: 'person4',
      useExisting: 'person3'
    }
  ]
})
```