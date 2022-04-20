<template>
  <div class="toast"  v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: 'Toast',
    data() {
      return {
          message:'',
          isShow:false
      }
    },
    props: {
    //   message: {
    //     type: String,
    //     default: ""
    //   },
    //   show: {
    //     type: Boolean,
    //     default: false
    //   }
    },
    components: {},
    created() {},
    // mounted () {},
    computed: {},
    watch: {},
    methods: {
        // duration=1500 默认值1500，可以只传message
        show(message='默认提示',duration=1500){
            //  es6之前默认值写法   
            // duration = duration||1500
            this.isShow=true
            this.message=message

            setTimeout(() => {
                this.isShow=false
                 this.message=''
            }, duration);
        }
    }
  }
</script>

<style scoped>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 8px 10px;
    color: #fff;
    background-color: rgba(0, 0, 0, .75);

    z-index: 99;
  }
</style>
