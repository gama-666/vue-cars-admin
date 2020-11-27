import http from "@/utils/request";


/*汽车品牌标志*/
export function BrandLogo(data = {}) {
    return http.request({
        method: "post",
        url: "/brand/logo/",
        data
    })
}


/*汽车品牌添加*/
export function BrandAdd(data = {}) {
    return http.request({
        method: "post",
        url: "/brand/add/",
        data
    })
}

/*汽车品牌禁启用*/
export function BrandStatus(data = {}) {
    return http.request({
        method: "post",
        url: "/brand/status/",
        data
    })
}
/*汽车品牌删除*/
export function BrandDelete(data = {}) {
    return http.request({
        method: "post",
        url: "/brand/delete/",
        data
    })
}

/*汽车品牌删除*/
export function BrandEdit(data = {}) {
    return http.request({
        method: "post",
        url: "/brand/edit/",
        data
    })
}




