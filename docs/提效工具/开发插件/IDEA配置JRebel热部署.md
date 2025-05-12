---
tags:
  - IDEA
  - 开发插件
readingTime: true
date: 2025-05-12 20:03:57
recommend: ['开发插件',1]
---
# IDEA配置JRebel热部署

## 参考博客

>https://blog.csdn.net/weixin_42694593/article/details/126448828


## JRebel是什么

>JRebel 是国外团队开发的一款收费工具，JRebel 允许开发团队在有限的时间内完成更多的任务修正更多的问题，发布更高质量的软件产品，**JRebel 可快速实现热部署**，节省了大量重启时间，提高了个人开发效率。
JRebel 是一款 JAVA 虚拟机插件，它使得 Java 程序员能在不进行重部署的情况下，即时看到代码的改变对一个应用程序带来的影响。

## JRebel安装方式

> 可以zip包下载地址：[**JRebel下载**](https://plugins.jetbrains.com/plugin/4441-jrebel-and-xrebel/versions)
> 这里**直接IDEA中**下载


打开IDEA，选择File—>Settings—>Plugins—>在右侧选择Marketplace，
在搜索框输入jrebel—>选择搜索结果—>点击Install（安装），如下图。
这里由于已经安装过了所以显示INSTALLED


![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250512193937471.png)

## 激活方式

### 下载激活软件

下载激活软件：[GitHub地址](https://github.com/ilanyu/ReverseProxy/releases)

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250512194154342.png)

下载后点击exe运行该程序，运行成功后如下图：

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250512194208832.png)

### 生成GUID

Team URL可以使用[在线GUID地址](https://www.guidgen.com/)在线生成GUID
拿到GUID串之后，打开IDEA激活窗口，原来的URL改为http://127.0.0.1:8888/{GUID}，后面的GUID进行替换。
下面邮箱地址可随便输入。
如果失败的话，刷新GUID重新替换即可。
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250512194442124.png)

:::details ⚠️是这个地址 图中那个已经失效
http://127.0.0.1:8888/{GUID}
:::
### 激活成功界面
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250512194322984.png)

## 相关设置

### 1.  JRebel设置成离线工作模式
选择`File`—>`Settings`—>`JRebel & XRebel`，点击右侧的`WORK OFFLINE`


![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250512194705964.png)

设置成功结果如下图

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250512194716754.png)

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250512195603729.png)

### 2.  设置自动编译

打开`File`—>`Settings`—>`Build,Execution,Deployment`—>`Compiler`—>`勾选Build project automatically`
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250512194835785.png)

### 3. 打开运行时编译

按快捷键`Ctrl+Shift+A`, 搜索`Registry`或者按快捷键`Ctrl+Shift+Alt+/`,选择`Registry`。
勾选`compiler.automake.allow.when.app.running`选项
操作如下图：

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250512194923696.png)

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250512194928170.png)

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250512194938379.png)

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250512194946439.png)

## JRebel的使用

### 1. 注意：运行项目时要点击图中红框中的按钮，即可运行：而非原生的idea启动方式


![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250512195019565.png)

第一个按钮是Run，第二个按钮是Debug。

### 2. 修改热部署时间

打开`File`—>`Settings`—>`JRebel & XRebel`，右侧找到`time Saved Statistics`
下面有个时间线，可以自己任意调，滑到最左边是1秒生效。


![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250512195056170.png)

**启动项目后控制台输出如下内容即为热部署已生效**

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250512195100900.png)

> 我的是2025.2.1 版本插件，IDEA是2023版，目测可以生效


![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250512200134496.png)
