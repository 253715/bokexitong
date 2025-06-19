---
tags:
  - JavaSE进阶
readingTime: true
comment: false
date: 2025-06-19 21:20:57
recommend:  ['JavaSE进阶',4]
---
# 常用API(一)

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619212312613.png)

## StringBuilder

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619212434510.png)
### 创建StringBuilder对象

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619212626749.png)
### 拼接内容

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619212652125.png)

> 链式拼接

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619212751380.png)
### 反转内容  
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619212858061.png)

>用的最多的就是append和toString
>StringBuilder 不用反复创建对象比String快很多  效率更高

### 案例

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619213728153.png)


![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619213651294.png)

## StringBuffer

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619213248004.png)

## StringJoiner

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619213856901.png)

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619214107705.png)

## Math  System  Runtime
### Math
>math 工具类  数学类

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619214304663.png)
### Runtime
>runtime表示运行时环境  也就是jvm

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619214404471.png)
### System
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619214549153.png)

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619214650242.png)

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619214733989.png)

## BigDecimal

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619214849322.png)
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619215232753.png)

>使用第二个方法可以处理精度问题 先将数字转变为字符串 原理其实很简单 0.1  +0.2  其实就是将 1和2 拆出来
>然后加起来  3  然后拼上. 和0  变成  0.3
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619215306578.png)

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619215754973.png)

> 直接使用 BigDecimal.valueOf  其实底层就是调用的第二种构造方法

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619215728828.png)

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619220142847.png)
