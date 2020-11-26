import http from "@/utils/request";
import  requestUrl  from "./requestUrl";

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


/*传入url请求接口*/
export function GetTableData(params = {}) {
    return http.request({
        method: "post",
        url: requestUrl[params.url],
        data:params.data
    })
}