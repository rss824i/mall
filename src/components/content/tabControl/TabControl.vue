<template>
  <div class="tab-control">
      <!-- 当currentIndex（选中）等于index的时候 添加active属性 -->
    <div v-for="(item,index) in titles" 
        class="tab-control-item" :class="{active: index==currentIndex}" 
        @click="itemClick(index)">
        <span>{{item}}</span>
    </div>
  </div>
</template>

<script>

 export default {
   name: 'TabControl',
   data () {
     return {
         currentIndex: 0
     }
   },
//    父传子
   props:{
       titles:{
           type:Array,
           default(){
               return []
           }
       }
   },
   components:{},
   created () {},
   // mounted () {},
   computed: {},
   watch: {},
   methods: {
       itemClick(index){
           this.currentIndex=index;
           // 子传父
           this.$emit('tabClick',index)
       }
   }
}
</script>

<style scoped>
    .tab-control{
        /* 水平布局 */
         display: flex;
         /* 文字居中 */
         text-align: center;
         font-size: 15px;
         height: 40px;
         line-height: 40px;
         background-color: #fff;
    }

    .tab-control-item{
        /* 平分布局 */
        flex:1;
    }

    .tab-control-item span{
        padding: 5px;
    }

    .active{
        color: var(--color-high-text);
        /* 这里添加的是给div添加，会使整个div都为有横杠 */
        /* border-bottom: 3px solid var(--color-high-text); */
    }

    .active span{
         border-bottom: 3px solid var(--color-high-text);
    }
</style>
