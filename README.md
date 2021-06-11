<p align="center">
  <img width="320" src="https://wpimg.wallstcn.com/ecc53a42-d79b-42e2-8852-5126b810a4c8.svg">
</p>

<p align="center">
  <b>智慧渣土管理平台-企业端系统</b>
</p>

## 简介

[vue-element-admin](https://panjiachen.github.io/vue-element-admin) 是一个后台前端解决方案，它基于 [vue](https://github.com/vuejs/vue) 和 [element-ui](https://github.com/ElemeFE/element)实现。它使用了最新的前端技术栈，内置了 i18n 国际化解决方案，动态路由，权限验证，提炼了典型的业务模型，提供了丰富的功能组件，它可以帮助你快速搭建企业级中后台产品原型。相信不管你的需求是什么，本项目都能帮助到你。

**`v4.1.0+`版本之后默认 master 分支将不支持国际化，有需要的请使用[i18n](https://github.com/PanJiaChen/vue-element-admin/tree/i18n)分支，它会和 master 保持同步更新**

**该项目不支持低版本浏览器(如 ie)，有需求请自行添加 polyfill [详情](https://github.com/PanJiaChen/vue-element-admin/wiki#babel-polyfill)**

**目前版本为 `v4.0+` 基于 `vue-cli` 进行构建，若发现问题，欢迎提[issue](https://github.com/PanJiaChen/vue-element-admin/issues/new)。若你想使用旧版本，可以切换分支到[tag/3.11.0](https://github.com/PanJiaChen/vue-element-admin/tree/tag/3.11.0)，它不依赖 `vue-cli`**

## 实际开发使用包
- **image-conversion**

image-conversion是一种前端图片压缩工具包

安装：
```
npm install --save image-conversion
```

调用：
```
import imageConversion from 'image-conversion'
```

- **LivePlayer H5播放器**

LivePlayer支持在线播放MP4、m3u8/HLS、HTTP-FLV/WS-FLV、RTMP等视频在线播放

安装：
```
  npm install @liveqing/liveplayer
```

安装 copy-webpack-plugin 插件：
```
  npm install copy-webpack-plugin@4.6.0
```

编辑 vue.config.js
```
  const CopyWebpackPlugin = require('copy-webpack-plugin');

  module.exports = {
      configureWebpack: {
        plugins: [
          new CopyWebpackPlugin([
              { from: 'node_modules/@liveqing/liveplayer/dist/component/crossdomain.xml'},
              { from: 'node_modules/@liveqing/liveplayer/dist/component/liveplayer.swf'}
              { from: 'node_modules/@liveqing/liveplayer/dist/component/liveplayer-lib.min.js', to: 'js/'},
          ])
        ]
      }
    }
```

html模板中引入依赖js
  使用vue-cli:
```
    <script src="<%= BASE_URL %>js/liveplayer-lib.min.js"></script>
```

使用示例：
```
  import LivePlayer from '@liveqing/liveplayer'

  ......
    components: {
      LivePlayer
    }
  ......

  <LivePlayer :videoUrl="videoUrl" fluent autoplay live stretch></LivePlayer>
```

- **DataV 数据可视化组件**
安装：
```
  npm install @jiaminghi/data-view
```
按需引入
```
  import { borderBox1 } from '@jiaminghi/data-view'
```

- **Echarts 安装echarts图表组件**
```
  在默认的vue-element-admin是已经安装了echarts,但版本为4.2版本，可以更新安装更新版本的echarts-5.1，以及可以安装echarts的GL版本
```
安装echarts：
```
  npm install echarts -S
```
安装echarts-gl：
```
  npm install echarts-gl -S
```
全局引入
```
  在main.js中进行全局引入
  import echarts from ‘echarts’
  import ‘echarts-gl’
  Vue.prototype.$echarts = echarts
```
按需引入
```
  在需要的template中进行引入
  import echarts from ‘echarts’
  import ‘echarts-gl’
```

- **Tinymce 副文本组件**
```
    Tinymce是一个副文本编辑器组件，其针对VUE提供了一个tinymce-vue的插件
```
安装：
```
  安装tinymce：
    npm install tinymce -S
    
  安装tinymce-vue：
  npm install @tinymce/tinymce-vue -S
```
版本问题：
```
  若当前vue使用的版本为2.X版本的，则在使用tinymce应使用固定版本
  安装tinymce：
    npm install tinymce@5.1.0 -S
    
  安装tinymce-vue：
  npm install @tinymce/tinymce-vue@3.0.1 -S
```
新建tinymce目录
```
  在public/static下新建tinymce目录，将node_modules/tinymce下的skins目录，复制到public/static/tinymce目录下
  方便后期使用时的引入
```
下载中文语言包
```
  语言包下载地址：https://www.tiny.cloud/get-tiny/language-packages/
  将下载下来的语言包放入public/static/tinymce/langs下
```
引入
```
  import tinymce from 'tinymce'
  
  import Editor from '@tinymce/tinymce-vue'
```
插件引入
```
  插件都在tinymce的plugins下
  
  import 'tinymce/plugins/table'
  
  插件引入后，若要进行使用，需在tinymce的初始化中进行注册
```
文档
```
  tinymce官方网址：https://www.tiny.cloud/
  
  中文操作手册地址：http://tinymce.ax-z.cn/
  
  参考资料:https://blog.csdn.net/liub37/article/details/83310879
```

## 前序准备

你需要在本地安装 [node](http://nodejs.org/) 和 [git](https://git-scm.com/)。本项目技术栈基于 [ES2015+](http://es6.ruanyifeng.com/)、[vue](https://cn.vuejs.org/index.html)、[vuex](https://vuex.vuejs.org/zh-cn/)、[vue-router](https://router.vuejs.org/zh-cn/) 、[vue-cli](https://github.com/vuejs/vue-cli) 、[axios](https://github.com/axios/axios) 和 [element-ui](https://github.com/ElemeFE/element)，所有的请求数据都使用[Mock.js](https://github.com/nuysoft/Mock)进行模拟，提前了解和学习这些知识会对使用本项目有很大的帮助。

同时配套了系列教程文章，如何从零构建后一个完整的后台项目，建议大家先看完这些文章再来实践本项目

<p align="center">
  <img width="900" src="https://wpimg.wallstcn.com/a5894c1b-f6af-456e-82df-1151da0839bf.png">
</p>


## 功能

```
- 登录 / 注销

- 权限验证
  - 页面权限
  - 指令权限
  - 权限配置
  - 二步登录

- 多环境发布
  - dev
  - sit
  - stage
  - prod

- 全局功能
  - 国际化多语言
  - 多种动态换肤
  - 动态侧边栏（支持多级路由嵌套）
  - 动态面包屑
  - 快捷导航(标签页)
  - Svg Sprite 图标
  - 本地/后端 mock 数据
  - Screenfull全屏
  - 自适应收缩侧边栏

- 编辑器
  - 富文本
  - Markdown
  - JSON 等多格式

- Excel
  - 导出excel
  - 导入excel
  - 前端可视化excel
  - 导出zip

- 表格
  - 动态表格
  - 拖拽表格
  - 内联编辑

- 错误页面
  - 401
  - 404

- 組件
  - 头像上传
  - 返回顶部
  - 拖拽Dialog
  - 拖拽Select
  - 拖拽看板
  - 列表拖拽
  - SplitPane
  - Dropzone
  - Sticky
  - CountTo

- 综合实例
- 错误日志
- Dashboard
- 引导页
- ECharts 图表
- Clipboard(剪贴复制)
- Markdown2html
```

## 开发

```bash
# 克隆项目
git clone https://github.com/PanJiaChen/vue-element-admin.git

# 进入项目目录
cd vue-element-admin

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装依赖，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

浏览器访问 http://localhost:9527

## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

## 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```



