<template>
  <div id='cart'>
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车（{{length}}）</div>
    </nav-bar>

    <!-- 商品列表 -->
    <cart-list />

    <!-- 底部汇总 -->
  <cart-bottom-bar></cart-bottom-bar>
    
  </div>
</template>

<script>
  import NavBar from '@/components/common/navbar/NavBar.vue'
  import CartList from './childComps/CartList.vue'
  import CartBottomBar from './childComps/CartBottomBar.vue'
  // 导入vuex中的getters
  import {
    mapGetters
  } from 'vuex'

  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    // 计算属性
    computed: {
      ...mapGetters({
        length: 'cartLength',
      })
    }
  }
</script>

<style scoped>
  #cart {
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
