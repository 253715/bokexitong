---
tags:
  - 图床
readingTime: true
comment: true
top: 2
recommend:
  - 博客
  - 2
title: 搭建阿里云oss图床
---
# 搭建阿里云OSS图床
## 搭建图床

> 原来使用的是gitee，然后搞了七牛云，cloudf，github等等，折腾了一下午都没搞好，一生气搞了阿里云oss了

### 参考教程

[Typora+PicGo+阿里云OSS搭建博客图床（超详细）](https://blog.csdn.net/muxuen/article/details/122441469)

### 下载PicGo

[PicGo地址](https://github.com/Molunerfinn/PicGo/releases)

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250506194707652.png)

### 配置阿里云OSS

[阿里云OSS官网](https://www.aliyun.com/product/oss)

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250506195141297.png)

#### 1. 注册开通

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250506195223666.png)
#### 2. 创建bucket

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250506195241361.png)
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250506195437184.png)


>这里面公共读设置不了，需要先创建好了之后改

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250506195544893.png)

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250506195653050.png)

#### 3. 创建key

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250506195848396.png)

**在弹出的选项框里，选择“继续使用”**

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250506195903929.png)


![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250506195919508.png)

>在弹出的界面里，记住你的accessKeyId和accessKeySecret
>这个配置PicGO的时候用得到

#### 4. 收费问题

>阿里云OSS的各项收费是独立的！

对于图床而言，有两种收费形式
- 以充值的方式使用储存容量以及流量(默认状态)
- 按年/月收费，购买一定存储包。流量额外收费
也就是说，即便你购买了下图的存储包，你依旧要为访问图床的流量付钱！

**图床使用的是标准型，请勿购买其他类型**

- 储存容量：0.12元/GB/月
- 图片上传到阿里OSS流量：免费
- 外网流出流量(如typora访问图床图片)：闲时0.25元/GB，忙时0.50元/GB

**仔细算算，我们图床的数据量其实很小的**

> 0.12元/1GB/1个月，一年就是1.44元，远低于40GB的9元收费！
   截图/照片以平均0.5mb/张估算，1gb可存放超过1600张图片！
   数据低于6GB的情况下直接充值，以GB付费其实比购买储存包更加值得！


### 配置PicGo

#### 1. 图床配置

在图床设置里面选择阿里云OSS，依照以下步骤填写信息

- 设定Keyld：填写刚刚获得的AccessKeyID

- 设定KeySecret：填写AccessKeyIDSecret

- 设定储存空间名：填写bucket名称

- 这里填写的是bucket名称，不是浏览器里的域名

- 确认存储区域：填写你的地域节点，注意复制的格式

- 指定存储路径：其实就是自定义一个文件夹的名字，以/结尾

- 它会自动在你的bucket里面创建一个文件夹，并把图片上传进去

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250506200327075.png)

弄完之后，记得“确定”，并点击“设置为默认图床”！


#### 2. PicGo配置

> 在设置里打开时间戳重命名和上传后自动复制URL
> 时间戳重命名：以上传时间来重命名图片，避免同名的图片无法上传（该设置不影响本地图片名


![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250506200425211.png)


#### 3. 配置typora


进入typora主界面，点击左上角的“文件-偏好设置”

- 选择图像

- 插入图片时上传图片

- 下面的选项全勾上【更新22.03.05: 第二个网络位置的图片可以不勾，避免已经上传到图床的图片重复上传】

- 上传服务选择PicGo(app)

- PicGo路径：找到picgo的安装路径 **不是安装包的路径！！！！**