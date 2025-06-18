---
tags:
  - 前端
  - HTML&CSS
readingTime: true
comment: false
recommend: 前端
title: HTML&CSS
date: 2025-06-18 09:18:53
---
# HTML&CSS

>笔记记录于看博学谷视频的学习笔记，课程已经有详细的笔记了，这里采用简写记录重点，用于回顾

## 什么是Web

:::details 
就是网站
:::

## 网站的工作流程

1.首先我们需要通过**浏览器**访问发布到**前端服务器**中的**前端程序**，这时候前端程序会将前端代码返回给浏览器。

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250618092536335.png)
2.浏览器得到前端代码，此时浏览器会将前端代码进行解析，然后展示到浏览器的窗口中，这时候我们就看到了**网站**的**页面**，如下图所示：
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250618092552943.png)
3.但是此时这个页面是没有数据的，因为数据在我们的数据库中，所以我们浏览器需要根据**前端代码中指定的后台服务器的地址** 向 我们的**后台服务器**（内部有java程序）发起**请求**，后台服务器再去从**数据库**中获取数据，然后返回给浏览器。
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250618092625316.png)
4.浏览器拿到后台返回的数据后，然后将数据展示在前端资源也就是**网页**上，然后我们就看到了如下图所示的完整的内容

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250618092641501.png)
**整个流程如下：**

1.浏览器先向前端服务器请求**前端资源**，也就是我们所说的**网页**

2.浏览器再向**后台服务器**发起请求，获取**数据**

3.浏览器将得到的后台**数据**填充到**网页**上，然后展示给用户去看

## 网站开发模式

>前后端分离开发  之前的混合开发已经落后了

## 网页由什么组成

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250618092837655.png)
## 网页背后本质是什么
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250618092900256.png)

## 如何转换

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250618092915573.png)
不同浏览器内核不一样，导致相同代码解析出现不同效果，所以要制定标准

## web标准

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250618093004583.png)
## 什么是HTML

>超文本标记语言
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250618093128496.png)
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250618093211118.png)

## 学习网站
https://www.w3school.com.cn/index.html

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250618093356831.png)

>学会查这个文章  

## 什么是CSS

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250618093538630.png)
## 基本骨架

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250618093808076.png)
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250618093844830.png)
## VScode安装

>https://code.visualstudio.com

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250618093921493.png)

英文下! +回车  直接生成HTML骨架

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250618094137879.png)

h1 
img  

输入这些都可以直接自动补全  提升开发效率

设置自动保存

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250618094302861.png)


## HTML常见标签

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250618094345254.png)
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250618094447568.png)
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250618094532951.png)

- img
	- src 
		- 绝对路径
			- 绝对磁盘路径：本地电脑上的图片
			- 绝对网络路径：网络上的图片
		- 相对路径
			-  . 当前路径
			-  .. 代表上一级路径
			- ![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250618094845391.png)
	- alt
	- width： 设置宽度  px像素   % 百分比
	- height：设置高度
	- 宽度和高度一般只写一个，高度也会等比例缩放，如果设置两个就会变得很难看
- h1
- hr
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250618095044519.png)
## CSS引入方式

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250618095207137.png)
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250618095249332.png)
### 优先级
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250618095326245.png)

后加载就是表示哪个代码在下面就是优先哪个

## 颜色表示方式

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250618095436814.png)

这些颜色我们可以去网站上使用取色器来扒下来

### 插件
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250618095653895.png)
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250618095721316.png)

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250618095804428.png)
然后就可以了

## CSS选择器

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250618100013889.png)
### 优先级

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250618100436189.png)
设置字体大小

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250618100537364.png)
## 超链接

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250618100957138.png)

- a
	- href属性：要跳转的url地址
	- target属性：
		-  _self:当前页打开
		-  _blank 打开新的空白页_
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250618101355912.png)
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250618101434497.png)
## 正文排版

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250618101548817.png)
### 视频标签

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250618101828715.png)
### 段落标签

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250618102136751.png)
### 缩进
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250618102233047.png)
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250618102523777.png)
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250618102549787.png)
## 盒子模型

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250618102804681.png)

div专门用来做布局的标签

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250618102921230.png)
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250618103508392.png)
盒子模型都是在样式中设置的


![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250618103816423.png)

效果
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250618103830671.png)
已经有边距了
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250618103920510.png)

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250618104036653.png)
## 布局

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250618104341641.png)
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250618104650551.png)
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250618104712095.png)

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250618104953701.png)

## 表格标签


![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250618105030928.png)
## 表单标签

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250618105554183.png)
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250618105624446.png)
