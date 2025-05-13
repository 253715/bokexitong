---
tags:
  - SpringBoot
  - 编程喵
readingTime: true
comment: false
date: 2025-05-09 12:26:29
recommend: ['SpringBoot','编程喵',2]
---

# Spring Boot 项目配置 Logback 日志

## 参考教程

>[为 Spring Boot 项目配置 Logback 日志](https://www.yuque.com/itwanger/vn4p17/vvibgc#WU5Ay "为 Spring Boot 项目配置 Logback 日志")

由于 Spring Boot 的**默认日志框架选用的 Logback**，再加上 Log4j2 之前爆过严重的漏洞，所以我们这次就只关注 Logback。

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250509122138081.png)


## 直接上手

::: info

Logger 和 LoggerFactory 都来自 SLF4J，所以如果项目是从 Log4j + SLF4J 切换到 Logback 的话，此时的代码是零改动的。  
其他什么也不用做，运行后就可以看到 logback 已经正常工作了。

在**没有配置文件**的情况下，一切都是默认的，Logback 的日志信息会输出到控制台。可以通过 StatusPrinter 来打印 Logback 的内部信息：

并且，Logger 的默认日志级别是 INFO 级别的，这就意味着如果尝试下面的代码：
:::
```
logger.debug("沉默王二是傻 X");
```

  
控制台是看不到这行日志输出的。Logback 的日志级别是这样的：

TRACE < DEBUG < INFO < WARN < ERROR  
也就是说小于 INFO 级别的日志都不会记录，只**有大于等于 INFO 级别的日志才会被记录**。

## 配置文件

>默认的不太能满足我们的需求

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250509122206779.png)


```xml
<!--
configuration 有三个属性：
scan：当此属性设置为true时，配置文件如果发生改变，将会被重新加载，默认值为true。
scanPeriod：设置监测配置文件是否有修改的时间间隔，如果没有给出时间单位，默认单位是毫秒当scan为true时，此属性生效。默认的时间间隔为1分钟。
debug：当此属性设置为true时，将打印出logback内部日志信息，实时查看logback运行状态。默认值为false。
-->
<configuration>
  <include resource="org/springframework/boot/logging/logback/defaults.xml" />
  <!-- 定义日志文件名称 -->
  <property name="APP_NAME" value="codingmore-admin" />
  <!-- 定义日志文件的路径 -->
  <property name="LOG_PATH" value="${user.home}/${APP_NAME}/logs" />
  <!-- 定义日志的文件名 -->
  <property name="LOG_FILE" value="${LOG_PATH}/codingmore-admin.log" />

  <!-- 滚动记录日志，先将日志记录到指定文件，当符合某个条件时，将日志记录到其他文件 -->
  <appender name="APPLICATION"
    class="ch.qos.logback.core.rolling.RollingFileAppender">
    <!-- 指定日志文件的名称 -->
    <file>${LOG_FILE}</file>
    <!--
    当发生滚动时，决定 RollingFileAppender 的行为，涉及文件移动和重命名
    TimeBasedRollingPolicy： 最常用的滚动策略，它根据时间来制定滚动策略，既负责滚动也负责触发滚动。
    -->
    <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
      <!--
      滚动时产生的文件的存放位置及文件名称
      %d{yyyy-MM-dd}：按天进行日志滚动
      %i：当文件大小超过maxFileSize时，按照i进行文件滚动
      -->
      <fileNamePattern>${LOG_FILE}.%d{yyyy-MM-dd}.%i.log</fileNamePattern>
      <!--
      可选节点，控制保留的归档文件的最大数量，超出数量就删除旧文件。假设设置每天滚动，
      且maxHistory是7，则只保存最近7天的文件，删除之前的旧文件。
      注意，删除旧文件时，那些为了归档而创建的目录也会被删除。
      -->
      <maxHistory>7</maxHistory>
      <!--
      当日志文件超过maxFileSize指定的大小时，根据上面提到的%i进行日志文件滚动
      注意此处配置SizeBasedTriggeringPolicy是无法实现按文件大小进行滚动的，
      必须配置timeBasedFileNamingAndTriggeringPolicy
      -->
      <timeBasedFileNamingAndTriggeringPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedFNATP">
        <maxFileSize>50MB</maxFileSize>
      </timeBasedFileNamingAndTriggeringPolicy>
    </rollingPolicy>
    <!-- 日志输出格式： -->
    <layout class="ch.qos.logback.classic.PatternLayout">
      <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [ %thread ] - [ %-5level ] [ %logger{50} : %line ] - %msg%n</pattern>
    </layout>
  </appender>
  <!-- ch.qos.logback.core.ConsoleAppender 表示控制台输出 -->
  <appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
    <!--
    日志输出格式：
    %d表示日期时间，%green 绿色
    %thread表示线程名，%magenta 洋红色
    %-5level：级别从左显示5个字符宽度 %highlight 高亮色
    %logger{36} 表示logger名字最长36个字符，否则按照句点分割 %yellow 黄色
    %msg：日志消息
    %n是换行符
    -->
    <layout class="ch.qos.logback.classic.PatternLayout">
      <pattern>%green(%d{yyyy-MM-dd HH:mm:ss.SSS}) [%magenta(%thread)] %highlight(%-5level) %yellow(%logger{36}): %msg%n</pattern>
    </layout>
  </appender>

  <!--
  root与logger是父子关系，没有特别定义则默认为root，任何一个类只会和一个logger对应，
  要么是定义的logger，要么是root，判断的关键在于找到这个logger，然后判断这个logger的appender和level。
  -->
  <root level="info">
    <appender-ref ref="CONSOLE" />
    <appender-ref ref="APPLICATION" />
    </root>
</configuration>
```

## 配置之后的效果

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250509122240358.png)

## 日志文件存放在哪里


![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250509122302247.png)


![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250509122317982.png)


## 使用 lombok 进行日志记录

在上面的例子中，我们必须在类中声明一个静态的 Logger 对象才能在需要记录日志的地方使用它。

```Java
static Logger logger = LoggerFactory.getLogger(CodingmoreLogbackApplicationTests.class);
```

这样的样板代码令人生厌！  
我们可以通过 **lombok 的方式来解决这个问题，在 pom.xml 文件中加入依赖。**

**<font color="#ff0000">使用 @Slf4j 注解+log</font>**

```Java
<dependency>
	<groupId>org.projectlombok</groupId>
	<artifactId>lombok</artifactId>
</dependency>
```


![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250509122419045.png)


## Logback 中文使用手册

其他可以参考中文使用手册

>[https://github.com/YLongo/logback-chinese-manual](https://github.com/YLongo/logback-chinese-manual)

