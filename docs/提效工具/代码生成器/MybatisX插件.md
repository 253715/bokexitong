---
tags:
  - 代码生成器
  - Mybatis插件
readingTime: true
date: 2025-05-11 21:53:45
comment: false
recommend: ['代码生成器',1]
---
# MybatisX插件
## MybatisX插件的使用

Mybatis-X插件，自动根据数据库生成 ​
- domain（实体对象）​
- mapper（操作数据库的对象）​
- mapper.xml（定义了mapper对象和数据库的关联，可以在里面自己写SQL）​
- service（包含常用的增删改查）​
	- serviceImpl（具体实现service）
### 1. 插件的安装

>File -> Settings -> Plugins -> 搜索MyBatisX -> Install​

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250508110932611.png)

### 2. 插件的使用

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250508111012828.png)

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250508111028834.png)

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250508111046702.png)

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250508111104754.png)

>勾选 Comment 可以在生成的实体类添加注释​
  勾选 Actual Column 可以让生成实体类的字段名和数据库保持一致

### 3. 代码整合​
- domain 放入 model 包​
- UserMapper 放入mapper 包​
- impl 和 UserService 放入 service 包​
- 删除 generator


## 注意点

### 1. 第一个问题

- domain 放入 model 包​
- UserMapper 放入mapper 包​
- impl 和 UserService 放入 service 包​
> 在代码移动之后需要修改代码中的包名，因为包名原来在generator包下，修改mapper.xml里面的引入的包名
### 2. 第二个问题

- 问题原因：MyBatisX自动开启从经典数据库列名 A_COLUMN（下划线命名） 到经典 Java 属性名 aColumn（驼峰命名） 的类似映射​
- 问题解决：yml 文件中添加如下配置
	[官网描述【链接已更新】](https://baomidou.com/reference/#mapunderscoretocamelcase)

```yml
mybatis-plus:​
  configuration:​
    map-underscore-to-camel-case: false
```

