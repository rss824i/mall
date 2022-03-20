<template>
  <div class='back-top' >
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>
<script>
 export default {
   name: 'BackTop',
   data () {
     return {}
   },
   components:{},
   created () {}
}
</script>

<style scoped>
    .back-top{
        /* 定位 */
        position: fixed;
        /* 右侧距离 */
        right: 10px;
        /* 底部距离 */
        bottom: 50px;
    }

     .back-top img{
         width: 43px;
         height: 43;
     }
</style>
