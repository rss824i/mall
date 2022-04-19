// 导入常量，mutations方法名常量
import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutations-types'

export default {
  // 新增至购物车
  addCart(context, panyload) {
   /*
   需要让调用者知道是当前的操作，可以用Promise
   */
    return new Promise((resolve, reject) => {
      // 购物车是否存在
      let flag = false;
      // 判断是否添加的同一个商品
      for (let item of context.state.cartList) {
        if (panyload.iid === item.iid) { //已存在此商品 数量加一 
          //   item.count++;  
          context.commit(ADD_COUNTER, item) //在mutations中直接操作的话vuex不会保存记录，官方推荐这种操作，会保留记录
          flag = true;
          resolve('当前商品数量加+1')
          break
        }
      }
      if (!flag) {
        panyload.count = 1
        // context.state.cartList.push(panyload)
        context.commit(ADD_TO_CART, panyload)
        resolve('添加新的商品成功')
      }
    })
  }
}