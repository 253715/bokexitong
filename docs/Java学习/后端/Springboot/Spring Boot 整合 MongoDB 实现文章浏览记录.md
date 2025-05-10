---
tags:
  - SpringBoot
  - 编程喵
readingTime: true
comment: true
date: 2025-05-10 14:33:46
recommend: ['SpringBoot','编程喵',15]
---

# Spring Boot 整合 MongoDB 实现文章浏览记录

## 参考教程
> https://www.yuque.com/itwanger/vn4p17/df77l6


## 关于 MongoDB

:::details 关于 MongoDB
MongoDB（来自于英文单词“Humongous”，中文含义为“庞大”）是一种<font color="#00b050">面向文档</font>的数据库管理系统，用C++实现的，旨在为 Web 应用提供可扩展的<font color="#00b050">高性能数据存储解决方案</font>。
:::

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250510143443944.png)


>传统的关系数据库一般由数据库（database）、表（table）、记录（record）三个层次概念组成，MongoDB 是由数据库（database）、集合（collection）、文档对象（document）三个层次组成。
>MongoDB 中的一条记录就是一个文档，由字段和值对组成。**MongoDB 比较适合对大量或者无固定格式的数据进行存储，比如：日志、缓存等。**


MongoDB 的源代码在 GitHub 上已开源，目前有 22k 的 star 数。GitHub 地址：

>[https://github.com/mongodb/mongo](https://github.com/mongodb/mongo)


![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250510143642881.png)

## MongoDB 的安装和配置

### Windows安装
Windows 用户，直接看中文教程：
>[https://docs.mongoing.com/install-mongodb/install-mongodb-community-edition/install-on-windows](https://docs.mongoing.com/install-mongodb/install-mongodb-community-edition/install-on-windows)

