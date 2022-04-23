
export const mixinTest = {
  mounted() {
    // console.log("混入类容-mixin");
  }
}

import BackTop from '@/components/content/backTop/BackTop.vue'

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
    backClick() {
      console.log("组件点击");
      this.$refs.scrollRef && this.$refs.scrollRef.scrollTo(0, 0, 2000)
      this.$refs.scrollref && this.$refs.scrollref.scrollTo(0, 0, 2000)
    },
  }
}