// vue 混入  https://cn.vuejs.org/v2/guide/mixins.html#ad

export const mixinTest = {
  // data、methods等等都可以混入
  mounted() {
    // console.log("混入类容-mixin");
  }
}

import BackTop from 'components/content/backTop/BackTop.vue'

export const backTopMixin = {
    components: {
      BackTop
    },
  data() {
    return {
      backTopIsShow: false
    }
  },
  methods: {
    // 监听回到顶部（bakcTop）组件的点击
    backClick() {
      console.log("组件点击");
      // 可以通过ref拿到组件对象，且可以使用其中的属性、方法等
      // console.log( this.$refs.scrollref.message);

      // 调用scroll回到顶部函数  在2000毫秒内 // this.scroll && =>scroll存在时再执行后面的代码
      this.$refs.scrollRef && this.$refs.scrollRef.scrollTo(0, 0, 2000)
      this.$refs.scrollref && this.$refs.scrollref.scrollTo(0, 0, 2000)
    },
  }
}