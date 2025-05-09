---
tags:
  - SpringBoot
  - 编程喵
readingTime: true
comment: true
date: 2025-05-09 12:35:48
recommend: ['SpringBoot','编程喵',4]
---

# Spring Boot整合Knife4j

## 参考教程

>[Spring Boot整合Knife4j，美化强化丑陋的Swagger](https://www.yuque.com/itwanger/vn4p17/sbgwr2)

## 官方文档

>[https://doc.xiaominfo.com/knife4j/documentation/](https://doc.xiaominfo.com/knife4j/documentation/)

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250509123421158.png)
## 整合 Knife4j

### 第一步，在 pom.xml 文件中添加 Knife4j 的依赖（**不需要再引入 springfox-boot-starter**了，因为 Knife4j 的 starter 里面已经加入过了）。

```Java
<dependency>
    <groupId>com.github.xiaoymin</groupId>
    <artifactId>knife4j-spring-boot-starter</artifactId>
    <!--在引用时请在maven中央仓库搜索3.X最新版本号-->
    <version>3.0.2</version>
</dependency>
```

### 第二步，配置类 SwaggerConfig 还是 Swagger 时期原来的配方。

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

### 第三步，新建测试控制器类 Knife4jController.java

```Java
@Api(tags = "测试 Knife4j")
@RestController
@RequestMapping("/knife4j")
public class Knife4jController {

    @ApiOperation("测试")
    @RequestMapping(value ="/test", method = RequestMethod.POST)
    public String test() {
        return "沉默王二又帅又丑";
    }
}
```

### 第四步，由于 springfox 3.0.x 版本 和 Spring Boot 2.6.x 版本有冲突，所以还需要先解决这个 bug，一共分两步（在[Swagger](https://tobebetterjavaer.com/springboot/swagger.html) 那篇已经解释过了，这里不再赘述，但防止有小伙伴在学习的时候再次跳坑，这里就重复一下步骤）。

>先在 application.yml 文件中加入：

```yml
spring:
  mvc:
    path match:
      matching-strategy: ANT_PATH_MATCHER
```

  
再在 SwaggerConfig.java 中添加：

```Java
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

>以上步骤均完成后，开始下一步，否则要么项目启动的时候报错，要么在文档中看不到测试的文档接口。

### 第五步，运行 Spring Boot 项目，浏览器地址栏输入以下地址访问 API 文档，查看效果。

>访问地址（和 Swagger 不同）：[http://localhost:8080/doc.html](http://localhost:8080/doc.html)

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250509123523484.png)
