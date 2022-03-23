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
    props: {
      // 监听类型
      probeType: {
        type: Number,
        default: 0
      },
      // 是否上拉加载
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null,
        message: 'TestMessage',
      }
    },
    // 在初始化页面完成后调用
    mounted() {
      // 1.创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        observeDom: true, 
        // 设置内容可以点击
        click: true,
        // 监控滚动 0,1 ->不监听 ; 2 ->监听手指滚动 ；3 ->只要是滚动 都侦测（监听惯性）  
        probeType: this.probeType,
        // 是否开始上拉加载
        pullUpLoad: this.pullUpLoad
      })

      //  2.监听滚动位置
      if(this.probeType==2 || this.probeType==3){
        this.scroll.on('scroll', (position) => {
          // console.log(position);
          // 发出事件，参数为position；外部可监听此事件
          this.$emit('scrollOn1', position)
        })
      }

      // 3.监听上拉加载事件
      if(this.pullUpLoad){
        this.scroll.on("pullingUp", () => {
          // console.log("上拉加载");
          this.$emit('pullingUp1')
        })
      }



      this.scroll.refresh()
    },
    components: {},
    created() {},
    methods: {
      //回到顶部  time 默认300=>当前位置到顶部的滚动时间
      scrollTo(x, y, time = 300) {
        // scrollTo 回到顶部 参数1 x ; 参数2 y ；参数3 多少毫秒内返回到指定位置，
        this.scroll.scrollTo(x, y, time)
      },
      //  可再次上拉加载
      finishPullUp() {
        //延迟一秒才能再次上拉加载  
        setTimeout(() => {
          //调用scroll的这个方法才能实现再一次上拉加载，否则再次上拉不生效
          this.scroll.finishPullUp()
        }, 1000)
      },
      // 重新计算可滚动的高度（处理网络不好时由于加载图片比较慢，导致滚动不了问题）
      refresh() {
        // console.log("计算高度");
        this.scroll.refresh()
      },
      // 获取当前滚动位置
      getScrollY(){
        return this.scroll.y ? this.scroll.y : 0
      }

    }
  }
</script>

<style scoped>

</style>
