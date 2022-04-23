<template>
  <!-- 滚动封装 -->
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
      probeType: {
        type: Number,
        default: 0
      },
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
      this.scroll = new BScroll(this.$refs.wrapper, {
        observeDom: true, 
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })

      //  2.监听滚动位置
      if(this.probeType==2 || this.probeType==3){
        this.scroll.on('scroll', (position) => {
          this.$emit('scrollOn1', position)
        })
      }

      // 3.监听上拉加载事件
      if(this.pullUpLoad){
        this.scroll.on("pullingUp", () => {
          this.$emit('pullingUp1')
        })
      }



      // this.scroll.refresh()
    },
    components: {},
    created() {},
    methods: {
      scrollTo(x, y, time = 300) {
        this.scroll.scrollTo(x, y, time)
        console.log("回到位置：y="+y+"  x="+x);
      },
      //  可再次上拉加载
      finishPullUp() {
        setTimeout(() => {
          this.scroll.finishPullUp()
        }, 1000)
      },
      // 重新计算可滚动的高度（处理网络不好时由于加载图片比较慢，导致滚动不了问题）
      refresh() {
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
