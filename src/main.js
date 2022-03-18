import 'babel-polyfill'
import Es6Promise from 'es6-promise'
import Vue from 'vue'
import App from './App.vue'
import router from './router'


Es6Promise.polyfill()
/*
处理手机端白屏问题
import 'babel-polyfill'
import Es6Promise from 'es6-promise'
Es6Promise.polyfill()
*/
Vue.config.productionTip = false
new Vue({
  router,
  render: function (h) { return h(App) },
}).$mount('#app')
