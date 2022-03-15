<!-- 下面整个导航组件 -->
<template>
  <div>
    <div id="tab-bar">
      <!-- 槽插 -->
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TabBar',
    data() {
      return {

      }
    },
    methods: {

    }
  }
</script>

<style scoped>
  #tab-bar {
    /*水平分布*/
    display: flex;
    /*背景颜色*/
    background-color: #f6f6f6;

    position: fixed;
    /*居下*/
    left: 0;
    right: 0;
    bottom: 0;

    /* tab-bar上方阴影 */
    box-shadow: 0 -1px 1px rgba(100, 100, 100, 0.3);
  }


</style>
