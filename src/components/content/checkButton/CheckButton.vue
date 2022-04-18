<template>
  <div class="check-button" :class="{check:isChecked}">
    <img src="@/assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  name: 'CheckButton',
  props: {
    // 是否选中
    isChecked: {
      type: Boolean,
      default: false
    }
  },
  methods: {
  }
}
</script>

<style>
/* 未选中 */
  .check-button {
    border-radius: 50%;
    /* 边框 */
    border: 2px solid #aaa;
  }
  .check-button img {
    display: inline-block;
  }
  /* 选中状态 */
  .check {
    background-color: var(--color-high-text);
    border: 2px solid var(--color-high-text);
  }
</style>