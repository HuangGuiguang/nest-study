# 常用命令
1. `pm2 start [option] [name]`
2. `pm2 logs [id|name]` 查看进程日志
3. `pm2 start [name] --max-memory-restart 200M` 占用内存超过200M自动重启
4. `pm2 start [name] --cron-start "2/3 * * * * *"` 从2s开始每3s重启一次
5. `pm2 start [name] --watch` 文件内容改变自动重启
6. `pm2 start xxx --no-autorestart` 不自动重启
7. `pm2 flush 或者 pm2 flush 进程名|id` 清空日志
8. `pm2 start app.js -i max | pm2 start app.js -i 0` 启动 cpu 数量的进程
9. `pm2 scale main 3` 把 main 的集群调整为 3 个进程
10. `pm2 scale main +3` 把 main 的集群+3个进程
11. `pm2 monit` 性能监控