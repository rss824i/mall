import { request } from "./request"

export  function getDetail(iid){
    return request({
        url: '/detail',
        params:{
            iid
        }
    })
}

//导出一个对象   
//构建一个详情页面的对象
export class Goods {
    // 构造函数
    constructor(itemInfo, columns, services) {
      this.title = itemInfo.title;
      this.desc = itemInfo.desc;
      this.newPrice = itemInfo.price;
      this.oldPrice = itemInfo.oldPrice;
      this.discount = itemInfo.discountDesc;
      this.columns = columns;
      this.services = services;
      this.realPrice = itemInfo.lowNowPrice;
    }

  }

//   商家信息
  export class Shop{
      constructor(shopInfo){
          this.logo = shopInfo.shopLogo;
          this.name=  shopInfo.name;
          this.fans= shopInfo.cFans;
          this.sells= shopInfo.cSells;
          this.score = shopInfo.score;
          this.goodsCount= shopInfo.cGoods;
      }
  }

/*
class Person{
    constructor(name,age){
        this.name=name;
        this.age = age
    }
}

const p = new Person()
*/