import http from "@/utils/request";


/*汽车标志*/
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
