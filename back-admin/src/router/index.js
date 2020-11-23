import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "../components/Layout";

Vue.use(VueRouter);

const routes = [
   //登录
   {
    path:"/login",
    name:"login",
    component:()=>import('../views/login')
  },
  //首页
  {
    path:'/',
    name:"Layout",
    component:Layout,
    // redirect:'/login',
    children:[
      {
        path:'/frist',
        component:() => import("../views/frist")
      }
    ]
  },
 
  //会员管理
  {
    path:"/merber",
    name:"merber",
    component:Layout,
    children:[
      {
       path:"/" ,
       component:()=>import('../views/merber'),
       meta:{
           title:"会员管理"
       }
      }
     
    ]
  },
  //供应商管理
  {
    path:"/supplier",
    name:"supplier",
    component:Layout,
    children:[
      {
       path:"/" ,
       component:()=>import('../views/supplier'),
       meta:{
           title:"供应商管理"
       }
      }
     
    ]
  },
  //商品管理
  {
    path:"/goods",
    name:"goods",
    component:Layout,
    children:[
      {
       path:"/" ,
       component:()=>import('../views/goods'),
       meta:{
           title:"商品管理"
       }
      }
     
    ]
  },
  //员工管理
  {
    path:"/staff",
    name:"staff",
    component:Layout,
    children:[
      {
       path:"/" ,
       component:()=>import('../views/staff'),
       meta:{
           title:"员工管理"
       }
      }
     
    ]
  },
 
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

export default router;
