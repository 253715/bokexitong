---
tags:
  - Java项目实战
  - SpringBoot
  - 仿B站项目
readingTime: true
date: 2025-05-12 15:16:30
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



## 一个插件 JSON-handle  

> 这个插件可以更加方便和美观的看JSON代码

![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250512152509711.png)


## 接口文档

时间点：15:26
https://www.bilibili.com/video/BV1aW2NYREFh?spm_id_from=333.788.videopod.episodes&vd_source=2074845aa36e291c34caa4671c3b2eda&p=5


验证码防止机器人来注册


## Session基础


## redis和session的区别


> redis 不是唯一标识，会被覆盖，全部人都是共享同一个
> session是唯一标识，不会被覆盖


## redis来保存

https://www.bilibili.com/video/BV1aW2NYREFh?spm_id_from=333.788.player.switch&vd_source=2074845aa36e291c34caa4671c3b2eda&p=6