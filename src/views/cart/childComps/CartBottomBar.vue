<template>
  <div class="bottom-bar">
    <div class="check-content">
      <!-- native 监听组件 -->
      <check-button class="check-button" :is-checked="isSelectAll" @click.native="checkClick"/> 
      <span>全选</span>
    </div>
    <div class="price">
      合计：{{totalPrice}}
    </div>
    <div class="calculate" @click="calcClick">
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
      ...mapGetters(['cartList']), 
      totalPrice() {
        return "￥" + this.$store.state.cartList.filter(item => {  
          return item.checked
        }).reduce((preValue, item) => {  
          return preValue + item.realPrice * item.count 
        }, 0).toFixed(2)  
      },
      // 选中的商品数量
      checkLength() {
        return this.cartList.filter(item => item.checked).length
      },
      // 选中按钮是否为选中状态（全选）
      isSelectAll(){
       return this.cartList.length===0?false:!this.cartList.find(item=>!item.checked)//查找到一个为不选中的状态为止 //find 查找到匹配的值就直接返回
      }
    },
    watch: {},
    methods: {
      checkClick(){
        if(this.isSelectAll){  
          this.cartList.forEach(item => item.checked=false);
        }else{
           this.cartList.forEach(item => item.checked=true);
        }

      },
      calcClick(){
        if(this.cartList.length===0){
          this.$toast.show('什么也没有噢')
          return
        }
        if(this.checkLength===0){
          this.$toast.show('请选择结算商品',2000)
        }else{
          this.$toast.show('结算功能待开发~~')
        }
      }
    }
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
