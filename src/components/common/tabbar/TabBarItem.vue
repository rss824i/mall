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
      <!-- 如果直接给slot动态绑定class的话，会不生效；因为div会将整个插槽替换掉，没有class属性了,上面也是如此 -->
      <slot name = "item-text"></slot>
    </div>

	</div>
</template>

<script>
	export default {
		name: 'TabBarItem',
    // 父传子
    props:{
      // 使用时传递参数
      path:String,
      activeColor: {
        type: String,
        //默认为红色
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
        // 当前的path是否是处于活跃状态的Path
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
    /*居中*/
    text-align: center;
    /*高度*/
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
