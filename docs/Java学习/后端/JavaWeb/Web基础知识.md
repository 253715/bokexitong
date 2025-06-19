---
tags:
  - JavaWeb基础
readingTime: true
comment: false
date: 2025-06-19 14:41:12
recommend:  ['JavaWeb基础',1]
---
# Web基础知识

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619145751165.png)

- <font color="#ff0000">servlet</font>  jsp  动态资源  逻辑处理
- html css js  静态资源  页面展示
- 动态资源和静态资源都是保存在web服务器<font color="#ff0000">(tomcat服务器)</font>中的
- B/S架构  浏览器/服务器架构    
- 浏览器和服务器之间通过<font color="#ff0000">http协议</font>进行交流

## Tomcat

### 是什么

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619150210187.png)

https://tomcat.apache.org/

### 基本使用

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619150304704.png)


## Servlet


### 是什么

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619150441013.png)
### 执行流程

浏览器访问：http://localhost:8080/servlet-demo/hello?name=Tomcat

- 定位服务器
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619150627480.png)
- 定位项目
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619150720257.png)
- 定位servlet程序
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619150759197.png)
- 执行servlet
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619150833007.png)

## HTTP

### 是什么

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619150951680.png)
### 请求数据格式

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619151440675.png)

- 请求行
- 请求头
- 请求体
- 请求方式
	- GET 请求参数在请求行中，没有请求体  大小有限制
	- POST 请求参数在请求体中  大小没有限制

### 请求数据获取

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619152222068.png)
### 响应数据格式

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619152317153.png)
- 响应行
- 响应头
- 响应体

### 状态码

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619152417702.png)
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619152426649.png)
### 响应数据设置

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619152502064.png)
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619152529103.png)

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619152537096.png)
## SpringBootWeb入门

>刚才我们讲解了基于原始的Servlet程序开发Web应用，并基于此讲解了Http协议。 那接下来呢，我们就要来讲解现在企业开发的主流技术 SpringBoot，并基于SpringBoot进行Web程序的开发 。

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619155025919.png)

SpringBoot特点：
- 简化配置
- 快速开发

### **main方法如何启动Tomcat ？**

>因为我们在创建springboot项目的时候，选择了web开发的起步依赖 spring-boot-starter-web。而spring-boot-starter-web依赖，又依赖了spring-boot-starter-tomcat，由于maven的依赖传递特性，那么在我们创建的springboot项目中也就已经有了tomcat的依赖，这个其实就是springboot中内嵌的tomcat。
  而我们运行引导类中的main方法，其实启动的就是springboot中内嵌的Tomcat服务器。 而我们所开发的项目，也会自动的部署在该tomcat服务器中，并占用8080端口号 。

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619155523466.png)

### **Tomcat是一个servlet容器，为什么可以运行我们编写的HelloController？**

>那我们在浏览器地址栏访问 `http://localhost:8080/hello?name=Tom` 时是如何访问到HelloController程序的呢？ 这是因为啊，虽然我们没有编写Servlet程序，但是呢，在Springboot框架的底层源码中，给我们提供了一个核心的Servlet程序，叫 **`DispatcherServlet`**。

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619155820595.png)
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619155856934.png)

>前端发起的所有请求到达服务器之后，都会被DispatcherServlet接收并处理，而DispatcherServlet并不会直接对请求进行处理，而是将请求转发给后面我们自己编写的Controller程序，最终有Controller程序来进行请求的处理。
  所以，我们基于Springboot进行Web程序的开发，是不需要直接编写原始的Servlet程序的，我们只需要编写Controller程序，来接收请求，响应数据即可。