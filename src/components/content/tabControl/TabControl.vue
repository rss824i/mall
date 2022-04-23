<template>
  <div class="tab-control">
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
         font-size: 14px;
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
    }

    .active span{
         border-bottom: 3px solid var(--color-high-text);
    }
</style>
