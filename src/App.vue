<template>
  <div>
    <!-- 显示跳转页面的占位 -->
    <router-view></router-view>
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
