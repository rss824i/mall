<template>
  <div id="detail">
    <!-- 导航栏 -->
    <detail-nav-bar class="detail-nav" ref="nav" @titleClick="titleClick" />
    <scroll class="content" ref="scrollRef" @scrollOn1="contentScroll" :probeType="3">
      <!-- 轮播图 -->
      <detail-swiper :topImages="topImages" />
      <!-- 商品信息 -->
      <detail-base-info :goods="goods" />
      <!-- 商家信息 -->
      <detail-shop-info :shop="shop" />
      <!-- 商品图片信息等 -->
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad" />
      <!-- 尺码参数的信息 -->
      <detail-param-info ref="params" :paramInfo="paramInfo" />
      <!-- 评论信息 -->
      <detail-comment-info ref="comment" :commentInfo="commentInfo" />
      <!-- 推荐数据 -->
      <goods-list ref="recommend" :goodsList="recommends" />
    </scroll>
    <!--回到顶部： 监听组件的原生事件时需要添加native才能监听-->
    <back-top @click.native='backClick' v-show="backTopIsShow"></back-top>
    <!-- 底部功能  客服 店铺 收藏 加入购物车 -->
    <detail-bottom-bar @addToCart="addCart"></detail-bottom-bar>
    <!-- <toast :message="message" :show="show"></toast> -->
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
  import DetailBottomBar from './childComps/DetailBottomBar.vue'



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
  import {
    backTopMixin
  } from '@/common/mixin'
// 类似mapGetters
import { mapActions } from 'vuex'


// import Toast from '@/components/common/toast/Toast'

  export default {
    name: 'Detail',
    mixins: [backTopMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],//保存商品、参数、评论、推荐的位置
        getThemeTopY: null,
        currentIndex: 0,
        // message:'',
        // show:false
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
      GoodsList,
      DetailBottomBar,
      // Toast
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


      })

      // 3.请求推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list
      })

      this.getThemeTopY = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);
      }, 300)
    },
    computed: {},
    watch: {},
    methods: {
      ...mapActions({
        add:"addCart"
      }),
      imageLoad() {
        // 加载商品图片后计算高度
        this.$refs.scrollRef.refresh()
        // 计算navbar中每一项的高度
        this.getThemeTopY()
      },
      titleClick(index) {
        this.$refs.scrollRef.scrollTo(0, -this.themeTopYs[index], 1000)
      },
      // 监听滚动位置
      contentScroll(position) {
        // 1.获取y值
        const positionY = -position.y
        // 2.positionY和主题中的值对比
        let length = this.themeTopYs.length
        for (let i in this.themeTopYs) {
          // 这里i是个String
          i = parseInt(i)
          // this.currentIndex!==i 防止赋值过于频繁
          if (this.currentIndex !== i && ((i < length - 1 &&
                positionY >= this.themeTopYs[i] &&
                positionY < this.themeTopYs[i + 1]) ||
              (i === length - 1 && positionY >= this.themeTopYs[i]))) {
            this.currentIndex = i
            // console.log(this.currentIndex);
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }

        this.backTopIsShow = (positionY) > 1000

      },
      // 监听点击加入购物车
      addCart(){
        // console.log("加入购物车");
        
        // 1.获取购物需要展示的信息
        const product = {}
        product.image = this.topImages[0]; 
        product.title = this.goods.title;
        product.desc =this.goods.desc;
        product.price = this.goods.newPrice;
        product.iid = this.iid;
        product.realPrice = this.goods.realPrice;

         this.add(product).then(res=>{
          this.$toast.show(res,1500)
        }) 

       
      }
    },
    mounted() {
      const refresh = debounce(this.$refs.scrollRef.refresh, 100)
      this.$bus.$on('detailItemImageLoad', () => {
        refresh() //执行函数
      })
    },
    // 数据更新后会执行
    updated() {

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
    height: calc(100% - 44px - 53px);
    overflow: hidden;
  }
</style>
