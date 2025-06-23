---
tags:
  - JavaSE进阶
readingTime: true
comment: false
date: 2025-06-23 10:30:31
recommend:  ['JavaSE进阶',10]
---

# IO(二)
## 学习内容

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250623104927984.png)
>字节流适合复制文件，不适合读写文本文件
>字符流适合读写文本文件内容

## 文件字符输入流

### 是什么

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250623105100571.png)
### 常用方法·

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250623105123073.png)
## 文件字符输出流

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250623105201612.png)
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250623105215434.png)

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250623105238791.png)
## 缓冲流
> 缓冲流的作用就是对原始流进行包装，提高原始流读写数据的性能

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250623105331468.png)
### 字节缓冲流

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250623105438955.png)
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250623105455918.png)
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250623105512959.png)
### 字符缓冲流

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250623105559151.png)
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250623105623999.png)
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250623105645929.png)
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250623105701539.png)
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250623105712192.png)
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250623105742340.png)
## 转换流
### 为什么需要
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250623105806200.png)
### 字符输入转换流
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250623105834949.png)
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250623105857667.png)
### 字符输出转换流

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250623105949195.png)
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250623110101164.png)
## 打印流

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250623110205447.png)
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250623110246136.png)

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250623110257099.png)
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250623110324662.png)
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250623110339249.png)
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250623110352799.png)
## 数据流

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250623110422892.png)
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250623110445228.png)
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250623110453862.png)
## 序列化流

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250623110528771.png)
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250623110545146.png)
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250623110557352.png)
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250623110610309.png)
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250623110622171.png)
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250623110631563.png)
## IO框架

### 是什么
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250623110722098.png)

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250623110733053.png)
### 常用方法

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250623110756271.png)
