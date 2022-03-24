<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles" class="title-item" :class="{active: index==currentIndex}"
          @click="titleClick(index)">
          {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from '@/components/common/navbar/NavBar.vue'

  export default {
    name: '',
    data() {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        //  记录选中的选项
        currentIndex: 0
      }
    },
    components: {
      NavBar
    },
    created() {},
    // mounted () {},
    computed: {},
    watch: {},
    methods: {
      //   导航点击事件
      titleClick(index) {
        this.currentIndex = index
      },
      //    返回按钮点击
      backClick() {
        this.$router.go(-1) //返回方式1
        // this.$router.back() //返回方式2
      }
    }
  }
</script>

<style scoped>
  .title {
    /* 水平分布 */
    display: flex;
    font-size: 14px;
  }

  .title-item {
    /* 均等分 */
    flex: 1;
  }

  .active {
    color: var(--color-high-text);
  }

  .back img {
    margin-top: 10px;
  }
</style>
