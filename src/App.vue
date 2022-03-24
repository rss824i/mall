<template>
  <div>
    <!-- 创建后不会被销毁，例如首页切换其他页面后，再次回来还可以停留在原来位置 -->
    <!-- 排除Detail，Detail需要重新创建，否则详情页面永远是第一次加载的数据-->
    <keep-alive exclude="Detail">
      <!-- 显示跳转页面的占位 -->
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar />
  </div>
</template>

<script>
  import MainTabBar from 'components/content/maintabbar/MainTabBar.vue'
  export default {
    name: "App",
    components: {
      MainTabBar
    },
  };
</script>

<style>
  @import "assets/css/base.css";
</style>
