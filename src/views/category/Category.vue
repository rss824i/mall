<template>
  <div class='content1'>
    <div class="content">
      <button @click="btnClick">123</button>
      <div>a--1</div>
      <div>a--2</div>
      <div>a--3</div>
      <div>a--4</div>
      <div>a--5</div>
      <div>a--6</div>
      <div>a--7</div>
      <div>a--8</div>
      <div>a--9</div>
      <div>a--10</div>
      <div>a--11</div>
      <div>a--12</div>
      <div>a--13</div>
      <div>a--14</div>
      <div>a--15</div>
      <div>a--16</div>
      <div>a--17</div>
      <div>a--18</div>
      <div>a--19</div>
      <div>a--20</div>
      <div>a--21</div>
      <div>a--22</div>
      <div>a--23</div>
      <div>a--24</div>
      <div>a--25</div>
      <div>a--26</div>
      <div>a--27</div>
      <div>a--28</div>
      <div>a--29</div>
      <div>a--30</div>
      <div>a--31</div>
      <div>a--32</div>
      <div>a--33</div>
      <div>a--34</div>
      <div>a--35</div>
      <div>a--36</div>
      <div>a--37</div>
      <div>a--38</div>
      <div>a--39</div>
      <div>a--40</div>
      <div>a--41</div>
      <div>a--42</div>
      <div>a--43</div>
      <div>a--44</div>
      <div>a--45</div>
      <div>a--46</div>
      <div>a--47</div>
      <div>a--48</div>
      <div>a--49</div>
      <div>a--50</div>
      <div>a--51</div>
      <div>a--52</div>
      <div>a--53</div>
      <div>a--54</div>
      <div>a--55</div>
      <div>a--56</div>
      <div>a--57</div>
      <div>a--58</div>
      <div>a--59</div>
      <div>a--60</div>
      <div>a--61</div>
      <div>a--62</div>
      <div>a--63</div>
      <div>a--64</div>
      <div>a--65</div>
      <div>a--66</div>
      <div>a--67</div>
      <div>a--68</div>
      <div>a--69</div>
      <div>a--70</div>
      <div>a--71</div>
      <div>a--72</div>
      <div>a--73</div>
      <div>a--74</div>
      <div>a--75</div>
      <div>a--76</div>
      <div>a--77</div>
      <div>a--78</div>
      <div>a--79</div>
      <div>a--80</div>
      <div>a--81</div>
      <div>a--82</div>
      <div>a--83</div>
      <div>a--84</div>
      <div>a--85</div>
      <div>a--86</div>
      <div>a--87</div>
      <div>a--88</div>
      <div>a--89</div>
      <div>a--90</div>
      <div>a--91</div>
      <div>a--92</div>
      <div>a--93</div>
      <div>a--94</div>
      <div>a--95</div>
      <div>a--96</div>
      <div>a--97</div>
      <div>a--98</div>
      <div>a--99</div>
      <div>a--100</div>
    </div>
  </div>

</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Category",
    data(){
      return {
        scroll :null
      }
    },
    // 组件创建完调用
    created() {
      // 由于组件创建完，未挂载完
      // this.bs = new BScroll('.content1', {})
    },
    mounted(){
      this.bs = new BScroll(document.querySelector(".content1"), {
        // 监控滚动位置
        probeType:3,
        // 打开上拉加载
        pullUpLoad: true
      })

      this.bs.on('scroll',(position)=>{
          // 上拉加载位置
          // console.log(position);
      })

      this.bs.on('pullingUp',()=>{
        console.log("上拉加载");
      })
    },
    methods: {
      btnClick(){
        console.log("btnClick");
      }
    }
  }
</script>

<style scoped>
  .content_ {
    height: 150px;
    background-color: red;
    /* 原生局部滚动 */
    /* 超出指定高度部分自动隐藏 */
    /* overflow: hidden; */
    /* 在y轴滚动，设置此属性后，会默认设置上面的这个属性 */
    overflow-y: scroll;
  }

  .content1 {
    height: 150px;
    background-color: rgb(150, 128, 128);

    overflow: hidden;
  }
</style>
