## 如何添加断点调试

### 调试普通的js文件
```powershell
// inspect表示以调试模式运行, -brk表示在首行暂停
node --inspect-brk index.js
```
在调试客户端上连接, 如Chrome Devtools
打开chrome://inspect/, 在Devices的remote Target#LOCALHOST中可以看到运行起来的文件, 点击inspect


### 用vscode的launch.json调试js文件
```json
{
    // 使用 IntelliSense 了解相关属性。 
    // 悬停以查看现有属性的描述。
    // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Launch Program",
            // 文件路径
            "program": "${workspaceFolder}/nest-debug/debug-test.js",
            "request": "launch",
            // 首行停止
            "stopOnEntry": true,
            "skipFiles": [
                "<node_internals>/**"
            ],
            "type": "node"
        }
    ]
}
```

### 用vscode的launch.json来调试nest项目-attach方式
1. 启动项目
```powershell
nest start --debug
```

2. 在launch.json中添加一个attach类型的调试配置
```json
{
    "version": "0.2.0",
    "configurations": [      
        {
            "name": "Attach",
            "port": 9229,
            "request": "attach",
            "skipFiles": [
                "<node_internals>/**"
            ],
            "type": "node"
        }
    ]
}
```

### 用vscode的launch.json来调试nest项目-npm scripts方式
```json
{   
    // 会跑package.json里面的npm scripts命令
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node", // 或者是pwa-node, pwa-node据说功能多一丢丢
            "request": "launch",
            "name": "debug nest",
            // 以下大概就是跑了什么命令
            "runtimeExecutable": "npm",
            "args": [
                "run",
                "start:dev",
            ],
            "skipFiles": [
                "<node_internals>/**"
            ],
            // 指定console为integratedTerminal, 即vscode的内置终端打印日志，不然默认使用debug console跑, 没有颜色的
            "console": "integratedTerminal",
            // 指定目录
            "cwd": "${workspaceFolder}/nest-ioc"
        }
    ]
}
```
