import 'babel-polyfill'
import Es6Promise from 'es6-promise'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'

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

new Vue({
  router,
  store,
  // render: function (h) { return h(App) },
  render: h=>h(App),
}).$mount('#app')
