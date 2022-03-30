<template>
  <div id="detail">
      <!-- 导航栏 -->
    <detail-nav-bar class="detail-nav" />
    <scroll class="content" ref="scrollRef">
      <!-- 轮播图 -->
      <detail-swiper :topImages="topImages" />
      <!-- 商品信息 -->
      <detail-base-info :goods="goods" />
      <!-- 商家信息 -->
      <detail-shop-info :shop="shop" />
      <!-- 商品图片信息等 -->
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad" />
      <!-- 尺码参数的信息 -->
      <detail-param-info :paramInfo="paramInfo" />
      <!-- 评论信息 -->
      <detail-comment-info :commentInfo="commentInfo" />
      <!-- 推荐数据 -->
      <goods-list :goodsList="recommends" />
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
  import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
  import GoodsList from '@/components/content/goods/GoodsList.vue'

  import {
    getDetail,
    Goods,
    Shop,
    GoodsParam,
    getRecommend
  } from '@/network/detail'
  import {
    debounce
  } from '@/common/utils'


  export default {
    name: 'Detail',
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: []
      }
    },
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList
    },
    created() {
      //  1.保存传入的iid
      this.iid = this.$route.params.iid

      //  2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        const data = res.result;
        //① 获取顶部图片（轮播图）
        this.topImages = data.itemInfo.topImages
        //② 获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        //③ 商家信息（店铺）
        this.shop = new Shop(data.shopInfo)
        //④ 获取商品图片信息等
        this.detailInfo = data.detailInfo
        //⑤ 获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        //⑥ 获取评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0];
        }
        // console.log(this.commentInfo);
      })

      // 3.请求推荐数据
      getRecommend().then(res => {
        console.log(res);
        this.recommends = res.data.list
      })
    },
    computed: {},
    watch: {},
    methods: {
      imageLoad() {
        this.$refs.scrollRef.refresh()
      }
    },
    mounted() {
      const refresh = debounce(this.$refs.scrollRef.refresh, 100)
      // 监听goods  item中图片加载完成
      this.$bus.$on('detailItemImageLoad', () => {
        // console.log("加载图片 -detail"); 
        refresh() //执行函数
      })
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
