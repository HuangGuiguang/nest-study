## 生命周期

### 启动时的生命周期

分为 onModuleInit 和 onApplicationBootStrap

比如存在两个模块 ccc 和 ddd（顺序取决于 app 中 import 的顺序），那么启动时的生命周期如下:

1. onModuleInit

   - ccc 阶段
     - cccControlModuleInit
     - cccServiceModuleInit
     - cccModuleInit
   - ddd 阶段
     - dddControlModuleInit
     - dddServiceModuleInit
     - dddModuleInit
   - app 阶段
     - appControlModuleInit
     - appServiceModuleInit
     - appModuleInit

2. onApplicationBootstrap

   - ccc 阶段
     - cccControlApplicationBootstrap
     - cccServiceApplicationBootstrap
     - cccApplicationBootstrap
   - ddd 阶段
     - dddControlApplicationBootstrap
     - dddServiceApplicationBootstrap
     - dddApplicationBootstrap
   - app 阶段
     - appControlApplicationBootstrap
     - appServiceApplicationBootstrap
     - appApplicationBootstrap

3. 然后监听网络端口

### 关闭时的生命周期

顺序为 onModuleDestroy beforeApplicationShutdown 停止监听网络端口 onApplicationShutdown 停止进程

1. onModuleDestroy

   - ccc 的 controller、service、module 的 onModuleDestroy
   - ddd 的 controller、service、module 的 onModuleDestroy
   - app 的 controller、service、module 的 onModuleDestroy

2. beforeApplicationShutdown

   - ccc 的 controller、service、module 的 beforeApplicationShutdown
   - ddd 的 controller、service、module 的 beforeApplicationShutdown
   - app 的 controller、service、module 的 beforeApplicationShutdown

3. 停止监听网络端口

4. onApplicationShutdown

   - ccc 的 controller、service、module 的 onApplicationShutdown
   - ddd 的 controller、service、module 的 onApplicationShutdown
   - app 的 controller、service、module 的 onApplicationShutdown

5. 停止进程

三个函数的不同之处

```typescript
export interface OnModuleDestroy {
  onModuleDestroy(): any;
}

export interface BeforeApplicationShutdown {
  beforeApplicationShutdown(signal?: string): any;
}

export interface OnApplicationShutdown {
  onApplicationShutdown(signal?: string): any;
}

// signal:系统信号的，比如 SIGTERM。这些终止信号是别的进程传过来的，让它做一些销毁的事情，比如用 k8s 管理容器的时候，可以通过这个信号来通知它。
// 暂时不知道有什么用
```

### 所有的生命周期函数都是支持 async 的

其中的例子就是停止服务的时候停止一些必要的东西， 确保在停止进程时关闭了要关闭的东西

可以在其中做一些初始化、销毁的逻辑，比如 onApplicationShutdown 里通过 moduleRef.get 取出一些 provider，执行关闭连接等销毁逻辑。
