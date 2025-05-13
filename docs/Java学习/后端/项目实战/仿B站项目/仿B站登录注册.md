---
tags:
  - Java项目实战
  - SpringBoot
  - 仿B站项目
readingTime: true
date: 2025-05-12 15:16:30
comment: false
recommend: ['仿B站项目',3]
---

# 登录注册

## 数据库设计

<iframe src="https://www.bilibili.com/video/BV1aW2NYREFh?spm_id_from=333.788.videopod.episodes&amp;vd_source=2074845aa36e291c34caa4671c3b2eda&amp;p=4" allow="fullscreen" allowfullscreen="" style="height:100%;width:100%; aspect-ratio: 16 / 9; "></iframe>


![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250513140808061.png)

### 创建用户表

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250513141330198.png)

>这个表就是大概，但是我们要考虑到性能，所以我们可以建立索引，索引可以增加查询效率等等

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250513141443543.png)

>同时我们可以对用户表的一些字段进行一些限制，不为空啊，等等

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250513141823778.png)
### 建表语句

```SQL
CREATE TABLE `user_info` (
  `user_id` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户id',
  `nick_name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '昵称',
  `avatar` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '头像',
  `email` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '邮箱',
  `password` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '密码',
  `sex` tinyint(1) DEFAULT NULL COMMENT '0:女 1:男 2:未知',
  `birthday` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '出生日期',
  `school` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '学校',
  `person_introduction` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '个人简介',
  `join_time` datetime NOT NULL COMMENT '加入时间',
  `last_login_time` datetime DEFAULT NULL COMMENT '最后登录时间',
  `last_login_ip` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '最后登录IP',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '0:禁用 1:正常',
  `notice_info` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '空间公告',
  `total_coin_count` int NOT NULL COMMENT '硬币总数量',
  `current_coin_count` int NOT NULL COMMENT '当前硬币数',
  `theme` tinyint(1) NOT NULL DEFAULT '1' COMMENT '主题',
  PRIMARY KEY (`user_id`) USING BTREE,
  UNIQUE KEY `idx_key_email` (`email`) USING BTREE,
  UNIQUE KEY `idx_nick_name` (`nick_name`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC COMMENT='用户信息';
```

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250513141932887.png)

### 数据库设计关键点

> 数据库设计首先是要看原型，参考别人的页面，然后就是看看页面上有哪些字段，然后就是先把表建立起来，一开始肯定是不容易想全的，然后等后面有具体的需求了，我们在进行完善表格
## 代码生成器

>我们将表建立好之后，我们就可以使用代码生成器来生成一些通用的代码了

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250513142815020.png)

### 修改代码生成的位置

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250513142938210.png)
### 修改数据库配置

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250513143013191.png)

### 生成代码

::: danger⚠️
这里面运行代码生成器的版本必须是jdk8  不能是17 否则就是会报错  **【java】【经验】java: 错误: 不支持发行版本 6**
解决方法
https://blog.csdn.net/legend818/article/details/132180334
:::
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250513143908593.png)
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250513143921927.png)

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250513143932551.png)

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250513143947230.png)


### 复制代码
#### 1. 复制实体类等

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250513144550457.png)


![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250513144525032.png)

#### 2. 复制controller类

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250513144701332.png)
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250513144803544.png)

#### 3. 复制xml

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250513145017029.png)

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250513145031114.png)
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250513145118983.png)

修改包名

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250513145436734.png)

::: danger ⚠️
当然这里我生成的时候没有指定包名，也就是包名没有修改，所以这里所有的生成文件复制完成之后需要进行修改包名
:::

### 运行
>我们发现报错了

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250513145825987.png)

> 这里是因为我们没有设置包扫描

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250513150734423.png)

这样就可以找到了成功启动了

### 测试接口

接口一般都是在controller类中

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250513150953538.png)


::: danger⚠️注意

这里测试没有成功，犯了一个很大的错误，就是resources目录下的包名不对

:::
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250513164358684.png)


这个包名改好之后测试成功

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250513164415641.png)

## 一个插件 JSON-handle  

> 这个插件可以更加方便和美观的看JSON代码

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250512152509711.png)


## 接口文档

时间点：15:26
https://www.bilibili.com/video/BV1aW2NYREFh?spm_id_from=333.788.videopod.episodes&vd_source=2074845aa36e291c34caa4671c3b2eda&p=5


验证码防止机器人来注册

## 验证码功能

### session实现方式

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250513195021814.png)

### 测试

#### 1. 抓请求


F12
![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250513195232617.png)


![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250513195304381.png)

查看cookie

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250513195353685.png)

这两个应该是一样的

#### 2. 写注册接口测试

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250513195600326.png)

> 因为注册的时候也是要填入checkcode的


![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250513195641935.png)

我们算到的答案应该是-1，但是我们刚才传值传的是2

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250513201615997.png)

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250513202058500.png)

同一个会话(浏览器）里，就是从内存里面取，这样我就可以知道你输入的验证码对还是不对

上面这个是使用session来记录的，下面我们使用redis来记录

### redis


#### redis和session的区别


> redis 不是唯一标识，会被覆盖，全部人都是共享同一个
> session是唯一标识，不会被覆盖


#### redis来保存

https://www.bilibili.com/video/BV1aW2NYREFh?spm_id_from=333.788.player.switch&vd_source=2074845aa36e291c34caa4671c3b2eda&p=6


##### 1. redis配置类

```Java
@Configuration  
public class RedisConfig<V> {  
private static final Logger logger = LoggerFactory.getLogger(RedisConfig.class);  
  
  
@Bean("redisTemplate")  
public RedisTemplate<String, V> redisTemplate(RedisConnectionFactory factory) {  
RedisTemplate<String, V> template = new RedisTemplate<>();  
template.setConnectionFactory(factory);  
// 设置key的序列化方式  
template.setKeySerializer(RedisSerializer.string());  
// 设置value的序列化方式  
template.setValueSerializer(RedisSerializer.json());  
// 设置hash的key的序列化方式  
template.setHashKeySerializer(RedisSerializer.string());  
// 设置hash的value的序列化方式  
template.setHashValueSerializer(RedisSerializer.json());  
template.afterPropertiesSet();  
return template;  
}  
  
@Bean  
public RedisMessageListenerContainer container(RedisConnectionFactory connectionFactory) {  
RedisMessageListenerContainer container = new RedisMessageListenerContainer();  
container.setConnectionFactory(connectionFactory);  
return container;  
}  
}
```

##### 2. utils类

```Java
@Component("redisUtils")  
public class RedisUtils<V> {  
  
@Resource  
private RedisTemplate<String, V> redisTemplate;  
  
private static final Logger logger = LoggerFactory.getLogger(RedisUtils.class);  
  
/**  
* 删除缓存  
*  
* @param key 可以传一个值 或多个  
*/  
public void delete(String... key) {  
if (key != null && key.length > 0) {  
if (key.length == 1) {  
redisTemplate.delete(key[0]);  
} else {  
redisTemplate.delete((Collection<String>) CollectionUtils.arrayToList(key));  
}  
}  
}  
  
public V get(String key) {  
return key == null ? null : redisTemplate.opsForValue().get(key);  
}  
  
/**  
* 普通缓存放入  
*  
* @param key 键  
* @param value 值  
* @return true成功 false失败  
*/  
public boolean set(String key, V value) {  
try {  
redisTemplate.opsForValue().set(key, value);  
return true;  
} catch (Exception e) {  
logger.error("设置redisKey:{},value:{}失败", key, value);  
return false;  
}  
}  
  
public boolean keyExists(String key) {  
return redisTemplate.hasKey(key);  
}  
  
/**  
* 普通缓存放入并设置时间  
*  
* @param key 键  
* @param value 值  
* @param time 时间(秒) time要大于0 如果time小于等于0 将设置无限期  
* @return true成功 false 失败  
*/  
public boolean setex(String key, V value, long time) {  
try {  
if (time > 0) {  
redisTemplate.opsForValue().set(key, value, time, TimeUnit.MILLISECONDS);  
} else {  
set(key, value);  
}  
return true;  
} catch (Exception e) {  
logger.error("设置redisKey:{},value:{}失败", key, value);  
return false;  
}  
}  
  
public boolean expire(String key, long time) {  
try {  
if (time > 0) {  
redisTemplate.expire(key, time, TimeUnit.MILLISECONDS);  
}  
return true;  
} catch (Exception e) {  
e.printStackTrace();  
return false;  
}  
}  
  
  
public List<V> getQueueList(String key) {  
return redisTemplate.opsForList().range(key, 0, -1);  
}  
  
  
public boolean lpush(String key, V value, Long time) {  
try {  
redisTemplate.opsForList().leftPush(key, value);  
if (time != null && time > 0) {  
expire(key, time);  
}  
return true;  
} catch (Exception e) {  
e.printStackTrace();  
return false;  
}  
}  
  
public long remove(String key, Object value) {  
try {  
Long remove = redisTemplate.opsForList().remove(key, 1, value);  
return remove;  
} catch (Exception e) {  
e.printStackTrace();  
return 0;  
}  
}  
  
public boolean lpushAll(String key, List<V> values, long time) {  
try {  
redisTemplate.opsForList().leftPushAll(key, values);  
if (time > 0) {  
expire(key, time);  
}  
return true;  
} catch (Exception e) {  
e.printStackTrace();  
return false;  
}  
}  
  
public V rpop(String key) {  
try {  
return redisTemplate.opsForList().rightPop(key);  
} catch (Exception e) {  
e.printStackTrace();  
return null;  
}  
}  
  
public Long increment(String key) {  
Long count = redisTemplate.opsForValue().increment(key, 1);  
return count;  
}  
  
public Long incrementex(String key, long milliseconds) {  
Long count = redisTemplate.opsForValue().increment(key, 1);  
if (count == 1) {  
//设置过期时间1天  
expire(key, milliseconds);  
}  
return count;  
}  
  
public Long decrement(String key) {  
Long count = redisTemplate.opsForValue().increment(key, -1);  
if (count <= 0) {  
redisTemplate.delete(key);  
}  
logger.info("key:{},减少数量{}", key, count);  
return count;  
}  
  
  
public Set<String> getByKeyPrefix(String keyPrifix) {  
Set<String> keyList = redisTemplate.keys(keyPrifix + "*");  
return keyList;  
}  
  
  
public Map<String, V> getBatch(String keyPrifix) {  
Set<String> keySet = redisTemplate.keys(keyPrifix + "*");  
List<String> keyList = new ArrayList<>(keySet);  
List<V> keyValueList = redisTemplate.opsForValue().multiGet(keyList);  
Map<String, V> resultMap = keyList.stream().collect(Collectors.toMap(key -> key, value -> keyValueList.get(keyList.indexOf(value))));  
return resultMap;  
}  
  
public void zaddCount(String key, V v) {  
redisTemplate.opsForZSet().incrementScore(key, v, 1);  
}  
  
  
public List<V> getZSetList(String key, Integer count) {  
Set<V> topElements = redisTemplate.opsForZSet().reverseRange(key, 0, count);  
List<V> list = new ArrayList<>(topElements);  
return list;  
}
```

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250513202901407.png)

> 上面这种写法是不对的，因为是共享的，会被覆盖，全站全都是一个key，别人刷新了，你就刷不出来了

##### 3. 正确写法
> 思路，我们应该将key写成动态的

```Java

/**  
* 验证码  
*/  
@RequestMapping(value = "/checkCode")  
  
public ResponseVO checkCode() {  
ArithmeticCaptcha captcha = new ArithmeticCaptcha(100, 42);  
// code就是表示 验证码图片中算出来的结果是什么 比如图中显示3-1 那么code=2  
String code = captcha.text();  
// 把code保存起来  
String checkCodeKey = redisComponent.saveCheckCode(code);  
String checkCodeBase64 = captcha.toBase64();  
Map<String, String> result = new HashMap<>();  
result.put("checkCode", checkCodeBase64);  
// 这个key 就是保存在redis中的key 使用session就不需要这个  
result.put("checkCodeKey", checkCodeKey);  
return getSuccessResponseVO(result);  
}
```



## 注册功能

24:39
https://www.bilibili.com/video/BV1aW2NYREFh?spm_id_from=333.788.videopod.episodes&vd_source=2074845aa36e291c34caa4671c3b2eda&p=6
## 登录功能

https://www.bilibili.com/video/BV1aW2NYREFh?spm_id_from=333.788.videopod.episodes&vd_source=2074845aa36e291c34caa4671c3b2eda&p=7


这里使用token，使用token的好处，就是如果天天登录的话，就会自动登录，不用每天都登录了

用token，依旧放在cookie中


