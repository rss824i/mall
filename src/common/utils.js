// 工具
   
// 防抖函数
export function  debounce(func,delay){
  let timer = null
  return function(...args){
    if (timer)   clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this,args)
    }, delay);
  }
}

/*  
正则表达式是做什么的? 
  是一个字符串匹配利器
*/


// 时间戳转化
export function formatDate(date, fmt) {
  // 1.获取年份
  // y+  => 表示一个或多个y
  // y*  => 表示零个或多个y
  // y?  => 表示零个或多一个y

  // RegExp.$1 匹配到的字符串
  if(/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  // 2.获取
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}

// 不足补齐两位 4：4 =》 04：04
function padLeftZero (str) {
  return ('00' + str).substr(str.length);
}