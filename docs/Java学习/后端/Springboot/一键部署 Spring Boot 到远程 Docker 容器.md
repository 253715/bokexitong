---
tags:
  - SpringBoot
  - 编程喵
readingTime: true
comment: false
date: 2025-05-09 16:20:49
recommend: ['SpringBoot','编程喵',18]
---
# 一键部署 Spring Boot 到远程 Docker 容器



## 安装Docker

### 宝塔面板安装
> 我这个宝塔自带就安装好了

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250509141420631.png)

>没有的话可以到应用商店安装

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250509141511762.png)

#### 验证是否安装成功
```sh
sudo docker run hello-world
```

>出现下面这个界面就是成功了


![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250509141659358.png)

### 命令行安装

```sh
# 首先安装 
Docker yum -y install docker 
# 然后启动 Docker 服务 
service docker start 
# 测试安装是否成功 
docker -v
```

## 开启 Docker 远程访问权限

>为了将我们**本地的应用程序部署到 Docker 服务器上**，我们需要开启一下 Docker 的远程访问权限。

### 第一步，通过以下命令打开 Docker 配置文件

```sh
sudo vim /usr/lib/systemd/system/docker.service
```

### 第二步，在 service 节点下编辑 ExecStart 属性，增加 -H tcp://0.0.0.0:2375
::: tip 科普
进入vim 编辑模式  i  或者insert
退出  esc
保存 :wq!
:::

![](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250509142409753.png)

这样就相当于对外开放了 2375 端口，如果你安装了宝塔面板，记得在安全页放行该端口，同时，云服务器的防火墙也要放开该端口。

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250509143255291.png)
### 重启docker

```sh
sudo systemctl daemon-reload 
sudo systemctl restart docker
```

在浏览器地址栏输入 http://ip:2375/version 测试一下是否生效

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250509143135640.png)
### 在IDEA中配置


之后，可以在 Intellij IDEA 中配置一下 Docker 的 TCP socket，如果出现 connection successful 就表明链接成功了。

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250509143516427.png)

## 使用 Docker 部署 Spring Boot


### 第一步，新建一个简单的 Spring Boot 项目。

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250509143750930.png)

一个非常简单的 Web 项目，只有一个控制器，代码如下：

```Java
@RequestMapping 
@RestController 
public class DockerController { 
@RequestMapping("/") 
public String hello() { 
return "Docker，我告诉你，沉默王二是沙雕"; 
} 
}
```
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250509143844924.png)

> 这个本地就应该是这样的


![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250509144011568.png)
OK，项目可以正常访问。

### 第二步，构建 Spring Boot 项目的 Docker 镜像文件 Dockerfile。

> 我们在本地跑起来了，那么我们如何将这个部署到Docker容器中，这里需要DockerFIle文件

在项目根目录新建 Dockerfile 文件，见下图位置。

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250509144312068.png)


![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250509144333765.png)

具体内容如下所示：

```JAVA
FROM openjdk:8-jdk-alpine 
ARG JAR_FILE=target/*.jar 
COPY ${JAR_FILE} app.jar 
ENTRYPOINT ["java","-jar","/app.jar"]
```

- FROM openjdk:8-jdk-alpine：表示使用 **JDK8 为基础镜像。**
- ARG JAR_FILE=target/*.jar：表示定义一个参数名为 JAR_FILE，值为 target/*.jar 的**构建参数**
- COPY ${JAR_FILE} app.jar：表示把 target 目录下的 jar 文件复制一份新的到**镜像内的 app.jar 文件**
- ENTRYPOINT ["java","-jar","/app.jar"]：表示通过 java -jar 的形式运行 app.jar，ENTRYPOINT 用来**配置容器启动时的运行命令**，第一个参数是**运行命令**，后面是一个**一个参数**。

### 第三步，在 pom.xml 文件中添加 Maven 的 Docker 插件。


```Java
<plugin>  
<groupId>com.spotify</groupId>  
<artifactId>docker-maven-plugin</artifactId>  
<version>1.2.2</version>  
<executions>  
<execution>  
<id>build-image</id>  
<phase>package</phase>  
<goals>  
<goal>build</goal>  
</goals>  
</execution>  
</executions>  
<configuration>  
<dockerHost>http://ip:2375</dockerHost>  
<imageName>itwanger/${project.artifactId}</imageName>  
<imageTags>  
<imageTag>${project.version}</imageTag>  
</imageTags>  
<forceTags>true</forceTags>  
<dockerDirectory>${project.basedir}</dockerDirectory>  
<resources>  
<resource>  
<targetPath>/</targetPath>  
<directory>${project.build.directory}</directory>  
<include>${project.build.finalName}.jar</include>  
</resource>  
</resources>  
</configuration>  
</plugin>

```

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250509144716416.png)


- 在 executions 节点下添加 docker:build，表示在执行 mvn:package 打包的时候顺带构建一下 Docker 镜像。
- 在 configuration 节点下添加 Docker 主机的地址、镜像的名字、镜像的版本、镜像文件的目录、以及 resources 节点下配置的 jar 包位置和名称等。

配置搞定后，接下来就是对项目进行打包，可以直接点击 Maven 面板中的 package 进行打包

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250509154623469.png)


![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250509154518923.png)

> 打包成功的截图

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250509154546635.png)


:::danger ⚠️

这里有个很坑的点，就是创建SpringBoot项目的时候，如果勾选了git仓库，打包的时候就会报错，不知道为毛，可能因为远程linux上没有git

:::

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250509154752246.png)
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250509154809041.png)


首次打包需要下载一些基础镜像，打包成功后，可以在 Docker 容器中查看我们刚刚打包好的镜像，命令 docker images。

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250509154906973.png)

上面是在IDEA中查看或者使用命令查看

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250509155004898.png)


启动镜像容器

```sh
sudo docker run -d --name itwanger -p 8080:8080 itwanger/docker:0.0.1-SNAPSHOT
```

- -d: 后台运行容器，并返回容器ID；
- --name: 为容器指定一个名称 itwanger；
- -p: 指定端口映射，格式为：主机(宿主)端口:容器端口

>这里我遇到了第二个报错


![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250509161304747.png)


解决方法参考

>https://blog.csdn.net/qq_33697094/article/details/110549536


![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250509161431686.png)

> 原因是因为我多了这个代码，删掉


![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250509161525075.png)

然后运行就可以了

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250509161558654.png)


输入ip地址+8080 成功运行

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250509161624041.png)
## IDEA直连Docker
### 参考文章

>https://www.yuque.com/itwanger/vn4p17/yy0tuv#bdf13904

> 这种方式省掉了打包的过程


