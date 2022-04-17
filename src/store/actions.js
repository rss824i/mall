// 导入常量，mutations方法名常量
import {
    ADD_COUNTER,
    ADD_TO_CART
} from './mutations-types'


export default  {
    // 新增至购物车
    addCart(context, panyload) {
      // 判断是否添加的同一个商品
      let flag = false;
      for (let item of context.state.cartList) {
        if (panyload.iid === item.iid) {
        //   item.count++;
        context.commit(ADD_COUNTER,item)
          flag = true;
          break
        }
      }
      if (!flag) {
        panyload.count = 1
        // context.state.cartList.push(panyload)
        context.commit(ADD_TO_CART,panyload)
      }
    }
  }