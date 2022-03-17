<template>
  <div id='home'>
    <!-- 首页导航 -->
    <nav-bar class="home-nav">
      <div slot="center">Shopping Street</div>
    </nav-bar>
    <!-- 轮播图 -->
    <!-- 父传子  动态绑定 将banners动态绑定到子组件的banners上（:子组件属性） -->
    <home-swiper :banners='banners'></home-swiper>
    <!--  -->
    <home-recommend-view :recommends='recommends'></home-recommend-view>
    <!--  -->
    <feature-view />
    <tab-control :titles="['Fashion','Fangle','Choiceness']"></tab-control>
    <goods-list :goods="goods['pop'].list"></goods-list>
  </div>

</template>

<script>
  import NavBar from 'components/common/navbar/NavBar.vue'
  import TabControl from '@/components/content/tabControl/TabControl.vue'

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
        }
      }
    },
    components: {
      // 注册组件
      NavBar,
      TabControl,
      HomeSwiper,
      HomeRecommendView,
      FeatureView,
      GoodsList
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
      getHomeMutidate() {
        getHomeMutidate().then(res => {
          console.log(res);
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page+1
        getHomeGoods(type, page).then(res => {
          console.log(res);
          this.goods[type].list.push(...res.data.list)
         this.goods[type].page += 1
        })
      }
    }
  }
</script>

<style scoped>
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
    /* 在正常没达到设定的位置之前 position默认是 sticky  达到设定的位置的时候，会自动改为fixed */
    /* 部分浏览器不支持这个属性，移动端都支持 */
    position: sticky;
    top: 44px;
    z-index: 9;
  }
</style>
