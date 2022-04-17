// vuex

import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations' 
import actions from './actions'
import getters from './getters'

// 1.安装插件
Vue.use(Vuex)

const state = {
    cartList: []
}

// 2.创建Store对象
const store = new Vuex.Store({
  state: state,
  // mutations唯一的目的就是修改state中的状态
  // mutations原则 mutations中的每一个方法尽可能完成的时间比较单一一点（方便跟踪）
  mutations: mutations,
  actions,
  getters
})

// 3.导出，挂在Vue实例上
export default store
