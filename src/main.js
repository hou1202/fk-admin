import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'
// import enLang from 'element-ui/lib/locale/lang/en'// 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖

import '@/styles/index.scss' // global css
import '@/assets/icon/iconfont.css' // 引入本地ICON图标库
import dataV from '@jiaminghi/data-view' // 引入dataV数据可视化
Vue.use(dataV)// 数据大屏组件

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters

// 自定义模块组件
import selfTable from '@/components/FkTable'
import selfTr from '@/components/FkTr'
import selfTd from '@/components/FkTd'
import selfTh from '@/components/FkTh'
import showImg from '@/components/ShowImg'

Vue.component('selfTable', selfTable)
Vue.component('selfTr', selfTr)
Vue.component('selfTd', selfTd)
Vue.component('selfTh', selfTh)
Vue.component('showImg', showImg)

import selfJs from './common/public.js' // 自定义公众JS文件
Vue.use(selfJs)

/* import Video from 'video.js'
import 'video.js/dist/video-js.css'

Vue.prototype.$video = Video //引入Video播放器 */

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
  // locale: enLang // 如果使用中文，无需设置，请删除
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
