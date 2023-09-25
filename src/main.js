import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss'

import i18n from '@/i18n/i18n.js' // 国际化

import '@/components/global' //   注册全局组件
import '@/filters' // 全局过滤器

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
