<template>
  <div class='recommend'>
    <div v-for="item in recommends" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HomeRecommendView',
    props: {
      recommends: {
        type: Array,
        default () {
          return []
        }
      }
    },
    data() {
      return {}
    },
    created() {},
    // mounted () {},
    computed: {},
    watch: {},
    methods: {}
  }
</script>

<style scoped>
  .recommend {
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 12px;
    /* 上距离  左右距离  下距离 */
    padding: 10px 0 20px;
    border-bottom: 8px solid #ccc;
  }

  .recommend-item {
    flex: 1;
  }

  .recommend-item img {
    width: 70px;
    height: 70px;
  }
</style>
