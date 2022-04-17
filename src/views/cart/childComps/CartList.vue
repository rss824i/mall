<template>
  <div class="cart-list">
    <scroll class="content">
      <cart-list-item v-for="(item,index) in cartList" :key="index" :item-info="item"> </cart-list-item>
    </scroll>
  </div>

</template>

<script>
  import Scroll from '@/components/common/scroll/scroll.vue'
  import CartListItem from './CartListItem.vue'


  // 导入vuex中的getters
  import {
    mapGetters
  } from 'vuex'

  export default {
    name: 'CartList',
    data() {
      return {}
    },
    components: {
      Scroll,
      CartListItem
    },
    created() {},
    // mounted () {},
    computed: {
      ...mapGetters(['cartList'])
    },
    watch: {},
    methods: {}
  }
</script>

<style scoped>
  .cart-list {
    height: calc(100% - 44px - 49px);
  }

  .content {
    height: 100%;
    overflow: hidden;
  }
</style>
