<template>
  <div class='content1'>
    <div id='d1'>
      <!-- <input type="button" value="stop" @click="stop"> -->
      <button @click="start">开始哟</button>
    </div>
    <!-- <p style="width:200px;overflow: hidden;height:20px">{{msg}}</p> -->
    <p>{{shouMsg}}</p>
  </div>

</template>

<script>
  export default {
    name: "Category",
    data: function () {
      return {
        msg: "宝，今天我被厂长骂了。他说我拌的水泥太稀了。可他不知道的是，我没有多拌水，只是拌水泥的时候很想你啊，宝，眼泪掉进了水泥里。",
        intervalId: null,
        shouMsg: "",
        timer: null
      }
    },
    methods: {
      start() {
        if (this.shouMsg.length === 0 || this.shouMsg.length === this.msg.length) {``
          var i = 0;
          i = i * 1;
          //在mounted 声明周期中创建定时器
          this.timer = setInterval(() => {
            // 这里调用调用需要执行的方法，1为自定义的参数，由于特殊的需求它将用来区分，定时器调用和手工调用，然后执行不同的业务逻辑
            this.shouMsg = this.msg.substring(0, i)
            i++
            if (i === this.msg.length + 1) {
              clearInterval(this.timer);
              this.timer = null;
            }
            console.log(this.shouMsg);
          }, 200) // 每两秒执行1次
        }
      },
      stop() {
        clearInterval(this.timer);
        this.timer = null;
      }
    },

  }
</script>

<style scoped>
  p {
    font-style: italic;
    font-weight: bold;
    text-shadow: 5px 2px 5px rgb(109, 107, 107);
    margin: 10px;
    text-indent: 2em;
  }

  #d1 {
    text-align: center;
  }

  button {
    background-color: rgb(38, 131, 238);
    width: 85px;
    height: 35px;
    font-size: 20px;
    color: white;
    /* font-weight:bold; */
    border-radius: 10px;
  }
</style>
