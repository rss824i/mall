// 导入常量，mutations方法名常量
import {
    ADD_COUNTER,
    ADD_TO_CART
} from './mutations-types'


export default {
    // 数量加一
    [ADD_COUNTER](state,panyload){
        panyload.count++
    },
    // 新增商品
    [ADD_TO_CART](state,panyload){
        state.cartList.push(panyload)
    }
  }