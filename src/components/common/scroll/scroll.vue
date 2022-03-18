<template>
<!-- 滚动封装 -->
<!-- 
    ref 如果绑定在组件的，通过this.$refs.值 获取的是一个组件对象
    如果绑定到普通元素上，获取的是元素对象
  -->
  <div class='wrapper' ref='wrapper'>
      <div class='content'>
          <slot></slot>
      </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
 export default {
   name: '',
   data () {
     return {
         scroll :null
     }
   },
   mounted(){
    this.scroll = new BScroll(this.$refs.wrapper,{
        
    })
   },
   components:{},
   created () {},
   // mounted () {},
   computed: {},
   watch: {},
   methods: {}
}
</script>

<style scoped>

</style>
