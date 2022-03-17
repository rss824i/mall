<template>
  <div class="goods">
     <goods-list-item v-for="item in goods" :goods-item="item"/>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem.vue'
 export default {
   name: 'GoodsList',
   props:{
       goods:{
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
