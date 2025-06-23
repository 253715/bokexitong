---
tags:
  - JavaSE进阶
readingTime: true
comment: false
date: 2025-06-21 11:04:06
recommend:  ['JavaSE进阶',5]
---
# 常用API(二) Lambda 方法引用

## Arrays

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250622201533905.png)
### toString

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250622201801803.png)

### copyof  

from  to  

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250622202048166.png)
### copy
original  newlength  给数组扩容
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250622202125530.png)


### setAll
>修改每个数据

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250622202327641.png)


### sort

>排序

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250622202300316.png)

### 自定义排序
>当数组中存放的是对象的时候，需要自定义排序

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250622202507712.png)
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250622202559375.png)
## Lambda表达式
### 是什么

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250622203259936.png)

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250622203326336.png)
### 如何简化
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250622203430065.png)

> 将new去掉，然后方法里面的参数提上去作为第二个参数，然后->大括号里面写最后的返回结果

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250622203745818.png)
### 省略规则

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250622203844219.png)
## 方法引用

### 静态方法的引用
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250622204032226.png)
### 实例方法的引用

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250622204101102.png)
### 特定类型方法的引用
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250622204158354.png)
### 构造器引用

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250622204230755.png)
## 常见算法
### 算法是什么

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250622204302032.png)

### 排序算法

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250622204358452.png)
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250622204406786.png)
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250622204418267.png)
#### 冒泡排序

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250622204513091.png)

#### 选择排序

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250622204537176.png)

### 查找算法

#### 顺序查找

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250622204625669.png)


#### 二分查找

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250622204706871.png)
![PixPin_2025-06-22_20-49-28.gif](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250622204957625.gif)
## 正则表达式

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250622205147243.png)
### 书写规则

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250622205227114.png)
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250622205238571.png)

### 应用案例

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250622205348621.png)
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250622205414388.png)

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250622205425943.png)

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250622205437251.png)
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250622205445732.png)
