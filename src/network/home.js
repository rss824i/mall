import { request } from "./request";

// 封装home页面的所有请求数据
export function getHomeMutidate(){
    return request({
        url:'/home/multidata'
    })
}

// 获取首页数据 三个选项中的第一页
export function getHomeGoods(type,page){
    // console.log("-------",page+type);
    return request({
        url: '/home/data',
        params:{
            type,
            page
        }
    })
}