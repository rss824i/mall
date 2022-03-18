<template>
  <div id='home'>
    <!-- 首页导航 -->
    <nav-bar class="home-nav">
      <div slot="center">Shopping Street</div>
    </nav-bar>

    <scroll class="content">

      <!-- 轮播图 -->
      <!-- 父传子  动态绑定 将banners动态绑定到子组件的banners上（:子组件属性） -->
      <home-swiper :banners='banners'></home-swiper>
      <!--  推荐 -->
      <home-recommend-view :recommends='recommends'></home-recommend-view>
      <!--  -->
      <feature-view />
      <!-- @tabClick="tabClick" 子传父 -->
      <tab-control :titles="['Fashion','Fangle','Choiceness']" @tabClick="tabClick"></tab-control>
      <goods-list :goods="showGoods" />

    </scroll>

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
        currentType: "pop"
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
      Scroll
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
      /* 
       * 网络请求
       */
      getHomeMutidate() {
        getHomeMutidate().then(res => {
          // console.log(res);
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          console.log(res);
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
        })
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    mounted(){
      
    }
  }
</script>

<style scoped>
  /* scoped 作用域，css只在当前作用域生效 */
  #home {
    padding-top: 43px;
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
    height: calc(100% - 98px);
    background-color: rgb(46, 49, 202);

    /* overflow: hidden; */
  }
</style>
