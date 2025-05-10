---
tags:
  - SpringBoot
  - 编程喵
readingTime: true
comment: true
date: 2025-05-10 13:26:40
recommend: ['SpringBoot','编程喵',11]
---

# Spring Boot 整合 OSS 实现文件上传

## 参考教程

>[Spring Boot 整合 OSS 实现文件上传](https://www.yuque.com/itwanger/vn4p17/tm02tw)

>小二是新来的实习生，作为技术 leader，我给他安排了一个非常简单的练手任务，把前端 markdown 编辑器里上传的图片保存到服务器端，**结果他真的就把图片直接保存到了服务器上，这下可把我气坏了，就不能搞个对象存储服务，比如说 OSS、MinIO？**  
他理直气壮地反驳道：“谁让你不讲清楚，我去找老板把你开掉！”我瞬间就怂了，说，“来来来，我手把手教你怎么把图片保存到 OSS 上，好不好？”  
“不用了，还是我来教你吧。”小二非常自信，下面是他在 Spring Boot 应用中整合 OSS 做的记录。

## 开通 OSS

![](https://cdn.nlark.com/yuque/0/2025/png/26027752/1743856381444-1fd82d87-8168-49a5-bcd8-62398e89c07a.png)

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250510132439145.png)


>Bucket 的词面意思是桶，这里指**存储空间**，就是用于存储对象的容器。**注意读写权限为“公共读”**，也就是允**许互联网用户访问云空间上的图片。**  
第四步，点击「确定」就算是开通成功了。

## 整合 OSS

### 1. 引入依赖

```xml
<!-- 阿里云 OSS -->
<dependency>
    <groupId>com.aliyun.oss</groupId>
    <artifactId>aliyun-sdk-oss</artifactId>
    <version>3.10.2</version>
</dependency>
```

### 2. 配置信息

```yml
aliyun:
  oss:
      # oss对外服务的访问域名
    endpoint: oss-cn-beijing.aliyuncs.com
      # 访问身份验证中用到用户标识
    accessKeyId: LTAI5
      # 用户用于加密签名字符串和oss用来验证签名字符串的密钥
    accessKeySecret: RYN
      # oss的存储空间
    bucketName: itwanger-oss1
      # 上传文件大小(M)
    maxSize: 3
      # 上传文件夹路径前缀
    dir:
      prefix: codingmore/images/
```

### 3. 新增配置类

```Java
@Configuration
public class OssClientConfig {
    @Value("${aliyun.oss.endpoint}")
    String endpoint ;
    @Value("${aliyun.oss.accessKeyId}")
    String accessKeyId ;
    @Value("${aliyun.oss.accessKeySecret}")
    String accessKeySecret;

    @Bean
    public OSSClient createOssClient() {
        return (OSSClient)new OSSClientBuilder().build(endpoint, accessKeyId, accessKeySecret);
    }
}
```

>新增 OssClientConfig.java 配置类，主要就是通过 **@Value 注解**从**配置文件**中获取配置项，然后创建 OSSClient。

### 4. 新增文件上传接口

```Java
@Controller
@Api(tags = "上传")
@RequestMapping("/ossController")
public class OssController {
    @Autowired
    private IOssService ossService;

    @RequestMapping(value = "/upload",method=RequestMethod.POST)
    @ResponseBody
    @ApiOperation("上传")
    public ResultObject<String> upload(@RequestParam("file") MultipartFile file, HttpServletRequest req)  {
        return ResultObject.success(ossService.upload(file));
    }
}
```

新增文件上传接口 OssController.java，参数为 MultipartFile。

### 5. 新增 service

```Java
@Service
public class OssServiceImpl implements IOssService{

    @Value("${aliyun.oss.maxSize}")
    private int maxSize;
   
    @Value("${aliyun.oss.bucketName}")
    private String bucketName;
  
    @Value("${aliyun.oss.dir.prefix}")
    private String dirPrefix;
    
    @Autowired
    private OSSClient ossClient;   
    @Override
    public String upload(MultipartFile file) {
        try {
            return upload(file.getInputStream(), file.getOriginalFilename());
        } catch (IOException e) {
            LOGGER.error(e.getMessage());
        }
        return null;
    }

    @Override
    public String upload(InputStream inputStream,String name) {
        String objectName = getBucketName(name);
        // 创建PutObject请求。
        ossClient.putObject(bucketName, objectName, inputStream);
        return formatPath(objectName);
    }
    private String getBucketName(String url){
        String ext = "";
        for(String extItem:imageExtension){
            if(url.indexOf(extItem) != -1){
                ext = extItem;
                break;
            }
        }
        return dirPrefix+ DateUtil.today()+"/"+ IdUtil.randomUUID()+ext;
    }

    private String formatPath(String objectName){
        return "https://"  +bucketName+"."+ ossClient.getEndpoint().getHost() + "/" + objectName;
    }
}
```

新增 Service，**将文件上传到 OSS，并返回文件保存路径。**

### 6. 测试

第六步，打开 Apipost，测试 OSS 上传接口，**注意参数选择文件**，点击发送后可以看到**服务器端返回的图片链接。**


![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250510132533295.png)


### 7. 验证

进入阿里云 OSS 后台管理，可以确认图片确实已经上传成功。


![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250510132540633.png)


## 利用OSS 进行自动转链

### 1. 添加图片转链的方法

第一步，在 PostsServiceImpl.java 中添加图片转链的方法，主要利用正则表达式找出文章内容中的外链，然后将外链的图片上传到 OSS，然后再替换掉原来的外链图片。

```Java
// 匹配图片的 markdown 语法
// ![](hhhx.png)
// ![xx](hhhx.png?ax)
public static final String IMG_PATTERN = "\\!\\[.*\\]\\((.*)\\)";

private void handleContentImg(Posts posts) {
    String content = posts.getPostContent();

    Pattern p = Pattern.compile(IMG_PATTERN, Pattern.CASE_INSENSITIVE);
    Matcher m = p.matcher(content);

    Map<String, Future<String>> map = new HashMap<>();

    while (m.find()) {
        String imageTag = m.group();
        LOGGER.info("使用分组进行替换{}", imageTag);

        String imageUrl = imageTag.substring(imageTag.indexOf("(") + 1, imageTag.indexOf(")"));

        // 确认是本站链接，不处理
        if (imageUrl.indexOf(iOssService.getEndPoint()) != -1) {
            continue;
        }

        // 通过线程池将图片上传到 OSS
        Future<String> future = ossUploadImageExecutor.submit(() -> {
            return iOssService.upload(imageUrl);
        });
        map.put(imageUrl, future);
    }

    for (String oldUrl : map.keySet()) {
        Future<String> future = map.get(oldUrl);

        try {
           String imageUrl = future.get();
           content = content.replace(oldUrl, imageUrl);
        } catch (InterruptedException | ExecutionException e) {
            LOGGER.error("获取图片链接出错{}", e.getMessage());
        }
        
    }
    posts.setPostContent(content);
}
```

### 2. 添加根据外链地址上传图片到 OSS 的方法

```Java
public String upload(String url) {
    String objectName = getFileName(url);
    try (InputStream inputStream = new URL(url).openStream()) {
        ossClient.putObject(bucketName, objectName, inputStream);
    } catch (IOException e) {
        LOGGER.error(e.getMessage());
    }
    return formatOSSPath(objectName);
}
```

第二步，在 OssServiceImpl.java 中添加根据外链地址上传图片到 OSS 的方法。

### 3. 测试

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250510132616330.png)


![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250510132625815.png)
