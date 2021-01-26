import http from "@/utils/request";


/*车辆添加*/
export function CarsAdd(data = {}) {
    return http.request({
        method: "post",
        url: "/cars/add/",
        data
    })
}


/*车辆添加*/
export function CarsList(data = {}) {
    return http.request({
        method: "post",
        url: "/cars/List/",
        data
    })
}


/*车辆删除*/
export function CarsDelete(data = {}) {
    return http.request({
        method: "post",
        url: "/cars/delete/",
        data
    })
}

/*车辆修改*/
export function CarsEdit(data = {}) {
    return http.request({
        method: "post",
        url: "/cars/edit/",
        data
    })
}

/*车辆禁启用*/
export function CarsStatus(data = {}) {
    return http.request({
        method: "post",
        url: "/cars/status/",
        data
    })
}

/*车辆详情*/
export function CarsDetailed(data = {}) {
    return http.request({
        method: "post",
        url: "/cars/detailed/",
        data
    })
}



