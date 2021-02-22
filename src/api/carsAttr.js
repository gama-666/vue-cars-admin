import http from "@/utils/request";


/*获取车辆公用属性列表*/
export function carsAttrType(data = {}) {
    return http.request({
        method: "post",
        url: "/carsAttr/type/",
        data
    })
}

/*获取车辆自定义属性*/
export function carsAttrList(data = {}) {
    return http.request({
        method: "post",
        url: "/carsAttr/list/",
        data
    })
}

/*车辆自定义属性添加*/
export function carsAttrAdd(data = {}) {
    return http.request({
        method: "post",
        url: "/carsAttr/add/",
        data
    })
}

