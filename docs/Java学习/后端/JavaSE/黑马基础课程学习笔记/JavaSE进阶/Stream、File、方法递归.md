---
tags:
  - JavaSE进阶
readingTime: true
comment: false
date: 2025-06-22 20:56:17
recommend:  ['JavaSE进阶',8]
---
# Stream、File、方法递归

## Stream流

### 是什么

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250622205756118.png)
### 案例

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250622205822333.png)
```Java
// 目标：体验Stream流的使用  
List<String> list = new ArrayList<>();  
list.add("张无忌");  
list.add("周芷若");  
list.add("赵敏");  
list.add("张强");  
list.add("张三丰");

// 1、拿出姓张的放到新集合中去。  
List<String> newList = new ArrayList<>();  
for (String s : list) {  
if(s.startsWith("张") && s.length() == 3) {  
newList.add(s);  
}  
}  
System.out.println(newList);
```

### 使用步骤

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250622210937286.png)
```Java
// 2、体验Stream流  
List<String> newList = list.stream().filter  
(s -> s.startsWith("张") && s.length() == 3).collect(Collectors.toList());  
System.out.println(newList);
```
### 常用方法

1. 获取Stream方法

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250622211024360.png)
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250622211055593.png)


2. stream流的中间方法

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250622211145613.png)
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250622211209471.png)
3. 终结方法

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250622211308229.png)

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250622211247766.png)
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250622211343497.png)
## File
> 之前保存数据的方式都是保存在内存中，一旦断电就会出现丢失的情况
> 想要永久保存需要保存在文件中

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250622211438661.png)
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250622211455979.png)
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250622211624411.png)
> File 类只能对文件本身进行操作，不能读写文件中存储的数据，所以需要使用IO流

### 创建对象

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250622211913721.png)

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250622211935014.png)
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250622211950979.png)

### 常用方法

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250622212040363.png)

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250622212110482.png)
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250622212118283.png)
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250622212155648.png)
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250622212244230.png)


### 文件搜索如何实现多级遍历


## IO流
> File 类只能对文件本身进行操作，不能读写文件中存储的数据，所以需要使用IO流

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250622211736022.png)

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250622211747926.png)

### 什么是IO流

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250622212515440.png)
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250622212545586.png)
### IO流的分类

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250622212608239.png)
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250622212620652.png)
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250622212630676.png)
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250622212658634.png)
### 字节输入流

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250622212725770.png)
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250622212751386.png)
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250622212803569.png)
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250622212915882.png)
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250622212957880.png)
### 字节输出流

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250622213031931.png)
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250622213040651.png)
### 案例
1. 文件复制
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250622213108392.png)
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250622213126654.png)
### 释放资源的方式

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250622213202499.png)





