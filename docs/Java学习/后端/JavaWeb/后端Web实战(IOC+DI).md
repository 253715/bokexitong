---
tags:
  - JavaWeb基础
readingTime: true
comment: false
date: 2025-06-19 21:13:25
recommend:  ['JavaWeb基础',2]
---

# 后端Web实战(IOC+DI) 


## 前言

Web开发的基础知识 ，包括 Tomcat、Servlet、HTTP协议等，我们都已经学习完毕了，那接下来，我们就要进入Web开发的实战篇。在实战篇中，我们将通过一个案例，来讲解Web开发的核心技术。

我们先来看一下，在这个实战篇中，我们都要完成哪些功能。

1). 部门管理

![image-20231124185321152](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619160222299.png) 

2). 员工管理

![image-20231124185333733](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619160222300.png)

3). 员工信息统计

![image-20231124185350081](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619160222301.png) 

4). 日志信息统计

![image-20231124185403734](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619160222302.png)



5). 班级管理

6). 学员管理

7). 学员信息统计

8). 登录认证

上述需求，都是在这个案例中，我们需要完成的功能 。

而我们今天主要完成如下功能：

> 1. 开发规范
>
> 2. 环境准备
>
> 3. 查询部门
>
> 4. 分层解耦（IOC+DI）





## 1. 开发规范

### 1.1 前后端分离开发

在之前的课程中，我们介绍过，现在的企业项目开发有2种开发模式：**前后台混合开发和前后台分离开发。**

前后台混合开发，顾名思义就是前台后台代码混在一起开发，如下图所示：

<img src="https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619160222303.png" alt="image-20231124150054091" style="zoom:67%;" /> 

这种开发模式有如下缺点：

- 沟通成本高：后台人员发现前端有问题，需要找前端人员修改，前端修改成功，再交给后台人员使用
- 分工不明确：后台开发人员需要开发后台代码，也需要开发部分前端代码。很难培养专业人才
- 不便管理：所有的代码都在一个工程中
- 难以维护：前端代码更新，和后台无关，但是需要整个工程包括后台一起重新打包部署。



所以我们目前基本都是采用的前后台分离开发方式，如下图所示：

<img src="https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619160222304.png" alt="image-20231124150213401" style="zoom: 67%;" /> 

我们将原先的工程分为前端工程和后端工程这2个工程，然后前端工程交给专业的前端人员开发，后端工程交给专业的后端人员开发。

前端页面需要数据，可以通过**发送异步请求**，从后台工程获取。但是，我们前后台是分开来开发的，那么前端人员怎么知道后台返回数据的格式呢？后端人员开发，怎么知道前端人员需要的数据格式呢？

所以针对这个问题，我们前后台统一制定一套规范！我们前后台开发人员都需要遵循这套规范开发，这就是我们的**接口文档**。接口文档有**离线版和在线版本**，接口文档示可以查询今天提供**资料/接口文档**里面的资料。

那么接口文档的内容怎么来的呢？是我们后台开发者根据**产品经理提供的产品原型和需求文档所撰写出来的**，产品原型示例可以参考今天提供**资料/页面原型**里面的资料。



那么基于前后台分离开发的模式下，我们后台开发者开发一个功能的具体流程如何呢？如下图所示：

<img src="https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619160222305.png" alt="image-20231124150335609" style="zoom: 67%;" /> 

1. 需求分析：首先我们需要阅读需求文档，分析需求，理解需求。
2. 接口定义：查询接口文档中关于需求的接口的定义，包括地址，参数，响应数据类型等等
3. 前后台并行开发：各自按照接口文档进行开发，实现需求
4. 测试：前后台开发完了，各自按照接口文档进行测试
5. 前后段联调测试：前段工程请求后端工程，测试功能





### 1.2 Restful

我们的案例是基于当前最为主流的前后端分离模式进行开发。

<img src="https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619160222306.png" alt="image-20231124150634301" style="zoom:67%;" /> 

在前后端分离的开发模式中，前后端开发人员都需要根据提前定义好的接口文档，来进行前后端功能的开发。

> 后端开发人员：必须严格遵守提供的接口文档进行后端功能开发（保障开发的功能可以和前端对接）

而在前后端进行交互的时候，我们需要基于当前主流的**REST风格的API接口**进行交互。

**什么是REST风格呢?**

- REST（Representational State Transfer），表述性状态转换，它是一种软件架构风格。



**传统URL风格如下：**

```url
http://localhost:8080/user/getById?id=1     GET：查询id为1的用户
http://localhost:8080/user/saveUser         POST：新增用户
http://localhost:8080/user/updateUser       POST：修改用户
http://localhost:8080/user/deleteUser?id=1  GET：删除id为1的用户
```

我们看到，原始的传统URL呢，定义比较复杂，而且将资源的访问行为对外暴露出来了。



**基于REST风格URL如下：**

```
http://localhost:8080/users/1  GET：查询id为1的用户
http://localhost:8080/users    POST：新增用户
http://localhost:8080/users    PUT：修改用户
http://localhost:8080/users/1  DELETE：删除id为1的用户
```

其中总结起来，就一句话：通过URL定位要操作的资源，通过HTTP动词(请求方式)来描述具体的操作。



在REST风格的URL中，通过四种请求方式，来操作数据的增删改查。 

- GET ： 查询
- POST ：新增
- PUT ：修改
- DELETE ：删除

我们看到如果是基于REST风格，定义URL，URL将会更加简洁、更加规范、更加优雅。

> 注意事项：
>
> - REST是风格，是约定方式，约定不是规定，可以打破
> - 描述模块的功能通常使用复数，也就是加s的格式来描述，表示此类资源，而非单个资源。如：users、emps、books…





## 2. 环境准备

### 2.1 Apifox

我们上面讲到，在这个案例中，我们将会基于Restful风格的接口进行交互，那么其中就涉及到常见的4中请求方式，包括：POST、DELETE、PUT、GET。

<img src="https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619160222307.png" alt="image-20231124151005312" style="zoom:80%;" /> 



因为在**浏览器地中所发起的所有的请求，都是GET**方式的请求。那大家就需要思考两个问题：

- 前后端都在并行开发，后端开发完对应的接口之后，如何对接口进行请求测试呢？
- 前后端都在并行开发，前端开发过程中，如何获取到数据，测试页面的渲染展示呢？

那这里我们就可以借助一些接口测试工具，比如项：Postman、ApiPost、ApiFox等。

<img src="https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619160222308.png" alt="image-20231124151255248" style="zoom:67%;" /> 

那这些工具的使用基本类似，只不过Apifox工具的功能更强强大、更加完善，所以在课程中，我们会采用功能更为强大的**ApiFox**工具。 



#### 2.2.1 介绍

介绍：Apifox是一款集成了Api文档、Api调试、Api Mock、Api测试的一体化协作平台。

作用：接口文档管理、接口请求测试、Mock服务。

官网： https://apifox.com/

![image-20231124151517696](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619160222309.png) 



#### 2.2.2 安装使用

下载Apifox的安装包，直接双击安装 。 

![image-20231124151642872](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619160222310.png) 



安装完成之后，登录Apifox，就可以使用啦。。。

<img src="https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619160222311.png" alt="image-20231124151736363" style="zoom:80%;" /> 

<img src="https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619160222312.png" alt="image-20231124151753562" style="zoom:80%;" /> 



### 2.2 工程搭建

1). 创建SpringBoot工程，并引入Web开发的起步依赖、lombok的依赖。

<img src="https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619160222313.png" alt="image-20231124151941102" style="zoom:80%;" /> 

<img src="https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619160222314.png" alt="image-20231124151959112" style="zoom:80%;" /> 



2). 准备基础的包结构

![image-20231124152115205](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619160222315.png) 





## 3. 查询部门

### 3.1 基本实现

#### 3.1.1 需求

查询所有的部门数据：将 `dept.txt` 文件中存储的部门数据，查询出来展示在部门管理的页面中。

<img src="https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619160222316.png" alt="image-20231124152404419" style="zoom: 50%;" /> 



#### 3.1.2 实现思路

1. 加载并读取dept.txt文本中的数据

2. 解析文本中的数据，并将其封装为集合

3. 响应数据(json格式)

​     <img src="https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619160222317.png" alt="image-20231124152719998" style="zoom:67%;" /> 



#### 3.1.3 代码实现

具体的代码实现如下：

```java
@RestController
public class DeptController {

    @RequestMapping("/depts")
    public List<Dept> list2(){
        //1. 加载文件 ,  获取原始数据
        InputStream in = this.getClass().getClassLoader().getResourceAsStream("dept.txt");
        List<String> lines = IOUtils.readLines(in, "UTF-8");

        //2. 对原始数据进行处理 , 组装部门数据
        List<Dept> deptList = lines.stream().map(line -> {
            String[] parts = line.split(",");
            Integer id = Integer.parseInt(parts[0]);
            String name = parts[1];
            LocalDateTime updateTime = LocalDateTime.parse(parts[2],
                    DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
            return new Dept(id, name, updateTime);
        }).toList();

        //2. 响应数据
        return deptList;
    }
}
```



打开Apifox，来测试当前接口：

![image-20231124153047358](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619160222318.png) 

新建请求，请求 `http://localhost:8080/depts`

![image-20231124155649710](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619160222319.png) 



#### 3.1.4 @ResponseBody

前面我们学习过HTTL协议的交互方式：请求响应模式（有请求就有响应）。那么Controller程序呢，除了接收请求外，还可以进行响应。

在我们前面所编写的controller方法中，都已经设置了响应数据。

controller方法中的return的结果，怎么就可以响应给浏览器呢？

答案：使用@ResponseBody注解



**@ResponseBody注解：**

- 类型：方法注解、类注解
- 位置：书写在Controller方法上或类上
- 作用：将方法返回值直接响应给浏览器，如果返回值类型是实体对象/集合，将会转换为JSON格式后在响应给浏览器

但是在我们所书写的Controller中，只在类上添加了@RestController注解、方法添加了@RequestMapping注解，并没有使用@ResponseBody注解，怎么给浏览器响应呢？

这是因为，我们在类上加了@RestController注解，而这个注解是由两个注解组合起来的，分别是：@Controller 、@ResponseBody。 那也就意味着，我们在类上已经添加了@ResponseBody注解了，而一旦在类上加了@ResponseBody注解，就相当于该类所有的方法中都已经添加了@ResponseBody注解。 



> 提示：前后端分离的项目中，一般直接在请求处理类上加@RestController注解，就无需在方法上加@ResponseBody注解了。





### 3.2 统一响应结果

#### 3.2.1 分析

1). 刚才我们执行查询部门操作，查询返回的结果是一个`List<Dept>` ，原始代码及响应给前端的结果如下：

<img src="https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619160222320.png" alt="image-20231124154223330" style="zoom:67%;" /> 



2). 如果我们还要实现一个需求，根据ID查询部门名称，原始代码及响应给前端的结果如下：

<img src="https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619160222321.png" alt="image-20231124154330119" style="zoom:67%;" /> 



3). 如果我们还要实现一个需求，根据ID查询部门数据，原始代码及响应给前端的结果如下：

<img src="https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619160222322.png" alt="image-20231124154444878" style="zoom:80%;" /> 



而大家会发现，上述的每一个需求，我们都实现了，但是呢，所有的Controller的方法的返回值是各式各样的，什么样的都有，响应的结果，也是各式各样。 如果做一个大型项目，要实现的需求、功能非常多，如果按照这种方案来，最终就会造成项目**不便管理、难以维护**。



而为了解决这个问题，我们就需要统一响应结果。 也就是说，无论什么实现什么功能，最终响应给前端的格式应该是统一的 。



#### 3.2.2 统一响应结果

<img src="https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619160222323.png" alt="image-20231124155025797" style="zoom:67%;" /> 



> 前端：只需要按照统一格式的返回结果进行解析(仅一种解析方案)，就可以拿到数据。

统一的返回结果使用类来描述，在这个结果中包含：

- 响应状态码：当前请求是成功，还是失败

- 状态码信息：给页面的提示信息

- 返回的数据：给前端响应的数据（字符串、对象、集合）

定义在一个实体类Result来包含以上信息。代码如下：

```java
import lombok.Data;
import java.io.Serializable;

/**
 * 后端统一返回结果
 */
@Data
public class Result {

    private Integer code; //编码：1成功，0和其它数字为失败
    private String msg; //错误信息
    private Object data; //数据

    public static Result success() {
        Result result = new Result();
        result.code = 1;
        return result;
    }

    public static Result success(Object object) {
        Result result = new Result();
        result.data = object;
        result.code = 1;
        return result;
    }

    public static Result error(String msg) {
        Result result = new Result();
        result.msg = msg;
        result.code = 0;
        return result;
    }

}
```





#### 3.2.3 功能优化

明确了为什么要统一响应结果，以及如何封装统一响应结果之后，接下来，我们就来将刚才完成的查询部门的功能完善一下。 分为如下两步操作：

1). 引入统一响应结果 Result (资料中提供)

2). 改造DeptController中的方法返回值

```java
@RestController
public class DeptController {
	
    @RequestMapping("/depts")
    public Result list2(){
        //1. 加载文件 ,  获取原始数据
        InputStream in = this.getClass().getClassLoader().getResourceAsStream("dept.txt");
        List<String> lines = IOUtils.readLines(in, "UTF-8");

        //2. 对原始数据进行处理 , 组装部门数据
        List<Dept> deptList = lines.stream().map(line -> {
            String[] parts = line.split(",");
            Integer id = Integer.parseInt(parts[0]);
            String name = parts[1];
            LocalDateTime updateTime = LocalDateTime.parse(parts[2],
                    DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
            return new Dept(id, name, updateTime);
        }).toList();

        //2. 响应数据
        return Result.success(deptList);
    }
    
}
```



打开Apifox进行测试：

![image-20231124153313075](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619160222324.png) 



而我们在测试时候发现，即使我们将请求方式设置为 `POST`  `PUT`  `DELETE`，也都是可以请求成功的。 如下所示：

![image-20231124160042355](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619160222325.png) 

这是因为，我们服务器端，也就是Controller程序中并没有限制该接口的请求方式，那么此时任何请求方式都是可以的。 如果要设置请求方式，可以通过如下两种方式来设置：

1. 在controller的方法上，声明 `@RequestMapping` 注解的method属性，通过method属性指定请求方式。 如下：

   ```
   @RequestMapping(value = "/depts", method = RequestMethod.GET)
   ```

2. 直接使用 `@GetMapping` 来替换 @RequestMapping 注解，@GetMapping其实就是对@RequestMapping的封装，并限定了请求方式为GET。

   ```
   @GetMapping("/depts")
   ```

   



### 3.3 前后端联调测试

#### 3.3.1 联调测试

完成了查询部门的功能，我们也通过 Apifox 工具测试通过了，下面我们再基于前后端分离的方式进行接口联调。具体操作如下：

1、将资料中提供的 "前端环境" 文件夹中的压缩包，拷贝到一个<font color='red'>没有中文不带空格</font>的目录下。

​       ![image-20231124162424878](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619160222326.png) 



2、拷贝到一个没有中文不带空格的目录后，进行解压 （解压到当前目录）

​		<img src="https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619160222327.png" alt="image-20231124163038191" style="zoom:80%;" /> 



 3、双击 `nginx.exe` 启动Nginx，一闪而过，就说明nginx以启动完成。

​		<img src="https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619160222328.png" alt="image-20231124163207404" style="zoom:80%;" /> 

​	 如果在任务管理器中，能看到上述两个进程，就说明nginx已经启动成功。



4、打开浏览器，访问：http://localhost:90

​     <img src="https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619160222329.png" alt="image-20231124163350170" style="zoom: 60%;" /> 

  

5、测试：系统信息管理 -> 查询部门列表

​	  <img src="https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619160222330.png" alt="image-20231124163448039" style="zoom:60%;" /> 



#### 3.3.2 请求访问流程

前端工程请求服务器的地址为 `http://localhost:90/api/depts`，是如何访问到后端的tomcat服务器的？

<img src="https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619160222331.png" alt="image-20231124163651893" style="zoom:80%;" /> 

其实这里，是通过前端服务Nginx中提供的反向代理功能实现的。

<img src="https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619160222332.png" alt="image-20231124163812855" style="zoom: 80%;" /> 

1). 浏览器发起请求，请求的是localhost:90 ，那其实请求的是nginx服务器。

2). 在nginx服务器中呢，并没有对请求直接进行处理，而是将请求转发给了后端的tomcat服务器，最终由tomcat服务器来处理该请求。



这个过程就是通过nginx的反向代理实现的。 那为什么浏览器不直接请求后端的tomcat服务器，而是直接请求nginx服务器呢，主要有以下几点原因：

1). 安全：由于后端的tomcat服务器一般都会搭建集群，会有很多的服务器，把所有的tomcat暴露给前端，让前端直接请求tomcat，对于后端服务器是比较危险的。

2). 灵活：基于nginx的反向代理实现，更加灵活，后端想增加、减少服务器，对于前端来说是无感知的，只需要在nginx中配置即可。

3). 负载均衡：基于nginx的反向代理，可以很方便的实现后端tomcat的负载均衡操作。



具体的请求访问流程如下：

<img src="https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619160222333.png" alt="image-20231124164358461" style="zoom: 67%;" /> 

> 1. location：用于定义匹配特定uri请求的规则。
>
> 2. ^~ /api/：表示精确匹配，即只匹配以/api/开头的路径。
>
> 3. rewrite：该指令用于重写匹配到的uri路径。
>
> 4. proxy_pass：该指令用于代理转发，它将匹配到的请求转发给位于后端的指令服务器。







## 4. 分层解耦

### 4.1 问题分析

上述案例的功能，我们虽然已经实现，但是呢，我们会发现案例中：解析文本文件中的数据，处理数据的逻辑代码，给页面响应的代码全部都堆积在一起了，全部都写在controller方法中了。

<img src="https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619160222334.png" alt="image-20231124164752386" style="zoom:67%;" /> 

当前程序的这个业务逻辑还是比较简单的，如果业务逻辑再稍微复杂一点，我们会看到Controller方法的代码量就很大了。

- 当我们要修改操作数据部分的代码，需要改动Controller

- 当我们要完善逻辑处理部分的代码，需要改动Controller

- 当我们需要修改数据响应的代码，还是需要改动Controller

这样呢，就会造成我们整个工程代码的复用性比较差，而且代码难以维护。 那如何解决这个问题呢？其实在现在的开发中，有非常成熟的解决思路，那就是分层开发。 



### 4.2 三层架构

#### 4.2.1 介绍

在我们进行程序设计以及程序开发时，尽可能让每一个接口、类、方法的职责更单一些（单一职责原则）。

> 单一职责原则：一个类或一个方法，就只做一件事情，只管一块功能。
>
> 这样就可以让类、接口、方法的复杂度更低，可读性更强，扩展性更好，也更利用后期的维护。



我们之前开发的程序呢，并不满足单一职责原则。下面我们来分析下之前的程序：

<img src="https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619160222335.png" alt="image-20231124164632382" style="zoom:67%;" /> 

那其实我们上述案例的处理逻辑呢，从组成上看可以分为三个部分：

- 数据访问：负责业务数据的维护操作，包括增、删、改、查等操作。
- 逻辑处理：负责业务逻辑处理的代码。
- 请求处理、响应数据：负责，接收页面的请求，给页面响应数据。

按照上述的三个组成部分，在我们项目开发中呢，可以将代码分为三层，如图所示：

 <img src="https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619160222336.png" alt="image-20231124165139850" style="zoom:50%;" /> 

- Controller：控制层。接收前端发送的请求，对请求进行处理，并响应数据。
- Service：业务逻辑层。处理具体的业务逻辑。
- Dao：数据访问层(Data Access Object)，也称为持久层。负责数据访问操作，包括数据的增、删、改、查。



基于三层架构的程序执行流程，如图所示：

<img src="https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619160222337.png" alt="image-20231124165103675" style="zoom: 50%;" /> 

- 前端发起的请求，由Controller层接收（Controller响应数据给前端）
- Controller层调用Service层来进行逻辑处理（Service层处理完后，把处理结果返回给Controller层）
- Serivce层调用Dao层（逻辑处理过程中需要用到的一些数据要从Dao层获取）
- Dao层操作文件中的数据（Dao拿到的数据会返回给Service层）

> 思考：按照三层架构的思想，如何要对业务逻辑(Service层)进行变更，会影响到Controller层和Dao层吗？ 
>
> 答案：不会影响。 （程序的扩展性、维护性变得更好了）





#### 4.2.2 代码拆分

我们使用三层架构思想，来改造下之前的程序：

- 控制层包名：com.itheima.controller
- 业务逻辑层包名：com.itheima.service.impl
- 数据访问层包名：com.itheima.dao.impl

<img src="https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619160222338.png" alt="image-20231124170711727" style="zoom:80%;" /> 



**1). 控制层：接收前端发送的请求，对请求进行处理，并响应数据**

```java
@RestController
public class DeptController {
    
    private DeptServiceImpl deptService = new DeptServiceImpl();
    
    @GetMapping("/depts")
    public Result list(){
        //1. 调用deptService
        List<Dept> deptList = deptService.queryDeptList();
        //2. 响应数据
        return Result.success(deptList);
    }
	
}
```



**2). 业务逻辑层：处理具体的业务逻辑**

```java
public class DeptServiceImpl  {
    
    private DeptDaoImpl deptDao= new DeptDaoImpl();

    @Override
    public List<Dept> queryDeptList() {
        //1. 调用deptDao
        List<String> lines = deptDao.queryDeptList();
        //2. 对原始数据进行处理 , 组装部门数据
        List<Dept> deptList = lines.stream().map(line -> {
            String[] parts = line.split(",");
            Integer id = Integer.parseInt(parts[0]);
            String name = parts[1];
            LocalDateTime updateTime = LocalDateTime.parse(parts[2],
                    DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
            return new Dept(id, name, updateTime);
        }).toList();
        //......
        return deptList;
    }
}
```



**3). 数据访问层：负责数据的访问操作，包含数据的增、删、改、查**

```java
public class DeptDaoImpl {
    @Override
    public List<String> queryDeptList(){
        //1. 加载文件 ,  获取原始数据
        InputStream in = this.getClass().getClassLoader().getResourceAsStream("dept.txt");
        return IOUtils.readLines(in, "UTF-8");
    }
}

```



具体的请求调用流程：

<img src="https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619160222339.png" alt="image-20231124171204191" style="zoom:67%;" /> 



三层架构的好处：

1. 复用性强
2. 便于维护
3. 利用扩展



#### 4.2.3 问题分析

Dao层在进行获取数据时，可能是从文件中获取 ，也可能有数据库中获取 ，那也就意味着Dao层的实现方式有多种 。

<img src="https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619160222340.png" alt="image-20231124171404356" style="zoom:80%;" /> 

如果Dao层的实现方式有多种，如何增强程序的扩展性呢 ？ 答案就是：接口、面相接口编程。

 

那么接下来，我们就需要为Dao层、Service层来设计对应的接口，并让实现类继承对应的接口 。



#### 4.2.4 程序优化

**1). Dao层**

接口：

```java
public interface DeptDao {
    //查询全部部门数据
    public List<String> queryDeptList();
}
```



实现：

```java
public class DeptDaoImpl implements DeptDao {
    @Override
    public List<String> queryDeptList(){
        //1. 加载文件 ,  获取原始数据
        InputStream in = this.getClass().getClassLoader().getResourceAsStream("dept.txt");
        return IOUtils.readLines(in, "UTF-8");
    }
}
```



**2). Service层**

接口：

```java
public interface DeptService {
    //查询所有的部门数据
    public List<Dept> queryDeptList();
}
```



实现：

```java
public class DeptServiceImpl implements DeptService {
    
    private DeptDao deptDao= new DeptDaoImpl();

    @Override
    public List<Dept> queryDeptList() {
        //1. 调用deptDao
        List<String> lines = deptDao.queryDeptList();
        //2. 对原始数据进行处理 , 组装部门数据
        List<Dept> deptList = lines.stream().map(line -> {
            String[] parts = line.split(",");
            Integer id = Integer.parseInt(parts[0]);
            String name = parts[1];
            LocalDateTime updateTime = LocalDateTime.parse(parts[2],
                    DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
            return new Dept(id, name, updateTime);
        }).toList();
        //......
        return deptList;
    }
}
```



**3). Controller层**

由于Controller层，就是接收请求，响应数据，不涉及到数据的访问、也不涉及逻辑处理，所以一般可以不要接口。

```java
@RestController
public class DeptController {
	
    private DeptService deptService = new DeptServiceImpl();
    
    @GetMapping("/depts")
    public Result list(){
        //1. 调用deptService
        List<Dept> deptList = deptService.queryDeptList();
        //2. 响应数据
        return Result.success(deptList);
    }

}

```





### 4.3 分层解耦

#### 4.3.1 问题分析

由于我们现在在程序中，需要什么对象，直接new一个对象 `new DeptServiceImpl()`  。

<img src="https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619160222341.png" alt="image-20231124172514798" style="zoom:67%;" /> 

 如果说我们需要更换实现类，比如由于业务的变更，DeptServiceImpl 不能满足现有的业务需求，我们需要切换为 DeptServiceImpl2 这套实现，就需要**修改**Contorller的代码，需要创建 DeptServiceImpl2 的实现`new DeptServiceImpl2()` 。

![image-20231124172952826](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619160222342.png) 



Service中调用Dao，也是类似的问题。这种呢，我们就称之为层与层之间 **耦合** 了。 那什么是耦合呢 ？



首先需要了解软件开发涉及到的两个概念：内聚和耦合。

- 内聚：软件中各个功能模块内部的功能联系。

- 耦合：衡量软件中各个层/模块之间的依赖、关联的程度。



**软件设计原则：高内聚低耦合。**

> 高内聚：指的是一个模块中各个元素之间的联系的紧密程度，如果各个元素(语句、程序段)之间的联系程度越高，则内聚性越高，即 "高内聚"。
>
> 低耦合：指的是软件中各个层、模块之间的依赖关联程序越低越好。



目前层与层之间是存在耦合的，Controller耦合了Service、Service耦合了Dao。而 高内聚、低耦合的目的是使程序模块的可重用性、移植性大大增强。

<img src="https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619160222343.png" alt="image-20231124173422622" style="zoom: 67%;" /> 



那最终我们的目标呢，就是做到层与层之间，尽可能的降低耦合，甚至解除耦合。

<img src="https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619160222344.png" alt="image-20231124173821481" style="zoom:50%;" /> 





#### 4.3.2 解耦思路

之前我们在编写代码时，需要什么对象，就直接new一个就可以了。 这种做法呢，层与层之间代码就耦合了，当service层的实现变了之后， 我们还需要修改controller层的代码。

那应该怎么解耦呢？

**1). 首先不能在EmpController中使用new对象。代码如下：**

<img src="https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619160222345.png" alt="image-20231124173929898" style="zoom:80%;" /> 

此时，就存在另一个问题了，不能new，就意味着没有业务层对象（程序运行就报错），怎么办呢? 

我们的解决思路是：

- 提供一个容器，容器中存储一些对象(例：DeptService对象)
- Controller程序从容器中获取DeptService类型的对象



**2). 将要用到的对象交给一个容器管理。**

<img src="https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619160222346.png" alt="image-20231124174106742" style="zoom: 67%;" /> 



**3). 应用程序中用到这个对象，就直接从容器中获取**

 <img src="https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619160222347.png" alt="image-20231124174825721" style="zoom: 60%;" />



那问题来了，我们如何将对象交给容器管理呢？ 程序运行时，容器如何为程序提供依赖的对象呢？ 



我们想要实现上述解耦操作，就涉及到Spring中的两个核心概念：

- **控制反转：** Inversion Of Control，简称**IOC**。对象的创建控制权由程序自身转移到外部（容器），这种思想称为控制反转。

  > 对象的创建权由程序员主动创建转移到容器(由容器创建、管理对象)。这个容器称为：IOC容器或Spring容器

- **依赖注入：** Dependency Injection，简称**DI**。容器为应用程序提供运行时，所依赖的资源，称之为依赖注入。

  > 程序运行时需要某个资源，此时容器就为其提供这个资源。
  >
  > 例：EmpController程序运行时需要EmpService对象，Spring容器就为其提供并注入EmpService对象

IOC容器中创建、管理的对象，称之为：bean对象。





#### 4.3.3 IOC&DI入门

**1). 将Service及Dao层的实现类，交给IOC容器管理**

在实现类加上 `@Component` 注解，就代表把当前类产生的对象交给IOC容器管理。

**A. DeptDaoImpl**

```java
@Component
public class DeptDaoImpl implements DeptDao {
    @Override
    public List<String> queryDeptList(){
        //1. 加载文件 ,  获取原始数据
        InputStream in = this.getClass().getClassLoader().getResourceAsStream("dept.txt");
        return IOUtils.readLines(in, "UTF-8");
    }
}
```



**B. DeptServiceImpl**

```java
@Component
public class DeptServiceImpl implements DeptService {
    private DeptDao deptDao;

    @Override
    public List<Dept> queryDeptList() {
        //1. 调用deptDao
        List<String> lines = deptDao.queryDeptList();
        //2. 对原始数据进行处理 , 组装部门数据
        List<Dept> deptList = lines.stream().map(line -> {
            String[] parts = line.split(",");
            Integer id = Integer.parseInt(parts[0]);
            String name = parts[1];
            LocalDateTime updateTime = LocalDateTime.parse(parts[2],
                    DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
            return new Dept(id, name, updateTime);
        }).toList();
        //......
        return deptList;
    }
}
```



**2). 为Controller 及 Service注入运行时所依赖的对象**

通过 `@Autowired` 注解为应用程序提供运行时依赖的对象。

**A. DeptServiceImpl**

```java
@Component
public class DeptServiceImpl implements DeptService {
    @Autowired
    private DeptDao deptDao;

    @Override
    public List<Dept> queryDeptList() {
        //1. 调用deptDao
        List<String> lines = deptDao.queryDeptList();
        //2. 对原始数据进行处理 , 组装部门数据
        List<Dept> deptList = lines.stream().map(line -> {
            String[] parts = line.split(",");
            Integer id = Integer.parseInt(parts[0]);
            String name = parts[1];
            LocalDateTime updateTime = LocalDateTime.parse(parts[2],
                    DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
            return new Dept(id, name, updateTime);
        }).toList();
        //......
        return deptList;
    }
}
```



**B. DeptController**

```java
@RestController
public class DeptController {
    @Autowired
    private DeptService deptService ;

    @GetMapping("/depts")
    public Result list(){
        //1. 调用deptService
        List<Dept> deptList = deptService.queryDeptList();
        //2. 响应数据
        return Result.success(deptList);
    }

}
```



启动服务，运行测试。 打开浏览器，地址栏直接访问：http://localhost:90

![image-20231124183456929](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619160222348.png) 





#### 4.3.4 IOC详解

通过IOC和DI的入门程序呢，我们已经基本了解了IOC和DI的基础操作。接下来呢，我们学习下IOC控制反转和DI依赖注入的细节。

##### 4.3.4.1 Bean的声明

前面我们提到IOC控制反转，就是将对象的控制权交给Spring的IOC容器，由IOC容器创建及管理对象。IOC容器创建的对象称为bean对象。

在之前的入门案例中，要把某个对象交给IOC容器管理，需要在类上添加一个注解：@Component 

而Spring框架为了更好的标识web应用程序开发当中，bean对象到底归属于哪一层，又提供了@Component的衍生注解：

| 注解        | 说明                 | 位置                                              |
| ----------- | -------------------- | ------------------------------------------------- |
| @Component  | 声明bean的基础注解   | 不属于以下三类时，用此注解                        |
| @Controller | @Component的衍生注解 | 标注在控制层类上                                  |
| @Service    | @Component的衍生注解 | 标注在业务层类上                                  |
| @Repository | @Component的衍生注解 | 标注在数据访问层类上（由于与mybatis整合，用的少） |



那么此时，我们就可以使用	`@Service` 注解声明Service层的bean。 使用 `@Repository` 注解声明Dao层的bean。 代码实现如下：



**Service层**

```java
@Service
public class DeptServiceImpl implements DeptService {
    @Autowired
    private DeptDao deptDao= new DeptDaoImpl();

    @Override
    public List<Dept> queryDeptList() {
        //1. 调用deptDao
        List<String> lines = deptDao.queryDeptList();
        //2. 对原始数据进行处理 , 组装部门数据
        List<Dept> deptList = lines.stream().map(line -> {
            String[] parts = line.split(",");
            Integer id = Integer.parseInt(parts[0]);
            String name = parts[1];
            LocalDateTime updateTime = LocalDateTime.parse(parts[2],
                    DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
            return new Dept(id, name, updateTime);
        }).toList();
        //......
        return deptList;
    }
}
```



**Dao层**

```java
@Repository
public class DeptDaoImpl implements DeptDao {
    @Override
    public List<String> queryDeptList(){
        //1. 加载文件 ,  获取原始数据
        InputStream in = this.getClass().getClassLoader().getResourceAsStream("dept.txt");
        return IOUtils.readLines(in, "UTF-8");
    }
}
```





<font color='red'>注意1：声明bean的时候，可以通过注解的value属性指定bean的名字，如果没有指定，默认为类名首字母小写。</font>

<font color='red'>注意2：使用以上四个注解都可以声明bean，但是在springboot集成web开发中，声明控制器bean只能用@Controller。</font>





##### 4.3.4.2 组件扫描

问题：使用前面学习的四个注解声明的bean，一定会生效吗？

答案：不一定。（原因：bean想要生效，还需要被组件扫描）



- 前面声明bean的四大注解，要想生效，还需要被组件扫描注解 `@ComponentScan` 扫描。

- 该注解虽然没有显式配置，但是实际上已经包含在了启动类声明注解 `@SpringBootApplication` 中，默认扫描的范围是启动类所在包及其子包。

<img src="https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619160222349.png" alt="image-20231124184354310" style="zoom: 50%;" /> 









#### 4.3.5 DI详解

上一小节我们讲解了控制反转IOC的细节，接下来呢，我们学习依赖注解DI的细节。

依赖注入，是指IOC容器要为应用程序去提供运行时所依赖的资源，而资源指的就是对象。

在入门程序案例中，我们使用了@Autowired这个注解，完成了依赖注入的操作，而这个Autowired翻译过来叫：自动装配。

@Autowired注解，默认是按照**类型**进行自动装配的（去IOC容器中找某个类型的对象，然后完成注入操作）

> 入门程序举例：在EmpController运行的时候，就要到IOC容器当中去查找EmpService这个类型的对象，而我们的IOC容器中刚好有一个EmpService这个类型的对象，所以就找到了这个类型的对象完成注入操作。



那如果在IOC容器中，存在多个相同类型的bean对象，会出现什么情况呢？

<img src="https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619160222350.png" alt="image-20231124184659272" style="zoom:80%;" /> 



此时，我们运行程序，看到控制台已经报错了。

![image-20231124184734329](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250619160222351.png) 



如何解决上述问题呢？Spring提供了以下几种解决方案：

- @Primary

- @Qualifier

- @Resource



**方案一：使用@Primary注解**

当存在多个相同类型的Bean注入时，加上@Primary注解，来确定默认的实现。

```java
@Primary
@Service
public class DeptServiceImpl implements DeptService {
}
```





**方案二：使用@Qualifier注解**

指定当前要注入的bean对象。 在@Qualifier的value属性中，指定注入的bean的名称。 @Qualifier注解不能单独使用，必须配合@Autowired使用

```java
@RestController
public class DeptController {

    @Qualifier("deptServiceImpl")
    @Autowired
    private DeptService deptService;
```





**方案三：使用@Resource注解**

是按照bean的名称进行注入。通过name属性指定要注入的bean的名称。

```java
@RestController
public class DeptController {
	
    @Resource(name = "deptServiceImpl")
    private DeptService deptService;
```





> 面试题 ： @Autowird 与 @Resource的区别
>
> - @Autowired 是spring框架提供的注解，而@Resource是JDK提供的注解
> - @Autowired 默认是按照类型注入，而@Resource是按照名称注入

