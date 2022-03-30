import { request } from "./request"
// 通过ID获取详情数据
export  function getDetail(iid){
    return request({
        url: '/detail',
        params:{
            iid
        }
    })
}
// 获取推荐数据
export function getRecommend () {
  return request({
    url: '/recommend'
  })
}

//导出一个对象   
//构建一个详情页面的对象实体
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

//   商家信息实体
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

  // 参数的信息实体
  export class GoodsParam {
    constructor(info, rule) {
      // 注：images可能没有值(某些商品优质，某些没有值)
      this.image = info.images ? info.images[0] : '';
      this.infos = info.set;
      this.sizes = rule.tables;
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