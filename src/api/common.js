import http from "@/utils/request";
import requestUrl from "./requestUrl";

/*注册*/
export function loadTableData(parms) {
    return http.request({
        method: parms.method || "post",
        url: parms.url,
        data: parms.data || {}
    })
}

/*获取省*/
export function GetCity(data) {
    return http.request({
        method: "post",
        url: "/cityPicker/",
        data: data
    })
}


/*传入url请求接口,获取table列表*/
export function GetTableData(params = {}) {
    return http.request({
        method: "post",
        url: requestUrl[params.url],
        data: params.data
    })
}



/*获取车辆品牌*/
export function GetCarsBrand(data = {}) {
    return http.request({
        method: "post",
        url: "/common/getCarsBrand/",
        data
    })
}

/*获取停车场*/
export function GetParking(data = {}) {
    return http.request({
        method: "post",
        url: "/common/getParking/",
        data
    })
}



