import http from "@/utils/request";

/*注册*/
export function ParkingAdd(data = {}) {
    return http.request({
        method: "post",
        url: "/parking/add/",
        data
    })
}