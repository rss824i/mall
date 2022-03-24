<template>
  <!-- 详情轮播图 -->
    <swiper class="detaile-swiper">
      <swiper-item class="swiper-item" v-for="item in topImages">
        <img :src="item">
      </swiper-item>
    </swiper>
</template>

<script>
  import {
    Swiper,
    SwiperItem
  } from 'components/common/swiper/index.js'

  export default {
    name: 'DetailSwiper',
    data() {
      return {}
    },
    props: {
      topImages: {
        type: Array,
        default () {
          return []
        }
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    created() {},
    // mounted () {},
    computed: {},
    watch: {},
    methods: {}
  }
</script>

<style scoped>
  .detaile-swiper {
    height: 300px;
    overflow: hidden;
  }
</style>
