import http from "@/utils/request.js";

/*获取验证码*/
export function GetSms(data) {
    return http.request({
        method: 'post',
        url: '/getSms/',
        data
    })
}
/*登录*/
export function Register(data) {
    return http.request({
        method: 'post',
        url: '/register/',
        data
    })
}
/*注册*/
export function Login(data) {
    return http.request({
        method: 'post',
        url: '/login/',
        data
    })
}

/*获取用户角色*/
export function GetUserRole(data = {}) {
    return http.request({
        method: 'post',
        url: '/userRole/',
        data
    })
}

/*获取用户角色*/
export function Logout(data = {}) {
    return http.request({
        method: 'post',
        url: '/logout/',
        data
    })
}
