import {
    GetCategory,
    GetCategoryAll
} from "@/api/news";
import {
    reactive
} from "@vue/composition-api";
import http from "@/utils/request.js";

export function common() {
    let categoryData = reactive({
        item: []
    })
    //获取分类
    const getInfoCategory = () => {
        GetCategory({})
            .then(response => {
                categoryData.item = response.data.data.data;
            })
            .catch(error => {});
    }
    //获取全部分类，包含子级
    const getCategoryAll = () => {
        GetCategoryAll({})
            .then(response => {
                categoryData.item = response.data.data;
            })
            .catch(error => {});
    }
    return {
        getCategoryAll,
        getInfoCategory,
        categoryData
    }
}

/*注册*/
export function loadTableData(parms) {
    return http.request({
        method: parms.method || "post",
        url: parms.url,
        data: parms.data || {}
    })
}

/*获取省*/
export function GetCityPicker(data) {
    return http.request({
        method: "post",
        url: "/cityPicker/",
        data: data
    })
}