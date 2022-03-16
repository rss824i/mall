<template>
  <div id='home'>
    <!-- 首页导航 -->
    <nav-bar class="home-nav">
      <div slot="center">Shopping Street</div>
    </nav-bar>
    <!-- 轮播图 -->
    <!-- 父传子  动态绑定 将banners绑定到子组件的banners上 -->
    <home-swiper :banners='banners'></home-swiper>
    <!--  -->
    <home-recommend-view :recommends='recommends'></home-recommend-view>
    <!--  -->
    <feature-view/>
    <tab-control :titles="['Fashion','Fangle','Choiceness']"></tab-control>
    <ui>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
    </ui>
  </div>

</template>

<script>
  import NavBar from 'components/common/navbar/NavBar.vue'
  import TabControl from '@/components/content/tabControl/TabControl.vue'

  import HomeSwiper from 'views/home/childComps/HomeSwiper.vue'
  import HomeRecommendView from 'views/home/childComps/HomeRecommendView'
  import FeatureView from 'views/home/childComps/FeatureView'

  import {
    getHomeMutidate
  } from '@/network/home'


  export default {
    name: "Home",
    data() {
      return {
        banners: [],
        recommends: [],
        // titles: ['1', '2', '3']
      }
    },
    components: {
      // 注册组件
      NavBar,
      TabControl,
      HomeSwiper,
      HomeRecommendView,
      FeatureView,
    },
    // 组件创建完成后请求数据
    created() {
      getHomeMutidate().then(res => {
        console.log(res.result);
        this.banners = res.result.banner.list
        this.recommends = res.result.recommend.list
      })
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

  .tab-control{
    /* 在正常没达到设定的位置之前 position默认是 sticky  达到设定的位置的时候，会自动改为fixed */
    /* 部分浏览器不支持这个属性，移动端都支持 */
    position:  sticky;
    top: 44px;
  }
</style>
