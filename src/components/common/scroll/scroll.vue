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
    props:{
      probeType:{
        type:Number,
        default: 0
      }
    },
    data () {
      return {
          scroll :null,
          message: 'TestMessage',
      }
    },
   mounted(){
    //  1.创建BScroll对象
     this.scroll = new BScroll(this.$refs.wrapper,{
        // 设置内容可以点击
        click: true,
        // 监控滚动 0,1 ->不监听 ; 2 ->监听手指滚动 ；3 ->监听惯性 
        probeType: this.probeType
    })

    //  2.监听滚动位置
     this.scroll.on('scroll',(position)=>{
      // console.log(position);
      // 发出时间，参数为position
      this.$emit('scrollOn',position)
    })
   },
   components:{},
   created () {},
   methods: {
    //  time 默认300
     scrollTo(x,y,time=300){
      // scrollTo 回到顶部 参数1 x ; 参数2 y ；参数3 多少毫秒内返回到指定位置，
       this.scroll.scrollTo(x,y,time)
     }
   }
}
</script>

<style scoped>

</style>
