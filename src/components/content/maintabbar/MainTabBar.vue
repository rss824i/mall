<!-- 封装下方导航的所有功能 -->
<template>
  <div>
    <tab-bar>
      <template #default>
        <tab-bar-item path="/home">
          <template #item-icon>
            <img src="@/assets/img/tabbar/home.svg" />
          </template>
          <template #item-icon-active>
            <img src="@/assets/img/tabbar/home_active.svg" />
          </template>
          <template #item-text>
            <div>首页</div>
          </template>
        </tab-bar-item>
        <tab-bar-item path="/category">
          <template #item-icon>
            <img src="@/assets/img/tabbar/category.svg" />
          </template>
          <template #item-icon-active>
            <img src="@/assets/img/tabbar/category_active.svg" />
          </template>
          <template #item-text>
            <div>分类</div>
          </template>
        </tab-bar-item>
        <tab-bar-item path="/shopcart">
          <template #item-icon>
            <img src="@/assets/img/tabbar/shopcart.svg" />
          </template>
          <template #item-icon-active>
            <img src="@/assets/img/tabbar/shopcart_active.svg" />
          </template>
          <template #item-text>
            <div>购物车</div>
          </template>
        </tab-bar-item>
        <tab-bar-item path="/profile">
          <template #item-icon>
            <img src="@/assets/img/tabbar/profile.svg" />
          </template>
          <template #item-icon-active>
            <img src="@/assets/img/tabbar/profile_active.svg" />
          </template>
          <template #item-text>
            <div>我的</div>
          </template>
        </tab-bar-item>
      </template>
    </tab-bar>
  </div>
</template>

<script>
  // 导入组件
  import TabBar from 'components/common/tabbar/TabBar.vue'
  import TabBarItem from 'components/common/tabbar/TabBarItem.vue'
  export default {
    name: "MainTabBar",
    components: {
      // 注册组件
      TabBar,
      TabBarItem
    }
  }
</script>

<style>

</style>
