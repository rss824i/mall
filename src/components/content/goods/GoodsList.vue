<template>
  <div class="goods">
     <goods-list-item v-for="(item,index) in goodsList" :goods-item="item"  :key="index"/>
  </div>
</template> 

<script>
import GoodsListItem from './GoodsListItem.vue'
 export default {
   name: 'GoodsList',
   props:{
       goodsList:{
           type: Array,
            default(){
                return []
            }
       }
   },
   data () {
     return {}
   },
   components:{
       GoodsListItem
       },
   created () {},
   // mounted () {},
   computed: {},
   watch: {},
   methods: {}
}
</script>

<style scoped>
  .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
</style>
