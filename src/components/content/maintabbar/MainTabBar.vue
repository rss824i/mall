<!-- 封装下方导航的所有功能 -->
<template>
  <div>
    <tab-bar>
      <!--动态传入 path  -->
      <tab-bar-item path="/home" activeColor="#296ff0">
        <img slot="item-icon" src="~assets/img/tabbar/home.svg"/>
        <img slot="item-icon-active" src="~assets/img/tabbar/home_active.svg"/>
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/category" activeColor="#296ff0">
       <img slot="item-icon" src="~assets/img/tabbar/category.svg"/>
       <img slot="item-icon-active" src="~assets/img/tabbar/category_active.svg"/>
       <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item path="/cart" activeColor="#296ff0">
        <img slot="item-icon" src="~assets/img/tabbar/shopcart.svg"/>
        <img slot="item-icon-active" src="~assets/img/tabbar/shopcart_active.svg"/>
        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="/profile" activeColor="#296ff0">
        <img slot="item-icon" src="~assets/img/tabbar/profile.svg"/>
        <img slot="item-icon-active" src="~assets/img/tabbar/profile_active.svg"/>
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
  // 导入组件
  import TabBar from 'components/common/tabbar/TabBar.vue'
  import TabBarItem from 'components/common/tabbar/TabBarItem.vue'
  export default {
    name:"MainTabBar",
    components:{
      // 注册组件
      TabBar,
      TabBarItem
    }
  }
</script>

<style>
 
</style>
