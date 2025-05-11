import { defineConfig } from 'vitepress'

// 导入主题的配置
import { blogTheme } from './blog-theme'

// 导入时间线
import timeline from "vitepress-markdown-timeline";

// 引入todo任务插件



// .vitepress/config.mts
import taskLists from 'markdown-it-task-checkbox'



// 如果使用 GitHub/Gitee Pages 等公共平台部署
// 通常需要修改 base 路径，通常为“/仓库名/”
// 如果项目名已经为 name.github.io 域名，则不需要修改！
// const base = process.env.GITHUB_ACTIONS === 'true'
//   ? '/vitepress-blog-sugar-template/'
//   : '/'

// Vitepress 默认配置
// 详见文档：https://vitepress.dev/reference/site-config
export default defineConfig({
  // 继承博客主题(@sugarat/theme)
  extends: blogTheme,
 
  

  

  // 忽略死链
  ignoreDeadLinks: true,

  markdown: { 
    //行号显示
    lineNumbers: true, 

    
    // 配置 markdown-it-task-checkbox 插件
    config: (md) => {
      // md.use(markdownItTaskCheckbox),
      md.use(taskLists)
      md.use(timeline) //todo
    },

    image: {
      // 默认禁用；设置为 true 可为所有图片启用懒加载。
      lazyLoading: true
    },

    // //时间线 //
    // config: (md) => {
    //   md.use(timeline);
    // },
  },

  // 站点地图
  sitemap: {
    hostname: 'https://www.xiaokaizrk.cn/',
  },
  // base,
  lang: 'zh-cn',
  title: '小凯的个人空间',
  description: '从来没有真正的绝境，只有心灵的迷途',
  lastUpdated: true,
  // 详见：https://vitepress.dev/zh/reference/site-config#head
  head: [
    // 配置网站的图标（显示在浏览器的 tab 上）
    // ['link', { rel: 'icon', href: `${base}favicon.ico` }], // 修改了 base 这里也需要同步修改
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  themeConfig: {
    // 展示 2,3 级标题在目录中
    outline: {
      level: 'deep',
      label: '目录'
    },
    // 默认文案修改
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '相关文章',
    lastUpdatedText: '上次更新于',

    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },


        //编辑本页 //
        editLink: { 
          pattern: 'https://github.com/253715/bokexitong/blob/main/docs/:path', // 改成自己的仓库
          text: '在GitHub编辑本页'
        },

    

    // 设置logo
    logo: '/logo.png',
    // editLink: {
    //   pattern:
    //     'https://github.com/ATQQ/sugar-blog/tree/master/packages/blogpress/:path',
    //   text: '去 GitHub 上编辑内容'
    // },
    nav: [
      { text: '首页', link: '/' },

      { text: '导航页', link: 'https://vitepress-nav-template-main.vercel.app/nav/' },
        
      {
        text: 'Java',
        items: [
          {
            // 分组标题1
            text: '基础知识',
            items: [
              { text: 'Java学习路线', link: '/Java学习/后端/Java学习路线' },
              { text: 'JavaSE', link: '/Java学习/后端/JavaSE/Java概述' },
              { text: 'MySQL', link: '/Java学习/后端/Java学习' },
            ],
          },

          {
            // 分组标题1
            text: '构建|开发工具',
            items: [
              { text: 'Git', link: '/Java学习/后端/Java学习' },
              { text: 'Maven', link: '/Java学习/后端/Java学习' },
              { text: 'IDE', link: '/Java学习/后端/Java学习' },
              { text: 'Nginx', link: '/Java学习/后端/Java学习' },
              { text: 'Docker', link: '/Java学习/后端/Java学习' },
            ],
          },
          {
            // 分组标题2
            text: '中间件|框架学习',
            items: [
              { text: 'SpringBoot', link: '/Java学习/后端/Springboot/搭建第一个SpringBoot项目' },
              { text: 'Vue', link: '/Java学习/后端/Vue/vue' },
              { text: 'Redis', link: '/Java学习/后端/redis/redis学习路线' },
            ],
          },
          {
            // 分组标题3
            text: '项目实战',
            items: [
              { text: '用户中心项目', link: '/Java学习/后端/项目实战/用户中心项目/用户中心项目概述' },
              { text: '伙伴匹配系统', link: '/Java学习/后端/项目实战/伙伴匹配系统/伙伴匹配系统概述' },
              { text: '智能云图库项目', link: '/Java学习/后端/项目实战/智能协同云图库项目/智能协同云图库项目总览' },
            ],
          },

          {
            // 分组标题4
            text: '脚手架学习',
            items: [
              { text: '若依脚手架', link: '/Java学习/项目实战/项目实战' },
            ],
          },

          {
            // 分组标题1
            text: '进阶学习',
            items: [
              { text: '设计模式', link: '/Java学习/后端/Java学习' },
            ],
          },
        ],
      },

      {
        text: '大数据',
        items: [
          {
            // 分组标题1
            text: '基础知识',
            items: [
              {text:'大数据学习路线',link:'/大数据/大数据学习路线'},
              {text:'Hadoop',link:'/大数据/大数据学习路线'},
            ],
          },

          {
            // 分组标题2
            text: '数据采集',
            items: [
              { text: 'Datax', link: '/Java学习/后端/SpringBoot/SpringBoot' },
              { text: 'Sqoop', link: '/Java学习/后端/SpringBoot/SpringBoot' },
            ],
          },
          {
            // 分组标题2
            text: '数仓学习',
            items: [
              { text: 'Hive', link: '/Java学习/后端/SpringBoot/SpringBoot' },
              { text: 'Spark', link: '/Java学习/后端/SpringBoot/SpringBoot' },
              { text: '数仓理论', link: '/Java学习/后端/SpringBoot/SpringBoot' },
              { text: 'Flink', link: '/Java学习/后端/SpringBoot/SpringBoot' },
              { text: '数据治理', link: '/Java学习/后端/SpringBoot/SpringBoot' },
            ],
          },
          {
            // 分组标题2
            text: '调度|可视化',
            items: [
              { text: '调度工具', link: '/Java学习/后端/SpringBoot/SpringBoot' },
            ],
          },
          {
            // 分组标题2
            text: 'SQL练习',
            items: [
              { text: '基础题', link: '/Java学习/后端/SpringBoot/SpringBoot' },
              { text: '十大专题', link: '/大数据/SQL/十大专题/专题一 SQL真正的执行顺序' },
              { text: '进阶题', link: '/Java学习/后端/SpringBoot/SpringBoot' },
            ],
          },
          {
            // 分组标题3
            text: '项目实战',
            items: [
              {text:'项目实战',link:'/Java学习/后端/SpringBoot/SpringBoot'},
            ],
          },
        ],
      },




      {
        text: 'Python',
        items: [
          {
            // 分组标题1
            text: '基础知识',
            items: [
              { text: 'Python学习路线', link: '/Java学习/后端/Java学习' },
            ],
          },
          {
            // 分组标题2
            text: '爬虫',
            items: [
              { text: '爬虫学习', link: '/Java学习/后端/SpringBoot/SpringBoot' },
            ],
          },
          {
            // 分组标题3
            text: '数据分析',
            items: [
              { text: '数据分析', link: '/Markdown/时间线' },
            ],
          },
        ],
      },
      {
        text: '提效工具',
        items: [
          {
            // 分组标题1
            text: '代码生成器',
            items: [
              { text: 'MybatisX插件', link: '/Java学习/后端/Java学习' },
            ],
          },
          {
            // 分组标题2
            text: 'Ai辅助工具',
            items: [
              { text: 'cursor', link: '/Java学习/后端/SpringBoot/SpringBoot' },
            ],
          },
        ],
      },

      {
        text: '知识库笔记',
        items: [
          {
            // 分组标题1
            text: '博客',
            items: [
              { text: '博客搭建', link: '/博客/搭建静态博客' },
              { text: '博客搭建踩坑日志', link: '/博客/搭建博客踩坑日志' },
            ],
          },
          {
            // 分组标题2
            text: 'Obsidian知识库笔记',
            items: [
              { text: 'Obsidian学习笔记', link: '/Java学习/后端/SpringBoot/SpringBoot' },
            ],
          },
          {
            // 分组标题3
            text: 'Markdown语法学习',
            items: [
              { text: '常用Markdown语法', link: '/Markdown/时间线' },
            ],
          },
        ],
      },

      {
        text: '随笔记录',
        items: [
          {
            // 分组标题1
            text: '每天待办',
            items: [
              { text: '每日任务', link: '/随笔记录/待办' },
            ],
          },
          {
            // 分组标题2
            text: '时间线整理',
            items: [
              { text: '博客搭建时间线', link: '/随笔记录/博客搭建时间线' },
            ],
          },
          {
            // 分组标题3
            text: '朋友圈',
            items: [
              { text: '朋友圈', link: '/随笔记录/朋友圈' },
            ],
          },
          {
            // 分组标题3
            text: '恋爱日记',
            items: [
              { text: '恋爱日常', link: '/随笔记录/恋爱日记' },
            ],
          },
        ],
      },

      { text: '小凯', link: '/aboutme/' }
    ],

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/253715/bokexitong'
      }
    ],
     
  }
})
