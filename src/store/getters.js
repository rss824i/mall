// 封装vuex公共的getter

export default {
    // 添加至购物车的数量
    cartLength(state){
        return state.cartList.length
    },
    cartList(state){
        return state.cartList
    }
}