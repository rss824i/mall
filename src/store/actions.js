import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutations-types'

export default {
  addCart(context, panyload) {
    return new Promise((resolve, reject) => {
      let flag = false;
      for (let item of context.state.cartList) {
        if (panyload.iid === item.iid) { 
          //   item.count++;  
          context.commit(ADD_COUNTER, item) 
          flag = true;
          resolve('当前商品数量加+1')
          break
        }
      }
      if (!flag) {
        panyload.count = 1
        context.commit(ADD_TO_CART, panyload)
        resolve('添加新的商品成功')
      }
    })
  }
}