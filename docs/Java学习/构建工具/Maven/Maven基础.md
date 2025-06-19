---
tags:
  - Maven基础
readingTime: true
comment: false
date: 2025-06-19 10:40:03
recommend:  ['Maven基础',2]
---
# Maven基础


## Maven是什么

> Maven 是一款用于管理和构建Java项目的工具，是Apache旗下的一个开源项目 。
> 开源项目：[https://www.apache.org/index.html#projects-list](https://www.apache.org/index.html)


## 为什么需要Maven  有什么作用

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619104207537.png)

- 依赖管理 ：没有maven之前需要导jar包，有了maven之后直接写依赖就可以，不用导jar包了
- 项目构建 ：通过Maven中的命令，就可以很方便的完成项目的编译(compile)、测试(test)、打包(package)、发布(deploy) 等操作。可以跨平台
- 统一的项目结构： 统一项目结构可以使得同一个项目在不同IDE中都可以进行运行 比如IDEA vscode等
	- ![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619104433074.png)


## maven的几种仓库

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619104513118.png)
- 本地仓库：自己计算机上的一个目录(用来存储jar包)
    
- 中央仓库：由Maven团队维护的全球唯一的。仓库地址：[https://repo1.maven.org/maven2/](https://repo1.maven.org/maven2/)
    
- 远程仓库(私服)：一般由公司团队搭建的私有仓库


当项目中使用坐标引入对应依赖jar包后，首先会查找本地仓库中是否有对应的jar包

- 如果有，则在项目直接引用
    
- 如果没有，则去中央仓库中下载对应的jar包到本地仓库
    

如果还可以搭建远程仓库(私服)，将来jar包的查找顺序则变为： 本地仓库 --> 远程仓库--> 中央仓库

## 安装

下载地址：[https://maven.apache.org/download.cgi](https://maven.apache.org/download.cgi)


Maven安装配置步骤：

1. 解压安装
		![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619104729388.png)
2. 配置仓库
     ![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619104657358.png)
3. 配置阿里云私服
	    ![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619104801369.png)
		![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619104810441.png)
```
<mirror>  
    <id>alimaven</id>  
    <name>aliyun maven</name>  
    <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
    <mirrorOf>central</mirrorOf>          
</mirror>
```

4. 配置Maven环境变量
		![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619104950004.png)
		![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619105000941.png)

## IDEA集成Maven
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619105124113.png)


## 创建Maven项目

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619105147127.png)

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619105153251.png)

## 导入maven项目

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619105217841.png)

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619105225053.png)

方式三
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619105436338.png)

## 依赖管理

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619105524469.png)

## 单元测试

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619105610034.png)

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619105623568.png)

## maven常见问题

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619105652891.png)
