---
tags:
  - redis
readingTime: true
sticky: 3
date: 2025-05-11 09:19:40
recommend: ['redis',1]
---
# redis学习路线

## 参考教程
>https://javabetter.cn/xuexiluxian/redis.html


>Redis 不管是在社招/校招面试中，被问到的频率都非常高；在日常开发中，Redis 的使用频率也非常高，**几乎是 Java 后端开发必须掌握的技术栈**，所以 Redis 也被二哥归纳到了**Java 后端四大件中**。
  Redis是一种基于键值对（key-value）的NoSQL数据库。它的数据都存放在**内存**中，所以读写性能非常出色，同时，它会利用**快照和日志**的形式将内存的数据持久化到硬盘上，防止数据丢失。由于 Redis 的出色性能，它被应用于企业级开发的多个场景当中，比如说**缓存、计数器、排行榜、社交网络、消息队列、分布式锁**等等，因此，**Redis 的企业开发中占据了重要的位置**。

## 第一阶段


![undefined20250511092624361.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250511092711765.png)



![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250511092808565.png)





![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250511092801546.png)


![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250511092824017.png)

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250511092836927.png)

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250511092846947.png)

### redis在线环境
>如果没有 Redis 环境，可以直接访问这个网址https://try.redis.io/，它会给你模拟一个在线的环境可供你尽情使用！

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250511092940192.png)

### 视频

黑马程序员 Redis 入门到实战教程里包含了比较多实战的内容，比如说优惠券秒杀、分布式锁、消息队列等等内容

>1. 视频地址：https://www.bilibili.com/video/BV1cr4y1671t
>2. 课件网盘地址获取：https://t.zsxq.com/08rEo9Pdu

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250511093058599.png)

### 文档

### [文档](https://javabetter.cn/xuexiluxian/redis.html#%E6%96%87%E6%A1%A3)

任何时候，[官方的文档](https://www.redis.net.cn/tutorial/3501.html)都是非常值得去参考和学习的。


![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250511093309089.png)

## 第二阶段：进阶实战

下面列举一些 Redis 的使用场景：

- 缓存 - 将热点数据放到内存中，设置内存的最大使用量以及过期淘汰策略来保证缓存的命中率。这也是绝大多数小伙伴会写到简历上的一条。
- 计数器 - Redis 这种内存数据库能支持计数器频繁的读写操作。
- 应用限流 - 限制一个网站访问流量。
- 消息队列 - 使用 List 数据类型，它是双向链表。
- 查找表 - 使用 HASH 数据类型。
- 交集运算 - 使用 SET 类型，例如求两个用户的共同好友。
- 排行榜 - 使用 ZSET 数据类型，**技术派的首页就有作者排行榜，用的就是该数据类型。**
- 分布式 Session - 多个应用服务器的 Session 都存储到 Redis 中来保证 Session 的一致性，这也是简历上常写一个知识点。
- 分布式锁 - 除了可以使用 SETNX 实现分布式锁之外，还可以使用官方提供的 RedLock 分布式锁实现。
### 视频
> 百度网盘

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250511093450411.png)

## 学习建议

在学习 Redis 时，最常见的需求有三个方面。

- 日常使用操作：比如常见命令和配置，集群搭建等；
- 关键技术原理：比如 IO 模型、AOF 和 RDB 机制等；
- 在实际使用时的经验教训，比如，Redis 响应变慢了怎么办？Redis 主从库数据不一致怎么办？等等。
面试前，强烈建议大家把「[面渣逆袭 Redis 篇](https://javabetter.cn/sidebar/sanfene/redis.html)」好好刷一遍
还有这份《Redis最全的116道面试题.pdf》
>https://t.zsxq.com/15ltzRylY