---
tags:
  - SpringBoot
  - 编程喵
readingTime: true
comment: false
date: 2025-05-09 12:40:48
recommend: ['SpringBoot','编程喵',6]
---

# SpringBoot整合Lombok

## 参考教程

[lombok 使用教程](https://www.yuque.com/itwanger/vn4p17/vtg17d)

::: info
大致的意思就是：Lombok 是个好类库，可以为 Java 代码添加一些“处理程序”，让其变得更简洁、更优雅。在我看来，Lombok 最大的好处就在于通过注解的形式来简化 Java 代码，简化到什么程度呢？  
作为一名 Java 程序员，我相信你一定写过不少的 getter / setter，尽管可以借助 IDE 来自动生成，可一旦 Javabean 的属性很多，就免不了要产生大量的 getter / setter，这会让代码看起来不够简练，就像老太婆的裹脚布一样，又臭又长。
:::
>没使用之前

```Java
class Cmower {
	private int age;
	private String name;
	private BigDecimal money;

	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public BigDecimal getMoney() {
		return money;
	}
	public void setMoney(BigDecimal money) {
		this.money = money;
	}
}
```

>使用了之后

```Java
@Getter
@Setter
class CmowerLombok {
	private int age;
	private String name;
	private BigDecimal money;
}
```

:::danger
通过对比我们发现简化了很多
:::
## 集成 Lombok

### 1. 添加依赖

```XML
<dependency>
	<groupId>org.projectlombok</groupId>
	<artifactId>lombok</artifactId>
	<version>1.18.6</version>
	<scope>provided</scope>
</dependency>
```

:::danger注意
其中 scope=provided，就说明 Lombok 只在**编译阶段生效**。也就是说，Lombok 会在编译期静悄悄地将带 Lombok 注解的源码文件正确编译为完整的 class 文件。  
  
**SpringBoot 2.1.x 版本后不需要再显式地添加 Lombok 依赖了**。之后，还需要为 Intellij IDEA **安装 Lombok 插件**，否则 Javabean 的 getter / setter 就无法自动编译，也就不能被调用。**不过，新版的 Intellij IDEA 也已经内置好了，不需要再安装。**
:::
## 常用注解

### @Data

>这个注解可以生成 getter / setter、equals、hashCode，以及 toString，是个总和的选项。
   实际上常用的注解只有这一个

```JAVA
@Data
class CmowerLombok {
	private int age;
	private String name;
	private BigDecimal money;
}
```

### @Slf4j

>可以用来生成注解对象，你可以根据自己的日志实现方式来选用不同的注解，比如说：@Log、@Log4j、@Log4j2、@Slf4j等。

**Logback 日志使用这个注解**

```Java
@Slf4j
public class Log4jDemo {
    public static void main(String[] args) {
        log.info("level:{}","info");
        log.warn("level:{}","warn");
        log.error("level:{}", "error");
    }
}
```

### @Builder

>注解可以用来通过建造者模式来创建对象，这样就可以通过链式调用的方式进行对象赋值，非常的方便。

```
@Builder
@ToString
public class BuilderDemo {
    private Long id;
    private String name;
    private Integer age;

    public static void main(String[] args) {
        BuilderDemo demo = BuilderDemo.builder().age(18).name("沉默王二").build();
        System.out.println(demo);
    }
}
```

