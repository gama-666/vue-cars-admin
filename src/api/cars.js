import http from "@/utils/request";


/*车辆添加*/
export function CarsAdd(data = {}) {
    return http.request({
        method: "post",
        url: "/cars/add/",
        data
    })
}




