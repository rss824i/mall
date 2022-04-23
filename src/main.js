import 'babel-polyfill'
import Es6Promise from 'es6-promise'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'

import toast from '@/components/common/toast/index'

// 处理移动端300ms问题
import Fastclick from 'fastclick'

// 懒加载插件 （在图片区域出现在屏幕中时才加载图片）
import VueLazyLoad from 'vue-lazyload'

Es6Promise.polyfill()

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

Vue.use(toast)

Fastclick.attach(document.body)

Vue.use(VueLazyLoad,{
  loading: require('./assets/img/common/rss.png'),
})

new Vue({
  router,
  store,
  // render: function (h) { return h(App) },
  render: h=>h(App),
}).$mount('#app')
