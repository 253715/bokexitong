---
title: 待办
tag: markdown
readingTime: true
comment: false
recommend: ['markdown',2]
---

# 待办

## 语法
``` md
* [ ] 🥔 TODO
* [ ] 真不戳
* [x] 内置任务列表

```


## 效果

* [ ] 🥔 TODO
* [ ] 真不戳
* [x] 内置任务列表


## 配置教程

### 参考教程

[插件 | VitePress](https://vitepress.yiov.top/plugin.html#todo)

### 安装插件

```npm
npm install markdown-it-task-checkbox --save
```

### 配置

```ts
// .vitepress/config.mts
import taskLists from 'markdown-it-task-checkbox'

export default defineConfig({
  markdown: {
    config: (md) => {
      md.use(taskLists) //todo
    }
  },
})
```

或者

```ts
// .vitepress/config.mts
import markdownItTaskCheckbox from 'markdown-it-task-checkbox'

export default defineConfig({
  markdown: {
    config: (md) => {
      md.use(markdownItTaskCheckbox) //todo
    }
  },
})
```


![image.png](https://imgsbo.oss-cn-shanghai.aliyuncs.com/undefined20250506215319918.png)


