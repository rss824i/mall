<template>
  <div class="goods-item">
    <!-- vue 提供监听图片加载完成的方式 @load -->
    <img :src="showImage" alt="" @load="imageLoad"  @click="itemClick">
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
   computed: {
    //  处理推荐和首页中img存放数据位置不一样问题
    showImage(){
      return  this.goodsItem.image || this.goodsItem.show.img
    }
   },
   watch: {},
   methods: {
    //  监听图片是否加载完
     imageLoad(){
      //  console.log("图片加载完成");
      //  方式一：可以使用层层向外发送监听 this.$emit
      //  方式二：可以在vuex中定义一个变量，没加载完一个图更新一次，home页面再监听变量的变化，从而刷新可滚动的高度
      //  方式三：事件总线  发射时间：this.$bus.$emit('aaa')     监听事件：this.$bus.$on('aaa')
     
      //  方式三使用：在main.js中给vue原型添加$bus,bus为vue实例
      //  this.$bus.$emit('itemImageLoad')

      //  问题：在首页使用该组件的是需要发出加载完成的事件，而在推荐页面不需要给首页发送
      // 1.按路由分别发送事件 
        if(this.$route.path.indexOf('/home') !== -1){
          this.$bus.$emit('homeItemImageLoad')
        }else if(this.$route.path.indexOf('/detail') !== -1){
          this.$bus.$emit('detailItemImageLoad')
        } 
      
        // 2.可在home中，当离开home时取消事件的监听
     },
    //  监听点击事件
     itemClick(){
      //  console.log("跳转");
       this.$router.push('/detail/'+this.goodsItem.iid) //push可以返回  动态路由
      //  this.$router.push({
      //    path: 'detail',
      //    query: {
        //参数
      //    }
      //  })
     }
   }
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
