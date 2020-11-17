import http from "@/utils/request.js";

/*添加一级信息分类标题*/
export function AddFirstCategory(data) {
    return http.request({
        method: 'post',
        url: '/news/addFirstCategory/',
        data
    })
}
/*信息分类标题添加 （无子级分类）*/
export function GetCategory(data) {
    return http.request({
        method: 'post',
        url: '/news/getCategory/',
        data
    })
}
/*获取信息分类名称 （有子级分类）*/
export function GetCategoryAll(data) {
    return http.request({
        method: 'post',
        url: '/news/getCategoryAll/',
        data
    })
}
/* 删除信息分类名称 */
export function DeleteCategory(data) {
    return http.request({
        method: 'post',
        url: '/news/deleteCategory/',
        data
    })
}
/* 修改信息分类名称 */
export function EditCategory(data) {
    return http.request({
        method: 'post',
        url: '/news/editCategory/',
        data
    })
}
//添加子级分类名称
export function AddChildrenCategory(data) {
    return http.request({
        method: 'post',
        url: '/news/addChildrenCategory/',
        data
    })
}




/***************************************************/

//新增信息内容
export function GetList(data) {
    return http.request({
        method: 'post',
        url: '/news/getList/',
        data
    })
}
//添加信息内容
export function AddInfo(data) {
    return http.request({
        method: 'post',
        url: '/news/add/',
        data
    })
}


//修改信息
export function EditInfo(data) {
    return http.request({
        method: 'post',
        url: '/news/editInfo/',
        data
    })
}

//删除信息
export function DeleteInfo(data) {
    return http.request({
        method: 'post',
        url: '/news/deleteInfo/',
        data
    })
}