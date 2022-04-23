<template>
  <div class="cart-list">
    <scroll class="content" ref="scrollRef">
      <cart-list-item v-for="(item,index) in cartList" :key="index" :item-info="item"> </cart-list-item>
    </scroll>
  </div>

</template>

<script>
  import Scroll from '@/components/common/scroll/scroll.vue'
  import CartListItem from './CartListItem.vue'


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
    computed: {
      ...mapGetters(['cartList'])
    },
    activated(){
      this.$refs.scrollRef.refresh()
    },
    watch: {},
    methods: {}
  }
</script>

<style scoped>
  .cart-list {
    height: calc(100% - 44px - 49px - 40px);
  }

  .content {
    height: 100%;
    overflow: hidden;
  }
</style>
