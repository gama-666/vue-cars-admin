import { reactive } from "@vue/composition-api";
import {requestUrl } from "@/api/requestUrl";
import { loadTableData } from "@/api/common";

export function loadData() {
    const tableData = reactive({
        item: [],
        total: 0,
        loadingData: true,
    })
    const tableLoadData = (parms) => {
        let requestKey = parms;
        let demandData = {
            url: requestUrl[requestKey.url],
            method: requestKey.method,
            data: requestKey.data
        };
        tableData.loadingData = true
        loadTableData(demandData)
            .then(response => {
                //请求成功的数据
                let successData = response.data.data.data;
                if( successData.length == 0){
                    tableData.loadingData = false
                    return false 
                }
                //判断数据是否为空
                if (successData && successData.length > 0) {
                    tableData.total = response.data.data.total;
                    tableData.item = successData;
                    tableData.loadingData = false
                }
            })
            .catch(error => {
                tableData.loadingData = true
            });
    }
    return {
        tableData,
        tableLoadData
    }

}