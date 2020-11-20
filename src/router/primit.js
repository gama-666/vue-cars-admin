import router from "./index";

import {
    getToken,
} from "@/utils/app";


//路由守卫
router.beforeEach((to, from, next) => {
    // 获取 token 是否存在
    if(getToken()){
        next();
    }else{
        if(to.path === "/login") { // 这里是处理 login 页面的时候，没有 token
            next();
        }else{
            next({ path: "/login" });  // 这里是处理管理后台时没有 token ，进行 path 路由指向。
        }
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