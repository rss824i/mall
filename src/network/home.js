import { request } from "./request";

// 封装home页面的所有请求数据
export function getHomeMutidate(){
    return request({
        url:'/home/mutidate'
    })
}