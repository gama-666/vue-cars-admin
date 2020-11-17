import http from "@/utils/request.js";

/*获取角色*/
export function GetRole(data = {}) {
    return http.request({
        method: 'post',
        url: '/role/',
        data
    })
}


/*获取系统列表*/
export function GetSystem(data = {}) {
    return http.request({
        method: 'post',
        url: '/system/',
        data
    })
}


/*添加用户*/
export function GetUserAdd(data) {
    return http.request({
        method: 'post',
        url: '/user/add/',
        data
    })
}

/*删除用户*/
export function UserDelete(data) {
    return http.request({
        method: 'post',
        url: '/user/delete/',
        data
    })
}

/*用户禁用启用*/
export function UserActives(data) {
    return http.request({
        method: 'post',
        url: '/user/actives/',
        data
    })
}

/*用户禁用启用*/
export function UserEdit(data) {
    return http.request({
        method: 'post',
        url: '/user/edit/',
        data
    })
}


/*按钮权限*/
export function GetPermButton(data) {
    return http.request({
        method: 'post',
        url: '/permButton/',
        data
    })
}

