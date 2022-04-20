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
/*
处理手机端白屏问题
import 'babel-polyfill'
import Es6Promise from 'es6-promise'
Es6Promise.polyfill()
*/
Vue.config.productionTip = false

// 在vue原型中添加$bus
Vue.prototype.$bus = new Vue()

// 安装自定义的toast插件 //安装时会默认执行toast中的install函数
Vue.use(toast)

// 处理移动端300ms延迟问题
Fastclick.attach(document.body)

// 使用懒加载插件   需要修改img:ser => v-lazy
Vue.use(VueLazyLoad,{
  loading: require('./assets/img/common/rss.png'),//未加载完图片时显示占位图
})

new Vue({
  router,
  store,
  // render: function (h) { return h(App) },
  render: h=>h(App),
}).$mount('#app')
