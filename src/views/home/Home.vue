<template>
  <div id='home'>
    <!-- 首页导航 -->
    <nav-bar class="home-nav">
      <div slot="center">Shopping Street</div>
    </nav-bar>
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
      <!-- 轮播图 -->
      <!-- 父传子  动态绑定 将banners动态绑定到子组件的banners上（:子组件属性） -->
      <home-swiper :banners='banners'></home-swiper>
      <!--  推荐 -->
      <home-recommend-view :recommends='recommends'></home-recommend-view>
      <!--  -->
      <feature-view />
      <!-- @tabClick="tabClick" 子传父 -->
      <tab-control :titles="['Fashion','Fangle','Choiceness']" @tabClick="tabClick"></tab-control>
      <goods-list :goodsList="showGoods" />
    </scroll>
    <!-- 监听组件的原生事件时需要添加native才能监听-->
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
        backTopIsShow: false
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
      // 防抖函数
      debounce(func,delay){
        let timer = null
        return function(...args){
          if (timer)   clearTimeout(timer)
          timer = setTimeout(() => {
            func.apply(this,args)
          }, delay);
        }
      },

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
      },
      // 监听bakcTop组件的点击
      backClick(){
        // console.log("组件点击");
        // 可以通过ref拿到组件对象，且可以使用其中的属性、方法等
        // console.log( this.$refs.scrollref.message);

        // 调用scroll回到顶部函数   // this.scroll && =>scroll存在时再执行后面的代码
        this.$refs.scrollref &&  this.$refs.scrollref.scrollTo(0,0,2000)
      },
      contentScroll(position){
        // console.log(position.y);
        this.backTopIsShow=-position.y > 1000
      },
      loadMore(){
        // console.log("上拉加载");
        this.getHomeGoods(this.currentType)
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
          // 可再次上拉加载
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
      // 获取防抖函数
      const refresh = this.debounce(this.$refs.scrollref.refresh,100)
      // 监听item中图片加载完成
      this.$bus.$on('itemImageLoad',()=>{
        // console.log("加载图片 -home"); 
        //  this.$refs.scrollref &&  this.$refs.scrollref.refresh(); //会频繁调用
       refresh()  //执行函数
      })

    }

  }
</script>

<style scoped>
  /* scoped 作用域，css只在当前作用域生效 */
  #home {
    padding-top: 43px;
    height: 100vh;

    /* 相对定位 */
    position: relative;
  }

  /* 设置首页导航栏的背景颜色 */
  .home-nav {
    /* var(--color-tint) 使用变量 --color-tint */
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .tab-control {
    /* tab-control在达到指定位置时固定不动 */
    /* 在正常没达到设定的位置之前 position默认是 sticky  达到设定的位置的时候，会自动改为fixed */
    /* 部分浏览器不支持这个属性，移动端都支持 */
    /* position: sticky; */
    top: 44px;
    z-index: 9;
  }

  .content {
    /* 隐藏多余区域 */
    /* overflow: hidden; */
   /* 绝对定位 */
    position: absolute;
    /* 上部分定位 */
    top: 44px;
    /* 下部分定位 */
    bottom: 49px;
}

  /* .content {
    height: calc(100% -  93);
    margin-top: 44px;
    overflow: hidden;
  } */
</style>
