---
tags:
  - SpringBoot
  - 编程喵
readingTime: true
comment: true
date: 2025-05-10 13:16:11
recommend: ['SpringBoot','编程喵',8]
---

# Spring Boot 整合 MySQL 和 Druid

## 参考教程

>[Spring Boot 整合 MySQL 和 Druid](https://www.yuque.com/itwanger/vn4p17/yzg33s)

## 安装 MySQL

>[MySQL 的安装、启动、连接(Windows、macOS 和 Linux)](https://javabetter.cn/mysql/install.html)

## Spring Boot 整合 MySQL 数据库

Spring Boot 整合 MySQL 数据库非常简单，**只需要添加 MySQL 依赖**并在配置文件中添加数据库配置即可。我们可以不用编写原始的访问数据库的代码，也不用调用 JDBC 或者连接池就可以访问 MySQL。

### 1. 引入依赖

```XML
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <scope>runtime</scope>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
</dependency>
```

### 2. 配置连接

```yml
spring:
  datasource:
    username: codingmore-mysql
    password: YyfR4TDxCwrjZ2Fs
    url:jdbc: mysql://118.190.99.232:3306/codingmore-mysql?useUnicode=true&characterEncoding=utf-8&serverTimezone=Asia/Shanghai&useSSL=false
```

推荐安装 Spring Initializr and assistant 插件。可以自动补全配置信息。

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250510131438783.png)


## Spring Boot 整合 Druid

![](https://cdn.nlark.com/yuque/0/2025/png/26027752/1743854364697-4b8bd7e5-ec4c-426b-9e6a-4f9d18957fbc.png)

### 1. 引入依赖

```xml
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid-spring-boot-starter</artifactId>
    <version>1.1.23</version>
</dependency>
```

### 2. 添加配置

```yml
spring:
  datasource:    
    type: com.alibaba.druid.pool.DruidDataSource
    druid:
      #初始化连接池大小
      initial-size: 5
      #配置最小连接数
      min-idle: 5
      #配置最大连接数
      max-active: 200
      #配置连接等待超时时间
      max-wait: 60000
      #配置间隔多久才进行一次检测，检测需要关闭的空闲连接，单位是毫秒
      time-between-eviction-runs-millis: 60000
      #配置一个连接在池中最小生存的时间，单位是毫秒
      min-evictable-idle-time-millis: 300000
      #测试连接
      validation-query: SELECT 1 FROM DUAL
      #申请连接的时候检测，建议配置为true，不影响性能，并且保证安全
      test-while-idle: true
      #获取连接时执行检测，建议关闭，影响性能
      test-on-borrow: false
      #归还连接时执行检测，建议关闭，影响性能
      test-on-return: false
      #是否开启PSCache，PSCache对支持游标的数据库性能提升巨大，oracle建议开启，mysql下建议关闭
      pool-prepared-statements: false
      #开启poolPreparedStatements后生效
      max-pool-prepared-statement-per-connection-size: 20
      #配置扩展插件，常用的插件有=>stat:监控统计  log4j:日志  wall:防御sql注入
      filters: stat,wall,slf4j
      #打开mergeSql功能；慢SQL记录
      connection-properties: druid.stat.mergeSql\=true;druid.stat.slowSqlMillis\=5000
      #配置DruidStatFilter
      web-stat-filter:
        enabled: true
        url-pattern: "/*"
        exclusions: "*.js,*.gif,*.jpg,*.bmp,*.png,*.css,*.ico,/druid/*"
      #配置DruidStatViewServlet
      stat-view-servlet:
        url-pattern: "/druid/*"
        #登录名
        login-username: root
        #登录密码
        login-password: root
```

### 3. 重启项目。在日志信息里可以看到 Druid 的初始化信息

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250510131530736.png)


### 4. 访问

通过 http://localhost:9002/druid/ 地址就可以在浏览器访问 Druid 的监控页面了，用户名和密码是我们在配置文件里指定的 root 和 root，登录后是这样的。  
![](https://cdn.nlark.com/yuque/0/2025/png/26027752/1743854486353-c6e7d239-df06-4c4b-bfc0-3f47bd67afee.png)  

更多关于监控的配置信息，可以到 Druid 的 GitHub 仓库查看。  
>[https://github.com/alibaba/druid/wiki/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98](https://github.com/alibaba/druid/wiki/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98)