// 主题独有配置
import { getThemeConfig } from '@sugarat/theme/node'



// 开启RSS支持（RSS配置）
// import type { Theme } from '@sugarat/theme'

// const baseUrl = 'https://sugarat.top'
// const RSS: Theme.RSSOptions = {
//   title: '粥里有勺糖',
//   baseUrl,
//   copyright: 'Copyright (c) 2018-present, 粥里有勺糖',
//   description: '你的指尖,拥有改变世界的力量（大前端相关技术分享）',
//   language: 'zh-cn',
//   image: 'https://img.cdn.sugarat.top/mdImg/MTY3NDk5NTE2NzAzMA==674995167030',
//   favicon: 'https://sugarat.top/favicon.ico',
// }

// 所有配置项，详见文档: https://theme.sugarat.top/
const blogTheme = getThemeConfig({
  // 开启RSS支持
  // RSS,

  // 搜索
  // 默认开启pagefind离线的全文搜索支持（如使用其它的可以设置为false）
  // search: false,

  // markdown 图表支持（会增加一定的构建耗时）
  // mermaid: true

  

  // 页脚
  footer: {
    // message 字段支持配置为HTML内容，配置多条可以配置为数组
    // message: '下面 的内容和图标都是可以修改的噢（当然本条内容也是可以隐藏的）',
    copyright: 'MIT License | xiaokai',
    // icpRecord: {
    //   name: '蜀ICP备19011724号',
    //   link: 'https://beian.miit.gov.cn/'
    // },
    // securityRecord: {
    //   name: '公网安备xxxxx',
    //   link: 'https://www.beian.gov.cn/portal/index.do'
    // },
  },

  // 主题色修改
  themeColor: 'el-blue',

  // 文章默认作者
  author: 'xiaokai',

  // 友链
  friend: [
    {
      nickname: '粥里有勺糖',
      des: '你的指尖用于改变世界的力量',
      avatar:
        'https://img.cdn.sugarat.top/mdImg/MTY3NDk5NTE2NzAzMA==674995167030',
      url: 'https://sugarat.top',
    },
    {
      nickname: 'Vitepress',
      des: 'Vite & Vue Powered Static Site Generator',
      avatar:
        'https://vitepress.dev/vitepress-logo-large.webp',
      url: 'https://vitepress.dev/',
    },

    {
      nickname: 'Vitepress中文教程',
      des: 'Vitepress中文教程',
      avatar:
        'https://vitepress.dev/vitepress-logo-large.webp',
      url: 'https://vitepress.yiov.top/',
    },

    {
      nickname: '茂茂物语',
      des: '知识是进步的阶梯，争取每天都有知识点更新，有导航页的vitepress博客，欢迎大家关注',
      avatar:
        'https://notes.fe-mm.com/logo.png',
      url: 'https://notes.fe-mm.com/',
    },


    {
      nickname: '沐风的个人空间',
      des: 'Vite & Vue Powered Static Site Generator',
      avatar:
        'https://cdn.imufeng.cn/mblog/avatar-1.jpg',
      url: 'https://www.imufeng.cn/',
    },

    
  ],

  // 公告
  popover: {
    title: '公告',
    body: [
      // { type: 'text', content: '👇公众号👇---👇 微信 👇' },
      // {
      //   type: 'image',
      //   src: 'https://img.cdn.sugarat.top/mdImg/MTYxNTAxODc2NTIxMA==615018765210~fmt.webp'
      // },
      // {
      //   type: 'text',
      //   content: '欢迎大家加群&私信交流'
      // },
      // {
      //   type: 'text',
      //   content: '文章首/文尾有群二维码',
      //   style: 'padding-top:0'
      // },
      // {
      //   type: 'button',
      //   content: '作者博客',
      //   link: 'https://www.xiaokaizrk.cn/'
      // },
      // {
      //   type: 'button',
      //   content: '加群交流',
      //   props: {
      //     type: 'success'
      //   },
      //   link: 'https://theme.sugarat.top/group.html',
      // }
      { type: 'text', content: '记录一下自己学习的内容' },
    ],
    duration: 0
  },

  // 看板娘
  oml2d: {
    mobileDisplay: true,
    models: [
      {
        path: 'https://registry.npmmirror.com/oml2d-models/latest/files/models/Senko_Normals/senko.model3.json'
      }
    ]
  },
  // 评论
  comment: {
    type: 'giscus',
    options: {
      repo: 'ATQQ/sugar-blog',
      repoId: 'MDEwOlJlcG9zaXRvcnkyNDEyNDUyOTk',
      category: 'Announcements',
      categoryId: 'DIC_kwDODmEcc84COVc6',
      inputPosition: 'top'
    },
    mobileMinify: true
  },


  



})

export { blogTheme }
