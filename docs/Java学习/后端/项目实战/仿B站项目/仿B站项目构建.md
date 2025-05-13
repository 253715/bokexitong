---
tags:
  - Java项目实战
  - SpringBoot
  - 仿B站项目
readingTime: true
date: 2025-05-12 12:50:16
comment: false
recommend: ['仿B站项目',2]
---
# 仿B站项目构建

## 安装所需要的项目环境

### 视频教程

<iframe src="https://www.bilibili.com/video/BV1aW2NYREFh?spm_id_from=333.788.player.switch&amp;vd_source=2074845aa36e291c34caa4671c3b2eda&amp;p=3" allow="fullscreen" allowfullscreen="" style="height:100%;width:100%; aspect-ratio: 16 / 9; "></iframe>

### 文档教程
>https://coderlaoluo.feishu.cn/wiki/Tt71wL94Tipzuzkc8QRc4To8nlb

### 安装ffmpeg并且配置环境变量
<iframe src="https://www.bilibili.com/video/BV1qV4y1d7zY?spm_id_from=333.788.videopod.episodes&amp;vd_source=2074845aa36e291c34caa4671c3b2eda&amp;p=3" allow="fullscreen" allowfullscreen="" style="height:100%;width:100%; aspect-ratio: 16 / 9; "></iframe>


## 构建项目目录

>https://coderlaoluo.feishu.cn/wiki/YDqiwp8ySiYxoYkwn8xcFIjCnzf

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250512144210804.png)


![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250513134547595.png)

## pom配置文件

### 根pom

```XML
<?xml version="1.0" encoding="UTF-8"?>

<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.7.18</version>
        <relativePath/>
    </parent>
    <groupId>com.easylive</groupId>
    <artifactId>easylive</artifactId>
    <version>1.0</version>
    <packaging>pom</packaging>

    <modules>
        <module>easylive-common</module>
        <module>easylive-admin</module>
        <module>easylive-web</module>
    </modules>

    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>
        <skipTests>true</skipTests>

        <springboot.version>2.7.18</springboot.version>
        <mybatis.version>1.3.2</mybatis.version>
        <logback.version>1.2.10</logback.version>
        <mysql.version>8.0.23</mysql.version>
        <aspectjweaver.version>1.9.3</aspectjweaver.version>
        <fastjson.version>1.2.83</fastjson.version>
        <commons.lang3.version>3.4</commons.lang3.version>
        <commons.csv.version>1.2</commons.csv.version>
        <commons.codec.version>1.9</commons.codec.version>
        <commons.io.version>2.5</commons.io.version>
        <lombok.version>1.18.22</lombok.version>
        <captcha.verion>1.6.2</captcha.verion>
        <es.version>3.3.2</es.version>
    </properties>

    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-web</artifactId>
                <version>${springboot.version}</version>
                <exclusions>
                    <exclusion>
                        <groupId>ch.qos.logback</groupId>
                        <artifactId>logback-classic</artifactId>
                    </exclusion>
                    <exclusion>
                        <groupId>ch.qos.logback</groupId>
                        <artifactId>logback-core</artifactId>
                    </exclusion>
                </exclusions>
            </dependency>

            <dependency>
                <groupId>org.mybatis.spring.boot</groupId>
                <artifactId>mybatis-spring-boot-starter</artifactId>
                <version>${mybatis.version}</version>
            </dependency>

            <!-- 数据库-->
            <dependency>
                <groupId>mysql</groupId>
                <artifactId>mysql-connector-java</artifactId>
                <version>${mysql.version}</version>
            </dependency>

            <!-- 日志版本 -->
            <dependency>
                <groupId>ch.qos.logback</groupId>
                <artifactId>logback-classic</artifactId>
                <version>${logback.version}</version>
            </dependency>
            <dependency>
                <groupId>ch.qos.logback</groupId>
                <artifactId>logback-core</artifactId>
                <version>${logback.version}</version>
            </dependency>

            <!--切面-->
            <dependency>
                <groupId>org.aspectj</groupId>
                <artifactId>aspectjweaver</artifactId>
                <version>${aspectjweaver.version}</version>
            </dependency>

            <!--fastjson-->
            <dependency>
                <groupId>com.alibaba</groupId>
                <artifactId>fastjson</artifactId>
                <version>${fastjson.version}</version>
            </dependency>

            <dependency>
                <groupId>org.apache.commons</groupId>
                <artifactId>commons-lang3</artifactId>
                <version>${commons.lang3.version}</version>
            </dependency>

            <dependency>
                <groupId>commons-codec</groupId>
                <artifactId>commons-codec</artifactId>
                <version>${commons.codec.version}</version>
            </dependency>

            <dependency>
                <groupId>commons-io</groupId>
                <artifactId>commons-io</artifactId>
                <version>${commons.io.version}</version>
            </dependency>

            <!---es search-->
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-data-elasticsearch</artifactId>
                <version>${es.version}</version>
            </dependency>

            <dependency>
                <groupId>org.projectlombok</groupId>
                <artifactId>lombok</artifactId>
                <version>${lombok.version}</version>
            </dependency>

            <dependency>
                <groupId>com.github.whvcse</groupId>
                <artifactId>easy-captcha</artifactId>
                <version>${captcha.verion}</version>
            </dependency>

        </dependencies>
    </dependencyManagement>
</project>
```

### common模块pom

```XML
<?xml version="1.0" encoding="UTF-8"?>

<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>com.easylive</groupId>
        <artifactId>easylive</artifactId>
        <version>1.0</version>
    </parent>
    <groupId>com.easylive</groupId>
    <artifactId>easylive-common</artifactId>
    <version>1.0</version>
    <packaging>jar</packaging>

    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>
        <skipTests>true</skipTests>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <!--mybatis-->
        <dependency>
            <groupId>org.mybatis.spring.boot</groupId>
            <artifactId>mybatis-spring-boot-starter</artifactId>
        </dependency>

        <!-- 数据库-->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
        </dependency>

        <!-- 日志版本 -->
        <dependency>
            <groupId>ch.qos.logback</groupId>
            <artifactId>logback-classic</artifactId>
        </dependency>
        <dependency>
            <groupId>ch.qos.logback</groupId>
            <artifactId>logback-core</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-redis</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-elasticsearch</artifactId>
        </dependency>

        <!--切面-->
        <dependency>
            <groupId>org.aspectj</groupId>
            <artifactId>aspectjweaver</artifactId>
        </dependency>

        <!--fastjson-->
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>fastjson</artifactId>
        </dependency>

        <!--apache common-->
        <dependency>
            <groupId>org.apache.commons</groupId>
            <artifactId>commons-lang3</artifactId>
        </dependency>

        <dependency>
            <groupId>commons-codec</groupId>
            <artifactId>commons-codec</artifactId>
        </dependency>

        <dependency>
            <groupId>commons-io</groupId>
            <artifactId>commons-io</artifactId>
        </dependency>

        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>

        <dependency>
            <groupId>com.github.whvcse</groupId>
            <artifactId>easy-captcha</artifactId>
        </dependency>

    </dependencies>
</project>
```


### admin模块pom

```XML
<?xml version="1.0" encoding="UTF-8"?>

<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>com.easylive</groupId>
        <artifactId>easylive</artifactId>
        <version>1.0</version>
    </parent>
    <groupId>com.easylive</groupId>
    <artifactId>easylive-admin</artifactId>
    <version>1.0</version>
    <packaging>jar</packaging>

    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>
        <skipTests>true</skipTests>
    </properties>

    <dependencies>
        <dependency>
            <groupId>com.easylive</groupId>
            <artifactId>easylive-common</artifactId>
            <version>1.0</version>
        </dependency>

    </dependencies>
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <version>2.2.6.RELEASE</version>
                <configuration>
                    <mainClass>com.easylive.admin.EasyliveAdminRunApplication</mainClass>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
```

### web模块pom

```XML
<?xml version="1.0" encoding="UTF-8"?>

<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>com.easylive</groupId>
        <artifactId>easylive</artifactId>
        <version>1.0</version>
    </parent>
    <groupId>com.easylive</groupId>
    <artifactId>easylive-web</artifactId>
    <version>1.0</version>
    <packaging>jar</packaging>

    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>
        <skipTests>true</skipTests>
    </properties>

    <dependencies>
        <dependency>
            <groupId>com.easylive</groupId>
            <artifactId>easylive-common</artifactId>
            <version>1.0</version>
        </dependency>

    </dependencies>
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <version>2.2.6.RELEASE</version>
                <configuration>
                    <mainClass>com.easylive.web.EasyliveWebRunApplication</mainClass>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
```

## 日志文件logback

>这个日志文件是Springboot默认支持的，也可以使用其他日志框架

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250513135035412.png)



```XML
<?xml version="1.0" encoding="UTF-8" ?>
<configuration scan="true" scanPeriod="10 minutes">
    <appender name="stdot" class="ch.qos.logback.core.ConsoleAppender">
        <layout class="ch.qos.logback.classic.PatternLayout">
            <pattern>%d{yyyy-MM-dd HH:mm:ss,GMT+8} [%p][%c][%M][%L]-> %m%n</pattern>
        </layout>
    </appender>

    <springProperty scope="context" name="log.path" source="project.folder"/>
    <springProperty scope="context" name="log.root.level" source="log.root.level"/>
    <springProperty scope="context" name="appname" source="spring.application.name"/>

    <property name="LOG_FOLDER" value="logs"/>

    <appender name="file" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>${log.path}/${LOG_FOLDER}/${appname}.log</file>
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <FileNamePattern>${log.path}/${LOG_FOLDER}/${appname}.%d{yyyyMMdd}.%i</FileNamePattern>
            <cleanHistoryOnStart>true</cleanHistoryOnStart>
            <TimeBasedFileNamingAndTriggeringPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedFNATP">
                <MaxFileSize>20MB</MaxFileSize>
            </TimeBasedFileNamingAndTriggeringPolicy>
            <maxHistory>30</maxHistory>
        </rollingPolicy>
        <encoder>
            <charset>utf-8</charset>
            <pattern>%d{yyyy-MM-dd HH:mm:ss,GMT+8} [%p][%c][%M][%L]-> %m%n</pattern>
        </encoder>
        <append>false</append>
        <prudent>false</prudent>
    </appender>

    <logger name="org.springframework.boot.autoconfigure.logging.ConditionEvaluationReportLoggingListener"
            level="error"></logger>
    <logger name="org.redisson.connection.DNSMonitor" level="error"></logger>
    <logger name="com.zaxxer.hikari" level="info"></logger>
    <logger name="io.lettuce.core" level="info"></logger>
    <logger name="org.springframework.data.redis" level="info"></logger>
    <root level="${log.root.level}">
        <appender-ref ref="stdot"/>
        <appender-ref ref="file"/>
    </root>

</configuration>
```

## application.yml

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250513135053073.png)


```YAML
server:
  port: 7070
  servlet:
    context-path: /admin
spring:
  servlet:
    multipart:
      max-file-size: 10MB
      max-request-size: 15MB
  application:
    name: easylive-admin
  datasource:
    url: jdbc:mysql://127.0.0.1:3306/easylive?serverTimezone=GMT%2B8&useUnicode=true&characterEncoding=utf8&autoReconnect=true&allowMultiQueries=true&useSSL=false
    username: root
    password: root
    driver-class-name: com.mysql.cj.jdbc.Driver
    hikari:
      pool-name: HikariCPDatasource
      minimum-idle: 5
      idle-timeout: 180000
      maximum-pool-size: 10
      auto-commit: true
      max-lifetime: 1800000
      connection-timeout: 30000
      connection-test-query: SELECT 1
  redis:
    database: 0
    host: 127.0.0.1
    port: 6379
    jedis:
      pool:
        max-active: 20
        max-wait: -1
        max-idle: 10
        min-idle: 0
    timeout: 2000
#mybatis 大小写转驼峰
mybatis:
  configuration:
    map-underscore-to-camel-case: true

project:
  folder: c:/webser/easylive/
log:
  root:
    level: debug
admin:
  account: admin
  password: admin123
```

## 编写测试类来进行测试

### 测试web端

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250513135915224.png)

```java
	package com.xiaokai.easyliveweb.controller;  
	  
	  
	import org.springframework.web.bind.annotation.RequestMapping;  
	import org.springframework.web.bind.annotation.RestController;  
	  
	@RestController  
	  
	public class test {  
	  
	@RequestMapping("/test")  
	public String test(){  
	return "hello world";  
	}  
	}
```

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250513135958484.png)
### 测试admin端


![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250513140302268.png)


```java

package com.xiaokai.easyliveadmin.controller;  
  
  
import org.springframework.web.bind.annotation.RequestMapping;  
import org.springframework.web.bind.annotation.RestController;  
  
@RestController  
public class test {  
  
@RequestMapping(value = "/test")  
public String test() {  
return "hello world admin";  
}  
}
```

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250513140317087.png)

> test前面多了个admin，因为在application中配置了这个请求前缀

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250513140405412.png)


到这里后端的初始化就完成了