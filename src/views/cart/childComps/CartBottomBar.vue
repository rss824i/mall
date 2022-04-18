<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" />
      <span>全选</span>
    </div>
    <div class="price">
      合计：{{totalPrice}}
    </div>
    <div class="calculate">
      去结算({{checkLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from '@/components/content/checkButton/CheckButton.vue'
  import {
    mapGetters
  } from 'vuex'

  export default {
    name: 'CartBottomBar',
    data() {
      return {}
    },
    components: {
      CheckButton
    },
    created() {},
    // mounted () {},
    computed: {
      ...mapGetters(['cartList']), //下面就可以直接用cartList
      totalPrice() {
        //  return this.$store.getters.cartList  //可从getters中取
        //  return this.$store.state.cartList //也可以从state中取
        return "￥" + this.$store.state.cartList.filter(item => { //遍历
          return item.checked
        }).reduce((preValue, item) => { //汇总
          return preValue + item.realPrice * item.count //preValue 前一次的值
        }, 0).toFixed(2) //保留两位小数
      },
      checkLength() {
        // return  this.$store.getters.cartList.filter(item => item.checked).length
        return this.cartList.filter(item => item.checked).length
      }
    },
    watch: {},
    methods: {}
  }
</script>

<style scoped>
  .bottom-bar {
    height: 40px;
    background-color: #eee;
    position: relative;
    line-height: 40px;
    display: flex;

  }

  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
  }

  .check-button {
    width: 21px;
    height: 21px;
    line-height: 21px;
    margin-right: 5px;

  }

  .price {
    margin-left: 30px;
    flex: 1;
  }

  .calculate {
    width: 90px;
    background-color: rgb(15, 99, 224);
    color: #fff;
    text-align: center;
  }
</style>
