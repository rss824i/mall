<template>
  <div id='home'>
    <!-- 首页导航 -->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
      <tab-control :titles="['流行','新款','精选']" 
                            @tabClick="tabClick"
                             ref="tabControl1" class="tab-control" v-show="isTabFixed"/>
    <!-- 滚动 -->
    <scroll class="content" ref="scrollref"  
        :probe-type="3"  
        @scrollOn1="contentScroll"
        :pull-up-load="true"
        @pullingUp1="loadMore">
      <!-- 轮播图 ：-->
      <home-swiper :banners='banners' @swiperImageLoad="swiperImageLoad"></home-swiper>
      <!--  推荐： -->
      <home-recommend-view :recommends='recommends'></home-recommend-view>
      <!--  -->
      <feature-view />
      <!-- 分类： -->
      <tab-control :titles="['流行','新款','精选']" 
                            @tabClick="tabClick"
                             ref="tabControl2" />
      <goods-list :goodsList="showGoods" />
    </scroll>
    <!--回到顶部： 监听组件的原生事件时需要添加native才能监听-->
    <back-top @click.native='backClick'  v-show="backTopIsShow"></back-top>

  </div>

</template>

<script>
  import NavBar from 'components/common/navbar/NavBar.vue'
  import TabControl from '@/components/content/tabControl/TabControl.vue'
  import Scroll from 'components/common/scroll/scroll'

  import HomeSwiper from 'views/home/childComps/HomeSwiper.vue'
  import HomeRecommendView from 'views/home/childComps/HomeRecommendView'
  import FeatureView from 'views/home/childComps/FeatureView'
  import GoodsList from '@/components/content/goods/GoodsList'

  import {
    getHomeMutidate,
    getHomeGoods
  } from '@/network/home'
  import {debounce} from '@/common/utils'
  import {mixinTest,backTopMixin} from '@/common/mixin'

  export default {
    name: "Home",
    mixins: [mixinTest,backTopMixin],
    data() {
      return {
        banners: [],
        recommends: [],
        // titles: ['1', '2', '3']
        goods: {
          "pop": {
            page: 0, //已加载到多少页
            list: []
          },
          "new": {
            page: 0,
            list: []
          },
          "sell": {
            page: 0,
            list: []
          },
        },
        currentType: "pop",
        // 回到顶部是否显示
        backTopIsShow: false,
        // 存分类的位置 tab-control 
        tabOffsetTop: 0,
        // tab-control是否吸顶
        isTabFixed: false,
        // 保存离开页面时候的位置
        saveY:0,
      }
    },
    components: {
      NavBar,
      TabControl,
      HomeSwiper,
      HomeRecommendView,
      FeatureView,
      GoodsList,
      Scroll,
    },
  
    created() {
      this.getHomeMutidate()
      this.getHomeGoods("pop")
      this.getHomeGoods("new")
      this.getHomeGoods("sell")
    },
    methods: {
      /*
       * 事件监听
       */
      tabClick(index) {
        //  console.log(index);
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        // 保持两个tabControl的选中项一致
        this.$refs.tabControl1.currentIndex=index
        this.$refs.tabControl2.currentIndex=index
      },
      /*
      // 使用混入完成以下部分
      // 监听回到顶部（bakcTop）组件的点击
      backClick(){
        // console.log("组件点击");
        // 可以通过ref拿到组件对象，且可以使用其中的属性、方法等
        // console.log( this.$refs.scrollref.message);

        // 调用scroll回到顶部函数  在2000毫秒内 // this.scroll && =>scroll存在时再执行后面的代码
        this.$refs.scrollref &&  this.$refs.scrollref.scrollTo(0,0,2000)
      },*/
      contentScroll(position){
        this.backTopIsShow=(-position.y) > 1000

        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore(){
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad(){
        this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop
      },

      /* 
       * 网络请求
       */
      getHomeMutidate() {
        getHomeMutidate().then(res => {
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      // 获取指定类型数据
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
           this.$refs.scrollref && this.$refs.scrollref.finishPullUp()
        })

      }
    },
    // 初始化的时候执行和相关的data发生变化后执行
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    mounted(){
      // 1. 图片加载完成的时间监听（使用了防抖函数）
      const refresh = debounce(this.$refs.scrollref.refresh,100)
      this.$bus.$on('homeItemImageLoad',()=>{
        refresh()  //执行函数
      })

    
    },
    // 页面销毁调用函数
    destroyed(){
      console.log("home销毁");
    },
    activated(){
      this.$refs.scrollref.scrollTo(0,this.saveY,0)
      this.$refs.scrollref.refresh()
    },
    // 进入不活跃时执行
    deactivated(){
      this.saveY=this.$refs.scrollref.getScrollY()
    },

  }
</script>

<style scoped>
  /* scoped 作用域，css只在当前作用域生效 */
  #home {
    /* padding-top: 43px; */
    height: 100vh;

    /* 相对定位 */
    position: relative;
  }

  /* 设置首页导航栏的背景颜色 */
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
  }
  .tab-control {
    position: relative;
    z-index: 9;
  }
</style>
