<template>
  <div class='content1'>
    <div id='d1'>
      <button @click="start">开始哟</button>
    </div>
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
          this.timer = setInterval(() => {
            this.shouMsg = this.msg.substring(0, i)
            i++
            if (i === this.msg.length + 1) {
              clearInterval(this.timer);
              this.timer = null;
            }
            console.log(this.shouMsg);
          }, 200) 
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
