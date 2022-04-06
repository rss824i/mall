<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
  export default {
    name: 'NavBar'
  }
</script>

<style scoped>
    .nav-bar {
        /* flex布局 */
        display: flex;  
        width: 100%;
        height: 44px;
        /* 高度 */
        line-height: 44px;
        text-align: center;
        box-shadow: 0 1px 1px rgba(100, 100,100, .1);
    }

    .left , .right {
        width:  60px;
        /* 测试 */
        /* background-color: rgb(121, 126, 124); */
    }

    .center {
        /* 占据整个剩余宽度*/
        flex: 1; 
        /* 测试 */
        /* background-color: rgb(31, 31, 32);  */

    }
</style>
