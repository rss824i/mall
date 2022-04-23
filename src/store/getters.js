// 封装vuex公共的getter

export default {
    cartLength(state){
        return state.cartList.length
    },
    cartList(state){
        return state.cartList
    }
}