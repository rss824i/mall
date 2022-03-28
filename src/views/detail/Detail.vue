<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" />
    <scroll class="content" ref="scrollRef">
      <!-- 导航栏 -->
      <!-- 轮播图 -->
      <detail-swiper :topImages="topImages" />
      <!-- 商品信息 -->
      <detail-base-info :goods="goods" />
      <!-- 商家信息 -->
      <detail-shop-info :shop="shop" />
      <!-- 商品图片信息等 -->
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"/>
      <!-- 尺码参数的信息 -->
      <detail-param-info :paramInfo="paramInfo"/>
    </scroll>
  </div>
</template>

<script>
  import Scroll from '@/components/common/scroll/scroll.vue'

  import DetailNavBar from './childComps/DetailNavBar.vue'
  import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
  import DetailShopInfo from './childComps/DetailShopInfo.vue'
  import DetailSwiper from './childComps/DetailSwiper.vue'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
  import DetailParamInfo from './childComps/DetailParamInfo.vue'

  import {
    getDetail,
    Goods,
    Shop,
    GoodsParam
  } from '@/network/detail'


  export default {
    name: 'Detail',
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo:{},
        paramInfo:{}
      }
    },
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo
    },
    created() {
      //  1.保存传入的iid
      this.iid = this.$route.params.iid

      //  2.根据iid查询详情数据
      getDetail(this.iid).then(res => {
        const data = res.result;
        //① 获取顶部图片（轮播图）
        this.topImages = data.itemInfo.topImages;
        //② 获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        //③ 商家信息（店铺）
        this.shop = new Shop(data.shopInfo)
        //④ 获取商品图片信息等
        this.detailInfo=data.detailInfo
        //⑤ 获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

        console.log(this.shop);
      })

    },
    // mounted () {},
    computed: {},
    watch: {},
    methods: {
      imageLoad(){
          this.$refs.scrollRef.refresh()
      }
    }
  }
</script>

<style scoped>
  #detail {
    /* 相对定位 */
    position: relative;
    background-color: #fff;
    height: 100vh;
    z-index: 9;
  }

  .detail-nav {
    position: relative;
    background-color: #fff;
    z-index: 9;
  }

  .content {
    /* 计算高度 */
    height: calc(100% - 44px);
    overflow: hidden;
  }


</style>
