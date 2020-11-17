import router from "./index";
import {
    getToken,
    removeUsername,
    removeToken
} from "@/utils/app";
import store from "../store/index"


//添加白名单，数组indexOf方法，判断数组中是否存在指定的某个对象，如果不存在，则返回-1
const wihteRouter = ['/login'];

//路由守卫
router.beforeEach((to, from, next) => {
    if (getToken()) {
        if (to.path === "/login") {
            removeUsername()
            removeToken()
            next()
        } else {
            if (store.getters['permission/roles'].length === 0) {
                store.dispatch("permission/getRoles").then((respone) => {
                    let role = respone
                    store.dispatch("permission/createRouter", role).then((respone) => {
                        let addRouter = store.getters['permission/addRouter'];
                        let allRouter = store.getters['permission/allRouter'];
                        //路由更新
                        router.options.routes = allRouter
                        //添加动态路由
                        router.addRoutes(addRouter)
                        next({...to,replace:true})
                     
                    })
                });
            } else {
                next()
            }
        }
    } else {
        if (wihteRouter.indexOf(to.path) !== -1) {
            next()
        } else {
            next("/login")
        }
        /* 
        1、直接进入index的时候，参数to被改变成/index，触发路由指向，会执行beforeEach
        2、再一次next指向login，再次发生路由指向，在执行beforeEach，参数to被改变成/login
        3、白名单判断存在，则直接执行next()，因为没有参数，所以不会再次执行beforeEach
        */
    }
})


/*路由守卫 router.beforeEach
 console.log(to)    //进入的页面（下一个页面）
 console.log(from)  //离开之前的页面（上一个）
 console.log(next)  //钩子函数,如果不带参数，执行to，不进入beforEach，带参数改变路由，进入beforeEach,重新执行，注意:带参数时以防死循环
 next() */
/*token令牌
通过token令牌让用户进入下一个页面,
未登录，未检测到token，返回登录页面
已登录，token存在，进入一个页面
token失效，转入登录页面
请求接口时，token异常，转入登录页面*/