---
tags:
  - SpringBoot
  - 编程喵
readingTime: true
comment: false
date: 2025-05-09 12:55:07
recommend: ['SpringBoot','编程喵',5]
---

# Spring Boot整合Swagger-UI实现在线API文档

## 参考教程
>https://www.yuque.com/itwanger/vn4p17/trto1v

## 关于 Swagger


Swagger 是一个用于生成、描述和调用 RESTful 接口的 Web 服务。

  

![](https://files.mdnice.com/user/3903/22557bb4-e4c5-45cb-8915-d9752970ceb9.png)

  

想要理解RESTful架构的话，可以戳链接查看阮一峰老师的博客：。
>[https://www.ruanyifeng.com/blog/2011/09/restful.html](https://www.ruanyifeng.com/blog/2011/09/restful.html)

换句话说，Swagger 就是将项目中想要暴露的接口展示在页面上，开发者可以直接进行接口调用和测试，能在很大程度上提升开发的效率。

比如说，一个后端程序员写了一个登录接口，想要测试自己写的接口是否符合预期的话，就得先模拟用户登录的行为，包括正常的行为（输入正确的用户名和密码）和异常的行为（输入错误的用户名和密码），这就要命了。

但有了 Swagger 后，可以通过简单的配置生成接口的展示页面，把接口的请求参数、返回结果通过可视化的形式展示出来，并且提供了便捷的测试服务。

- 前端程序员可以通过接口展示页面查看需要传递的请求参数和返回的数据格式，不需要后端程序员再编写接口文档了；
- 后端程序员可以通过接口展示页面测试验证自己的接口是否符合预期，降低了开发阶段的调试成本。

前后端分离就可以很完美的落地了，有没有？

Swagger 官网地址：[https://swagger.io/](https://swagger.io/)


那在 Swagger 出现之前，局面就比较糟糕。前端经常抱怨后端给的接口文档与实际情况不一致。后端又觉得编写及维护接口文档会耗费不少精力，经常来不及更新。

大家都被无情地折磨，痛不堪言。。。

Swagger 定义了一套规范，你只需要按照它的规范去定义接口及接口相关的信息，然后通过 Swagger 衍生出来的一系列工具，就可以生成各种格式的接口文档，甚至还可以生成多种语言的客户端和服务端代码，以及在线接口调试页面等等。

那只要及时更新 Swagger 的描述文件，就可以自动生成接口文档了，做到调用端代码、服务端代码以及接口文档的一致性。

## 整合 Swagger-UI

Swagger-UI 是一套 HTML/CSS/JS 框架，用于渲染 Swagger 文档，以便提供美观的 API 文档界面。

也就是说，Swagger-UI 是 Swagger 提供的一套可视化渲染组件，支持在线导入描述文件和本地部署UI项目。

![](https://files.mdnice.com/user/3903/960175c0-9782-489b-a3e6-a627e06b35a5.png)


### 第一步，在 pom.xml 文件中添加 Swagger 的 starter。

```Java
<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-boot-starter</artifactId>
    <version>3.0.0</version>
</dependency>
```


咦，不是说添加 Swagger 的依赖吗？怎么添加的是 springfox-boot-starter 呢？


这是因为：

- Swagger 是一种规范。
- springfox-swagger 是一个基于 Spring 生态系统的，Swagger 规范的实现。
- springfox-boot-starter 是 springfox 针对 Spring Boot 项目提供的一个 starter，简化 Swagger 依赖的导入，否则我们就需要在 pom.xml 文件中添加 springfox-swagger、springfox-swagger-ui 等多个依赖。

### 第二步，添加 Swagger 的 Java 配置。

```Java
@Configuration
@EnableOpenApi
public class SwaggerConfig {
    @Bean
    public Docket docket() {
        Docket docket = new Docket(DocumentationType.OAS_30)
                .apiInfo(apiInfo()).enable(true)
                .select()
                //apis： 添加swagger接口提取范围
                .apis(RequestHandlerSelectors.basePackage("top.codingmore.controller"))
                .paths(PathSelectors.any())
                .build();

        return docket;
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("编程猫实战项目笔记")
                .description("编程喵是一个 Spring Boot+Vue 的前后端分离项目")
                .contact(new Contact("沉默王二", "https://codingmore.top","www.qing_gee@163.com"))
                .version("v1.0")
                .build();
    }
}
```


1）[@Configuration](/Configuration) 注解通常用来声明一个 Java 配置类，取代了以往的 xml 配置文件，让配置变得更加的简单和直接。


2）[@EnableOpenApi](/EnableOpenApi) 注解表明开启 Swagger。


3）SwaggerConfig 类中包含了一个 [@Bean](/Bean) 注解声明的方法 `docket()`，该方法会被 Spring 的 AnnotationConfigApplicationContext 或 AnnotationConfigWebApplicationContext 类进行扫描，然后添加到 Spring 容器当中。


```Java
AnnotationConfigApplicationContext ctx = new AnnotationConfigApplicationContext();
  ctx.register(AppConfig.class);
  ctx.refresh();
  MyBean myBean = ctx.getBean(MyBean.class);
```

简单描述一下 Swagger 的配置内容：

- `new Docket(DocumentationType.OAS_30)`，使用 3.0 版本的 Swagger API。OAS 是 OpenAPI Specification 的简称，翻译成中文就是 OpenAPI 说明书，Swagger 遵循的就是这套规范。
- `apiInfo(apiInfo())`，配置 API 文档基本信息，标题、描述、作者、版本等。
- `apis(RequestHandlerSelectors.basePackage("top.codingmore.controller"))` 指定 API 的接口范围为 controller 控制器。
- `paths(PathSelectors.any())` 指定匹配所有的 URL。


### 第三步，添加控制器类。


```
@Api(tags = "测试 Swagger")
@RestController
@RequestMapping("/swagger")
public class SwaggerController {

    @ApiOperation("测试")
    @RequestMapping("/test")
    public String test() {
        return "沉默王二又帅又丑";
    }
}
```


1）@Api注解，用在类上，该注解将控制器标注为一个 Swagger 资源。该注解有 3 个属性：

- tags，具有相同标签的 API 会被归在一组内展示
- value，如果 tags 没有定义，value 将作为 API 的 tags 使用。
- description，已废弃

2）[@ApiOperation](/ApiOperation) 注解，用在方法上，描述这个方法是做什么用的。该注解有 4 个属性：

- value 操作的简单说明，长度为120个字母，60个汉字。
- notes 对操作的详细说明。
- httpMethod HTTP请求的动作名，可选值有："GET", "HEAD", "POST", "PUT", "DELETE", "OPTIONS" and "PATCH"。
- code 默认为200，有效值必须符合标准的HTTP Status Code Definitions。
  
3）[@RestController](/RestController) 注解，用在类上，是@ResponseBody和@Controller的组合注解，如果方法要返回 JSON 的话，可省去 [@ResponseBody](/ResponseBody) 注解。

4）[@RequestMapping](/RequestMapping) 注解，可用在类（父路径）和方法（子路径）上，主要用来定义 API 的请求路径和请求类型。该注解有 6 个属性：

- value，指定请求的实际地址
- method，指定请求的method类型， GET、POST、PUT、DELETE等
- consumes，指定处理请求的提交内容类型（Content-Type），例如 application/json, text/html
- produces，指定返回的内容类型，仅当request请求头中的(Accept)类型中包含该指定类型才返回
- params，指定request中必须包含某些参数值
- headers，指定request中必须包含某些指定的header值
### 第四步，启动服务，在浏览器中输入 `http://localhost:8080/swagger-ui/index.html` 就可以访问 Swagger 生成的 API 文档了。

:::info 科普
PS:之所谓访问地址是/swagger-ui/index.html，是因为Swagger3.0.0版本把默认页面的位置改了，源码中有这样一段提示：
:::
```Java
/**
* Base url for swagger-ui. For e.g. setting it to /documentation will put swagger-ui
* at /documentation/swagger-ui/index.html
*/
private String baseUrl = "";
```

![](https://files.mdnice.com/user/3903/29b0471b-9047-4651-bca2-43bfc3e9e1a5.png)

点开 get 请求的面板，点击「try it out」再点击「excute」可以查看接口返回的数据。

![](https://files.mdnice.com/user/3903/f9871fb9-6ac7-4239-94a0-416d3b4543dc.png)


### 版本不兼容


在 Spring Boot 整合 Swagger 的过程中，我发现一个大 bug，Spring Boot 2.6.7 版本和 springfox 3.0.0 版本不兼容，启动的时候直接就报错了。


![](https://files.mdnice.com/user/3903/0016854d-2053-4197-b35e-7b4c4af68c76.png)


Caused by: java.lang.NullPointerException: Cannot invoke "org.springframework.web.servlet.mvc.condition.PatternsRequestCondition.getPatterns()" because "this.condition" is null

一路跟踪下来，发现 GitHub 上确认有人在 Spring Boot 仓库下提到了这个 bug。

[https://github.com/spring-projects/spring-boot/issues/28794](https://github.com/spring-projects/spring-boot/issues/28794)

Spring Boot 说这是 springfox 的 bug。


![](https://files.mdnice.com/user/3903/ec8829a3-63e4-4a35-aa7a-88c10d73d399.png)


追踪过来一看，确实。


![](https://files.mdnice.com/user/3903/8c127aa7-646c-46ae-938b-bb3ef0325c69.png)


有人提到的解决方案是切换到 SpringDoc。

![](https://files.mdnice.com/user/3903/b3470afa-45b8-4849-979a-23e7e693de74.png)

  

这样就需要切换注解 `@Api → @Tag`，`@ApiOperation(value = "foo", notes = "bar") → @Operation(summary = "foo", description = "bar")`，对旧项目不是很友好，如果是新项目的话，倒是可以直接尝试 SpringDoc。

还有人提出的解决方案是：

- 先将匹配策略调整为 ant-path-matcher（application.yml）。

```
spring:
  mvc:
    path match:
      matching-strategy: ANT_PATH_MATCHER
```

- 然后在 Spring 容器中注入下面这个 bean，可以放在 SwaggerConfig 类中。

```
@Bean
public static BeanPostProcessor springfoxHandlerProviderBeanPostProcessor() {
    return new BeanPostProcessor() {

        @Override
        public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
            if (bean instanceof WebMvcRequestHandlerProvider || bean instanceof WebFluxRequestHandlerProvider) {
                customizeSpringfoxHandlerMappings(getHandlerMappings(bean));
            }
            return bean;
        }

        private <T extends RequestMappingInfoHandlerMapping> void customizeSpringfoxHandlerMappings(List<T> mappings) {
            List<T> copy = mappings.stream()
                    .filter(mapping -> mapping.getPatternParser() == null)
                    .collect(Collectors.toList());
            mappings.clear();
            mappings.addAll(copy);
        }

        @SuppressWarnings("unchecked")
        private List<RequestMappingInfoHandlerMapping> getHandlerMappings(Object bean) {
            try {
                Field field = ReflectionUtils.findField(bean.getClass(), "handlerMappings");
                field.setAccessible(true);
                return (List<RequestMappingInfoHandlerMapping>) field.get(bean);
            } catch (IllegalArgumentException | IllegalAccessException e) {
                throw new IllegalStateException(e);
            }
        }
    };
}
```

解决方案地址：[https://github.com/springfox/springfox/issues/3462](https://github.com/springfox/springfox/issues/3462)

重新编译项目，就会发现错误消失了，我只能说GitHub 仓库的 issue 区都是大神！

查看 Swagger 接口文档，发现一切正常。

![](https://files.mdnice.com/user/3903/f7592104-8ce4-46f2-ade0-bf930968c334.png)

  

我只能再强调一次，GitHub 仓库的 issue 区都是大神！大家遇到问题的时候，一定要多到 issue 区看看。

至于为什么要这样做，问题的解决者给出了自己的答案。

![](https://files.mdnice.com/user/3903/45ff23be-9e43-4887-a40e-cba0c9f45bde.png)

大致的意思就是 springfox 和 Spring 在 pathPatternsCondition 上产生了分歧，这两个步骤就是用来消除这个分歧的。

除此之外，还有另外一种保守的做法，直接将 Spring Boot 的版本回退到更低的版本，比如说 2.4.5。

![](https://files.mdnice.com/user/3903/94c6dbe6-db98-4245-b1d9-f26430f14d8f.png)

### 小结

Swagger 虽然解决了调用端代码、服务端代码以及接口文档的不一致的问题，但有一说一，Swagger-UI 实在是太丑了。

不仅查看不方便，操作起来不方便。

你比如说，我压根就不需要 OPTIONS、HEAD、PATCH、TRACE 这些 HTTP 请求，它也全部列了出来。

![](https://files.mdnice.com/user/3903/b44f34ee-e11c-4008-9b85-c6377922c102.png)


你比如说测试接口的时候要先点「try it out」

![](https://files.mdnice.com/user/3903/55288a87-fffc-4b29-9f39-2747a8366ae4.png)


再点「execute」才能发送请求和查看响应结果。

![](https://files.mdnice.com/user/3903/200e9f24-f022-4cbb-a4e5-5a8fb25dd2c5.png)

>所以下一节，我们要在 Swagger 的基础上进行美化，增强接口文档，以便提升我们的工作效率。
