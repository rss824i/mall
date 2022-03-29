<template>
  <div id='home'>
    <!-- 首页导航 -->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
      <!-- 分类：  @tabClick="tabClick" 子传父 -->
      <tab-control :titles="['流行','新款','精选']" 
                            @tabClick="tabClick"
                             ref="tabControl1" class="tab-control" v-show="isTabFixed"/>
    <!-- 滚动 -->
    <!-- 
      ref 如果绑定在组件的，通过this.$refs.值 获取的是一个组件对象
      如果绑定到普通元素上，获取的是元素对象
    -->
    <!--  @scrollOn="contentScroll"  使用contentScroll监听子组件发出的事件scrollOn -->
    <scroll class="content" ref="scrollref"  
        :probe-type="3"  
        @scrollOn1="contentScroll"
        :pull-up-load="true"
        @pullingUp1="loadMore">
      <!-- 轮播图 ：-->
      <!-- 父传子  动态绑定 将banners动态绑定到子组件的banners上（:子组件属性） -->
      <home-swiper :banners='banners' @swiperImageLoad="swiperImageLoad"></home-swiper>
      <!--  推荐： -->
      <home-recommend-view :recommends='recommends'></home-recommend-view>
      <!--  -->
      <feature-view />
      <!-- 分类：  @tabClick="tabClick" 子传父 -->
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
  import BackTop from 'components/content/backTop/BackTop'

  import HomeSwiper from 'views/home/childComps/HomeSwiper.vue'
  import HomeRecommendView from 'views/home/childComps/HomeRecommendView'
  import FeatureView from 'views/home/childComps/FeatureView'
  import GoodsList from '@/components/content/goods/GoodsList'

  import {
    getHomeMutidate,
    getHomeGoods
  } from '@/network/home'
  import {debounce} from '@/common/utils'

  export default {
    name: "Home",
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
        saveY:0
      }
    },
    components: {
      // 注册组件
      NavBar,
      TabControl,
      HomeSwiper,
      HomeRecommendView,
      FeatureView,
      GoodsList,
      Scroll,
      BackTop
    },
    // 组件创建完成后请求数据
    created() {
      // 1.请求多个数据,由于方法名一样，不加this调用的是home.js中的方法
      this.getHomeMutidate()
      // 2.请求商品数据
      this.getHomeGoods("pop")
      this.getHomeGoods("new")
      this.getHomeGoods("sell")
    },
    methods: {
      /*
       * 事件监听
       */
      // 获取子组件tab-control传回的值（子传父）
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
      // 监听回到顶部（bakcTop）组件的点击
      backClick(){
        // console.log("组件点击");
        // 可以通过ref拿到组件对象，且可以使用其中的属性、方法等
        // console.log( this.$refs.scrollref.message);

        // 调用scroll回到顶部函数  在2000毫秒内 // this.scroll && =>scroll存在时再执行后面的代码
        this.$refs.scrollref &&  this.$refs.scrollref.scrollTo(0,0,2000)
      },
      contentScroll(position){
        // 回到顶部是否显示： 滚动位置大于1000时显示
        // console.log(position.y);
        this.backTopIsShow=(-position.y) > 1000

        // 隐藏的tabControl是否显示 （position: fixed）：
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore(){
        // console.log("上拉加载");
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad(){
        // 图片加载完成 获取tabControl2的tabOffsetTop 
        // 所有的组件都有一个属性$el，这个属性是获取组件的元素的
        this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop
        // console.log(this.$refs.tabControl2.$el.offsetTop);
      },

      /* 
       * 网络请求
       */
      // 获取banner和recommend数据
      getHomeMutidate() {
        getHomeMutidate().then(res => {
          // console.log(res);
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      // 获取指定类型数据
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          // console.log(res);
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
          // 完成上拉加载  并可再次上拉加载
           this.$refs.scrollref && this.$refs.scrollref.finishPullUp()
        })

      }
    },
    // 初始化的时候执行和相关的data发生变化后执行
    computed: {
      // 当currentType（goods所显示的数据类型）变化时传入对应的数据
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    mounted(){
      // 1. 图片加载完成的时间监听（使用了防抖函数）
      const refresh = debounce(this.$refs.scrollref.refresh,100)
      // 监听goods  item中图片加载完成
      this.$bus.$on('itemImageLoad',()=>{
        // console.log("加载图片 -home"); 
        //  this.$refs.scrollref &&  this.$refs.scrollref.refresh(); //会频繁调用
        refresh()  //执行函数
      })

    
    },
    // 页面销毁调用函数
    destroyed(){
      console.log("home销毁");
    },
    // 进入活跃时执行  activated/deactivated => 钩子函数
    activated(){
      this.$refs.scrollref.scrollTo(0,this.saveY,0)
      // 重新计算一次高度，处理切换回来不能滚动问题
      this.$refs.scrollref.refresh()
      console.log("回到位置：",this.saveY);
    },
    // 进入不活跃时执行
    deactivated(){
      this.saveY=this.$refs.scrollref.getScrollY()
      console.log("记录位置：",this.saveY);
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
    /* var(--color-tint) 使用变量 --color-tint */
    background-color: var(--color-tint);
    color: #fff;

    /* 在使用浏览器原生滚动时，为了使导航不一起滚动 */
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }

  .content {
    /* 隐藏多余区域 （超出指定高度区域都不显示）*/
    overflow: hidden;
   /* 绝对定位 */
    position: absolute;
    /* 上部分定位 */
    top: 44px;
    /* 下部分定位 */
    bottom: 49px;
  }
  .tab-control {
    position: relative;
    z-index: 9;
  }
  /* .content {
    height: calc(100% -  93);
    margin-top: 44px;
    overflow: hidden;
  } */
</style>
