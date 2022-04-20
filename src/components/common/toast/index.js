import Vue from 'vue'
import Toast from './Toast.vue'

const obj = {}

// 执行install时会默认传过来一个vue参数
obj.install = function (vue) {
    // console.log("执行obj.install",vue)
    
    //此方法失败,在执行install时Toast.$el为空
    // document.body.appendChild(Toast.$el) 

    // 1.创建组件构造器
    const toastContrustor = Vue.extend(Toast)

    // 2.new的方式，根据组件构造器，可以创建出来一个组件对象
    const toast = new toastContrustor()

    // 3.将组件对象，手动挂载到某一个元素上(手动创建一个div)
    toast.$mount(document.createElement('div'))

    // 4.toast.$el对应的就是div
    document.body.appendChild(toast.$el) 

    vue.prototype.$toast = toast
}

export default obj