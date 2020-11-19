import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

//默认路由
export const defaultRouterMap = [{
    path: "/",
    redirect: "login",
    hidden: true,
    meta: {
      name: "主页"
    }
  },
  {
    path: "/login",
    name: "Login",
    hidden: true,
    meta: {
      name: "登录"
    },
    component: () => import("../views/Login/")
  },
  {
    path: "/console",
    name: "Console",
    redirect: "index",
    meta: {
      name: "控制台",
      icon: "console"
    },
    component: () => import("../views/Layout/"),
    children: [{
      path: "/index",
      name: "Index",
      meta: {
        name: "首页"
      },
      component: () => import("../views/Console/"),
    }, ]
  },
  //停车场
  {
    path: "/parking",
    name: "Parking",
    redirect: "index",
    meta: {
      name: "停车场",
      icon: "parking"
    },
    component: () => import("../views/Layout/"),
    children: [{
        path: "/parkingIndex",
        name: "ParkingIndex",
        meta: {
          name: "列表管理"
        },
        component: () => import("../views/Parking/"),
      },
      {
        path: "/parkingAdd",
        name: "ParkingAdd",
        meta: {
          name: "新增停车场"
        },
        component: () => import("../views/Parking/add"),
      },
    ]
  },
  //车辆品牌
  {
    path: "/carsBrand",
    name: "CarsBrand",
    redirect: "index",
    meta: {
      name: "车辆品牌",
      icon: "brand"
    },
    component: () => import("../views/Layout/"),
    children: [{
        path: "/carsBrandIndex",
        name: "CarsBrandIndex",
        meta: {
          name: "品牌列表"
        },
        component: () => import("../views/carsBrand/"),
      },
      {
        path: "/carsBrandAdd",
        name: "CarsBrandAdd",
        meta: {
          name: "添加车辆品牌"
        },
        component: () => import("../views/carsBrand/add"),
      },
    ]
  },
  //车辆管理
  {
    path: "/cars",
    name: "Cars",
    redirect: "index",
    meta: {
      name: "车辆管理",
      icon: "administration"
    },
    component: () => import("../views/Layout/"),
    children: [
      {
        path: "/carsIndex",
        name: "CarsIndex",
        meta: {
          name: "车辆列表"
        },
        component: () => import("../views/Cars/"),
      },
      {
        path: "/carsAdd",
        name: "CarsAdd",
        meta: {
          name: "新增车辆"
        },
        component: () => import("../views/Cars/add"),
      },
    ]
  },
  //404页面
  {
    path: "/page404",
    meta: {
      name: "控制台",
      icon: "console",
    },
    hidden: true,
    component: () => import("../views/Layout/"),
    children: [{
      path: "/404",
      meta: {
        name: "404"
      },
      hidden: true,
      component: () => import("../views/404.vue"),
    }, ]
  },
]

const router = new VueRouter({
  routes: defaultRouterMap
});

//动态路由
export const asnycRouterMap = [{
  path: "*",
  redirect: "404",
  hidden: true
}, ]

export default router;