<template>
  <div id="detail">
    <!-- 导航栏 -->
    <detail-nav-bar />
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue'

export default {
   name: 'Detail',
   data () {
     return {
         iid: null
     }
   },
   components:{
      DetailNavBar
   },
   created () {
       this.iid= this.$route.params.iid
   },
   // mounted () {},
   computed: {},
   watch: {},
   methods: {}
}
</script>

<style scoped>

</style>
