<!-- 导航组件的每一个按钮 -->
<template>
	<div class="tab-bar-item" @click="itemClick">

    <div  v-if="!isActive">
      <slot name = "item-icon"></slot>
    </div>

    <div  v-else>
      <slot name = "item-icon-active"></slot>
    </div>

    <div :style="activeStyle">
      <slot name = "item-text"></slot>
    </div>

	</div>
</template>

<script>
	export default {
		name: 'TabBarItem',
    // 父传子
    props:{
      path:String,
      activeColor: {
        type: String,
        default: "red"
      }
    },
		data(){
			return {
        // isActive: false
			}
		},
    // 计算属性
    computed:{
      isActive(){
        return this.path.indexOf(this.$route.path)!==-1
      },
      activeStyle(){
        return this.isActive?{color: this.activeColor}:{}
      }
    },
		methods:{
      itemClick(){
        this.$router.push(this.path).catch(err=>err)  //实现跳转
      }
		}
	}
</script>

<style scoped>

  .tab-bar-item {
     /* 均等分*/
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }

  .tab-bar-item img{
    width: 24px;
    height: 24px;
    margin-top: 3px;
    /* 去掉图片和文字的空间 */
    vertical-align: middle;
    margin-bottom: 1px;
  }

/*  .active{
   color: lightcyan
  } */

</style>
