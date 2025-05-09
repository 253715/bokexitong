---
tags:
  - SpringBoot
  - 编程喵
readingTime: true
comment: true
date: 2025-05-09 10:42:25
recommend: ['SpringBoot','编程喵',1]
---

# 搭建第一个SpringBoot项目

## 参考教程

>[搭建第一个Spring Boot项目](https://www.yuque.com/itwanger/vn4p17/qpgp46#NA9Hw)

::: tip
创建 Springboot 项目的方式有很多种(一般三种，yupi也讲过)，这里直接使用 IDEA 方式
:::
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250509112038467.png)


## 目录结构

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250509112059146.png)


可以使用 `tree -CfL 3` 命令以树状图列出目录的内容：

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250509112111574.png)


注意：windows 上直接输入 tree

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250509112122302.png)

## 启动 Springboot 项目

### 本地启动方式
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250509112206050.png)




### 服务器启动方式

1. 打包

那如果想把项目打成 jar 包放到服务器上，以 **java -jar xxx.jar** 形式运行的话，该怎么做呢？  
打开 Terminal 终端， 执行命令 **mvn clean package**，等待打包结果。

需要在 pom 中引入打包插件

```
<build>
  <plugins>
    <plugin>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-maven-plugin</artifactId>
    </plugin>
  </plugins>
</build>
```

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250509112236595.png)


2. 将 jar 包上传到服务器上

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250509112253088.png)


3. 执行运行命令

java -jar tobebetterjavaer-0.0.1-SNAPSHOT.jar 命令

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250509112311017.png)


## 热部署

作为开发者，我们希望每次修改代码后，代码能够自动编译，服务能够自动重新加载，这样就省去了重新运行代码的烦恼。  
那 **spring-boot-devtools** 就是这样的一个神器，当我们把它**添加到项目当中后，无论是代码修改，还是配置文件修改，服务都能够秒级重载（俗称热部署），这在我们开发的时候，非常有用。**

### 添加依赖

```
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
</dependency>
```

**修改完代码后点击 build 就可以了，不需要重新启动**

由于 Intellij IDEA 是自动保存的，所以默认情况下，Intellij IDEA 的实时编译是关闭的（建议不要打开，否则已修改就编译，挺废内存的），我们需要**手动点一下 build 按钮**。

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250509112337326.png)

