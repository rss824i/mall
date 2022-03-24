import Vue from 'vue'
import Router from 'vue-router'

// 懒加载模式导入
const Home = () => import("views/home/Home.vue")
const Cart = () => import("views/cart/Cart.vue")
const Category = () => import("views/category/Category.vue")
const Profile = () => import("views/profile/Profile.vue")
const Detail = () => import("views/detail/Detail.vue")

// 1.安装插件
Vue.use(Router)

// 2.创建路由对象
const routes=[
  {
    path:"",
    redirect:"/home",//重定向的Home页面
  },
  {
    path:"/home",
    component: Home
  },
  {
    path:"/cart",
    component: Cart
  },
  {
    path:"/category",
    name:'Category',
    component: Category
  },
  {
    path:"/profile",
    component: Profile
  },
  {
    path:"/detail/:iid",  //动态路由，传递id属性
    component: Detail
  }
]

const router = new Router({
  // 名字不能变，否则需要使用routes:XXXX
  routes,
  // 修改默认使用的模式，history可显示完整的路径
  mode: "history"
})

// 3.导出
export default router

// 4.main.js中导入,并在vue中使用
