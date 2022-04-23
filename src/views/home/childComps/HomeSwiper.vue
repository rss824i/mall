<template>
  <div>
    <swiper>
      <swiper-item v-for="(item ,index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" @load="imageLoad">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import {
    Swiper,
    SwiperItem
  } from 'components/common/swiper/index.js'

  export default {
    name: '',
    data(){
      return {
        isLoad: false
      }
    },
    props: {
      banners: {
        type: Array,
        default () {
          return []
        }
      }
    },
    created() {},
    // mounted () {},
    computed: {
    },
    components:{
      Swiper,
      SwiperItem
    },
    methods:{
      // 监听图片加载
      imageLoad(){
        // 只需要一张图片加载完成就可以
        if(!this.isLoad){
          this.$emit("swiperImageLoad")
          this.isLoad=true
        }
      }
    }

  }
</script>

<style scoped>

</style>
