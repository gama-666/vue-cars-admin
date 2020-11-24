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

/*停车场详情*/
export function parkingDetailed(data = {}) {
    return http.request({
        method: "post",
        url: "/parking/detailed/",
        data
    })
}

/*停车场修改*/
export function parkingEdit(data = {}) {
    return http.request({
        method: "post",
        url: "/parking/edit/",
        data
    })
}

/*停车场删除*/
export function parkingDelete(data = {}) {
    return http.request({
        method: "post",
        url: "/parking/delete/",
        data
    })
}

