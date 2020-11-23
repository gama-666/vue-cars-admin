import http from "@/utils/request";

/*新增停车场*/
export function ParkingAdd(data = {}) {
    return http.request({
        method: "post",
        url: "/parking/add/",
        data
    })
}

/*停车场列表*/
export function ParkingList(data = {}) {
    return http.request({
        method: "post",
        url: "/parking/list/",
        data
    })
}

