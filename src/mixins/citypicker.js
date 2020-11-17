import {
    GetCityPicker
} from "@/api/common";
import {
    reactive
} from "@vue/composition-api";

export function citypicker() {
    const data = reactive({
        //省份数据
        provinceValue: "",
        provinceData: [],
        //城市数据
        cityValue: "",
        cityData: [],
        //区县数据
        areaValue: "",
        areaData: [],
        //街道数据
        streetValue: "",
        streetData: []
    });
    //返回的数据集合，需监听
    const resultData = reactive({
        provinceValue: "",
        cityValue: "",
        areaValue: "",
        streetValue: "",
    })
    //获取省份
    const getProvince = () => {
        getData({
            type: "province"
        })
    };
    //获取城市,选择省份后去获取城市
    const hanglerProvince = () => {
        resetValue("city")
        getData({
            type: "city",
            province_code: data.provinceValue
        })
    };
    //获取区县,选择城市后去获取地区县
    const hanglerCity = () => {
        resetValue("area")
        getData({
            type: "area",
            city_code: data.cityValue
        })
    };
    //获取街道,选择区县后去获取街道
    const hanglerAred = () => {
        resetValue("street")
        getData({
            type: "street",
            area_code: data.areaValue
        })
    };
    //获取数据
    const getData = (responeData) => {
        GetCityPicker(responeData).then(respone => {
            data[`${responeData.type}Data`] = respone.data.data.data;
        });
    }
    //选择街道后返回
    const hanglerStree = () => {
        result()
    }
    //重置选项
    const resetValue = (parms) => {
        const valueJson = {
            city: ["cityValue", "areaValue", "streetValue"],
            area: ["areaValue", "streetValue"],
            street: ["streetValue"],
        }
        valueJson[parms].forEach(item => data[item] = "")
        result()
    }
    //修改返回的数据集合，需监听
    const result = () => {
        //通过key值匹配，修改需要返回的数据
        for (let key in resultData) {
            resultData[key] = data[key]
        }
    }
    return {
        data,
        resultData, //返回的数据集合
        // (data), //把对象类型转为基础类转，可进行解构响应，但需注意，在监听时，因为变成基础类型了，需要通过 .value来监听
        getProvince,
        hanglerProvince,
        hanglerCity,
        hanglerAred,
        hanglerStree
    }
}