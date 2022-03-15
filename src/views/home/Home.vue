<template>
  <div id='home'>
    <p>{{result.code}}</p>
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <!-- <h3>This is Home page. </h3> -->
  </div>

</template>

<script>
  import NavBar from 'components/common/navbar/NavBar.vue'
  import {
    getHomeMutidate
  } from '@/network/home'

  export default {
    name: "Home",
    data() {
      return {
        result: {}
      }
    },
    components: {
      // 注册组件
      NavBar
    },
    // 组件创建完成后请求数据
    created() {
      getHomeMutidate().then(res => {
        console.log(res);
        this.result = res
      })
    }
  }
</script>

<style scoped>
  /* 设置首页导航栏的背景颜色 */
  .home-nav {
    /* var(--color-tint) 使用变量 --color-tint */
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
