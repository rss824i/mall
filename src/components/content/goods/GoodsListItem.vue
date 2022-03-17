<template>
  <div class="goods-item">
    <img :src="goodsItem.show.img" alt="">
     <div class="goods-info">
       <p>{{goodsItem.title}}</p>
       <span class="price">{{goodsItem.price}}</span>
       <span class="collect">{{goodsItem.cfav}}</span>
     </div>
  </div>
</template>

<script>
 export default {
   name: 'GoodsListItem',
   props:{
      goodsItem:{
        type:Object,
        default(){
          return {}
        }
      }
   },
   data () {
     return {}
   },
   components:{},
   created () {},
   // mounted () {},
   computed: {},
   watch: {},
   methods: {}
}
</script>

<style scoped>
 .goods-item {
    position: relative; /*相对定位*/
    padding-bottom: 40px;
    width: 47%;
    
  }
  .goods-item img {
    width: 100%;
    height: 100%;
    border-radius: 5px; /*圆角*/
  }
  .goods-info {
    /* 定位 */
    position: absolute; /*绝对定位*/
    bottom: 5px;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 12px;
  }
  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }
  .goods-info .price {
    color: var(--color-high-text);
    padding-right: 20px;
  }
  .goods-info .collect {
    position: relative;
  }
  .goods-info .collect::before { /*伪元素*/
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url(../../../assets/img/common/collect.svg) 0 0/14px 14px;
  }

</style>
