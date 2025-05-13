---
tags:
  - SpringBoot
  - 编程喵
readingTime: true
comment: false
date: 2025-05-10 13:31:12
recommend: ['SpringBoot','编程喵',17]
---
# Spring Boot 整合 MinIO自建对象存储服务

## 参考教程
>[https://www.yuque.com/itwanger/vn4p17/ta5vr1#a51e596d](https://www.yuque.com/itwanger/vn4p17/ta5vr1#a51e596d)

>[上次把图片直接存储到服务器上](https://mp.weixin.qq.com/s/4qz44y2mpRwCrPgkNJ9vaQ)后，被我臭骂了一顿，于是他就开始反省，后来用了 **OSS**，算是符合我的要求。  
后来，我就给他提了新的要求，**能不能在服务器上搭一个文件存储服务器？**  
“试试 GitHub 星标 32k+ 的 **MinIO** 吧！go 语言开发的，性能很好，安装也简单，**可分布式存储海量图片、音频、视频等文件，还有后台管理**，十分友好。”我整理好情绪后和蔼可亲地说。

GitHub 地址：[https://github.com/minio/minio](https://github.com/minio/minio)

## 安装MinIO

MinIO 适用于各种平台，包括 **Windows、macOS 和Linux**，那我自己刚好有一台 CentOS 服务器，所以我们就以 CentOS 为例来安装 MinIO。

>MinIO 下载地址：[https://min.io/download#/linux](https://min.io/download#/linux)

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250510132833489.png)


执行 chmod +x minio 命令添加权限，再执行 ./minio server /home/minioserver 命令启动 MinIO 服务， 你可以替换 /home/minioserver 为你自己的目录，用来存储数据。

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250510132843175.png)


![](https://cdn.nlark.com/yuque/0/2025/png/26027752/1743858355293-d451f036-4125-4edc-930e-0f57bfe4b5bf.png)

```
./minio server --console-address :46747 /home/minioserver > /home/minio.log 2>&1&
```

通过 cat /home/minio.log 可以看到安装的日志。

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250510132902699.png)


然后就可以在浏览器访问 MinIO 的后台管理了，注意把 IP 切换成你自己的 IP 地址。**用户名和密码是默认的**：**minioadmin**

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250510132911930.png)


## 使用MinIO

通过 MinIO 的后台管理面板就可以上传下载文件了，我们就以图片为例吧。

### 1. 新建存储桶

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250510132920184.png)


### 2. 填写桶名，点击创建按钮。

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250510132927614.png)


### 3. 点击 upload，选择文件上传。

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250510132935066.png)


### 4. 点击刷新，选中图片，点击分享按钮，就可以访问图片了。

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250510132941160.png)


要想获取长久链接，我们需要修改存储桶的访问策略，  
点击桶的设置按钮：
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250510132948585.png)


添加访问规则，只读即可

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250510132956308.png)


注意前缀设置为 *.*，否则会访问不成功。  

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250510133004875.png)


设置成功后，再回到图片的访问链接，复制红色下划线标出的部分。替换 ip 为你的服务器 ip 地址，端口号 9000 同样要记得在服务器/宝塔面板中放开。

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250510133012027.png)


然后就可以在地址栏里访问图片了。


![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250510133019272.png)


## Spring Boot 整合 MinIO  
  

### 1. 引入依赖

```xml
<dependency>
    <groupId>io.minio</groupId>
    <artifactId>minio</artifactId>
    <version>8.2.1</version>
</dependency>
```

### 2. MinIOController.java

新建 MinIOController.java，添加 upload 上传接口。

```Java
@Controller
@Api(tags = "MinIO上传")
@RequestMapping("/minioController")
@Slf4j
public class MinIOController {
    private static final String bucketName = "tobebetterjavaer";

    @RequestMapping(value = "/upload",method= RequestMethod.POST)
    @ResponseBody
    @ApiOperation("上传")
    public ResultObject<String> upload(@RequestParam("file") MultipartFile file, HttpServletRequest req) throws IOException, NoSuchAlgorithmException, InvalidKeyException {
        try {
            MinioClient minioClient =
                    MinioClient.builder()
                            .endpoint("http://xxx.175:9000")
                            .credentials("minioadmin", "minioadmin")
                            .build();
            boolean found = minioClient.bucketExists(BucketExistsArgs.builder().bucket(bucketName).build());

            if (!found) {
                minioClient.makeBucket(MakeBucketArgs.builder().bucket(bucketName).build());
            } else {
                log.debug("桶 '{}' 存在.", bucketName);
                minioClient.putObject(
                        PutObjectArgs.builder()
                                .bucket(bucketName)
                                .object(FileNameUtil.getFileName("", file.getOriginalFilename()))
                                .stream(file.getInputStream(),file.getInputStream().available(),-1)
                                .build());
            }
        } catch (MinioException e) {
            log.error("MinIO 上传文件出错{}" + e);
            return ResultObject.failed("MinIO 上传文件出错");
        }
        return ResultObject.success("上传成功");
    }
}
```

整个逻辑非常简单，通过 endpoint、用户名和密码构建 MinioClient 客户端，然后创建桶，最后调用 putObject 方法将文件上传到 MinIO 服务器上。

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250510133040721.png)


### 3. 测试

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250510133046523.png)


打开 apipost 对接口进行测试，发现上传成功。  
登录MinIO后台管理，查看刚刚上传的图片。  
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250510133053013.png)
