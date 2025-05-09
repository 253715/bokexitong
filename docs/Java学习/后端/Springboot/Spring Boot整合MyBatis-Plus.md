---
tags:
  - SpringBoot
  - 编程喵
readingTime: true
comment: true
date: 2025-05-09 12:30:21
recommend: ['SpringBoot','编程喵',3]
---

# Spring Boot整合MyBatis-Plus

## 参考教程

>[Spring Boot整合MyBatis-Plus，并通过AutoGenerator生成编程喵项目骨架代码](https://www.yuque.com/itwanger/vn4p17/pfps5b#f1bda19a)

## AutoGenerator

::: tip
**MyBatis-Plus 官方提供 AutoGenerator 代码生成器·，发现配置更简单，开发效率更高**

**AutoGenerator 是 MyBatis-Plus 推出的代码生成器，可以快速生成 Entity、Mapper、Mapper XML、Service、Controller 等各个模块的代码，比 Mybatis Generator 更强大，开发效率更高。**
:::
### 1. 导入依赖

```Java
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-generator</artifactId>
    <version>3.4.1</version>
</dependency>
```

### 2. 第二步，添加模板引擎依赖，MyBatis-Plus 支持 Velocity（默认）、Freemarker、Beetl，这里使用 Velocity 引擎。

```Java
<dependency>
    <groupId>org.apache.velocity</groupId>
    <artifactId>velocity-engine-core</artifactId>
    <version>2.3</version>
</dependency>
```

### 3. 第三步，新建 CodeGenerator.java 文件，在 main 方法中添加 MyBatis-Plus 的 AutoGenerator 对象。

```Java
package top.codingmore.generator;

import com.baomidou.mybatisplus.generator.AutoGenerator;

/**
 * 微信搜索「沉默王二」，回复 Java
 *
 * @author 沉默王二
 * @date 5/17/22
 */
public class CodeGenerator {
    public static void main(String[] args) {
        // 代码生成器
        AutoGenerator mpg = new AutoGenerator();
    }
}
```

>在 main 方法中添加全局配置。

```JAVA
// 全局配置
GlobalConfig gc = new GlobalConfig();
String projectPath = System.getProperty("user.dir");
gc.setOutputDir(projectPath + "/src/main/java");
gc.setAuthor("沉默王二");
gc.setOpen(false);
gc.setDateType(DateType.ONLY_DATE);
gc.setSwagger2(true);
gc.setIdType(IdType.AUTO);
gc.setBaseColumnList(true);
gc.setBaseResultMap(true);
gc.setFileOverride(true);

mpg.setGlobalConfig(gc);
```

### 4. 配置数据源。

```JAVA
// 数据源配置
DataSourceConfig dsc = new DataSourceConfig();
dsc.setUrl("jdbc:mysql://localhost:3306/codingmore?useUnicode=true&characterEncoding=utf-8&serverTimezone=Asia/Shanghai");
dsc.setDriverName("com.mysql.cj.jdbc.Driver");
dsc.setUsername("root");
dsc.setPassword("123456");

mpg.setDataSource(dsc);
```

### 5. 配置包

```JAVA
// 包配置
PackageConfig pc = new PackageConfig();
pc.setParent("top.codingmore.mpg");
```

### 6. 更多配置项可以查看官方

>[https://baomidou.com/pages/061573/](https://baomidou.com/pages/061573/)

### 7. 完整代码

```JAVA
package top.codingmore.generator;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.generator.AutoGenerator;
import com.baomidou.mybatisplus.generator.config.DataSourceConfig;
import com.baomidou.mybatisplus.generator.config.GlobalConfig;
import com.baomidou.mybatisplus.generator.config.PackageConfig;
import com.baomidou.mybatisplus.generator.config.rules.DateType;

/**
 * 微信搜索「沉默王二」，回复 Java
 *
 * @author 沉默王二
 * @date 5/17/22
 */
public class CodeGenerator {
    public static void main(String[] args) {
        // 代码生成器
        AutoGenerator mpg = new AutoGenerator();

        // 全局配置
        GlobalConfig gc = new GlobalConfig();
        String projectPath = System.getProperty("user.dir");
        gc.setOutputDir(projectPath + "/src/main/java");
        gc.setAuthor("沉默王二");
        gc.setOpen(false);
        gc.setDateType(DateType.ONLY_DATE);
        gc.setSwagger2(true);
        gc.setIdType(IdType.AUTO);
        gc.setBaseColumnList(true);
        gc.setBaseResultMap(true);
        gc.setFileOverride(true);

        mpg.setGlobalConfig(gc);

        // 数据源配置
        DataSourceConfig dsc = new DataSourceConfig();
        dsc.setUrl("jdbc:mysql://localhost:3306/codingmore?useUnicode=true&characterEncoding=utf-8&serverTimezone=Asia/Shanghai");
        dsc.setDriverName("com.mysql.cj.jdbc.Driver");
        dsc.setUsername("root");
        dsc.setPassword("Huicheng123");

        mpg.setDataSource(dsc);

        // 包配置
        PackageConfig pc = new PackageConfig();
        pc.setParent("top.codingmore.mpg");
        mpg.setPackageInfo(pc);

        mpg.execute();
    }
}
```

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250509123000986.png)

