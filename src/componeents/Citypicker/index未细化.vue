<template>
  <div class="region">
    <el-row :gutter="10">
      <el-col :span="6">
        <el-select v-model="data.provinceValue" @change="hanglerProvince">
          <el-option
            v-for="item in data.provinceData"
            :key="item.PROVINCE_CODE"
            :value="item.PROVINCE_CODE"
            :label="item.PROVINCE_NAME"
          ></el-option>
        </el-select>
      </el-col>

      <el-col :span="6">
        <el-select v-model="data.cityValue" @change="hanglerCity">
          <el-option
            v-for="item in data.cityData"
            :key="item.CITY_CODE"
            :value="item.CITY_CODE"
            :label="item.CITY_NAME"
          ></el-option>
        </el-select>
      </el-col>

      <el-col :span="6">
        <el-select v-model="data.aredValue" @change="hanglerStreet">
          <el-option
            v-for="item in data.aredData"
            :key="item.AREA_CODE"
            :value="item.AREA_CODE"
            :label="item.AREA_NAME"
          ></el-option>
        </el-select>
      </el-col>

      <el-col :span="6">
        <el-select v-model="data.streetValue">
          <el-option
            v-for="item in data.streetData"
            :key="item.STREET_CODE"
            :value="item.STREET_ID"
            :label="item.STREET_NAME"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { GetCityPicker } from "@/api/common";
import { onMounted, reactive } from "@vue/composition-api";
export default {
  name: "region",
  setup(props, { root }) {
    const data = reactive({
      //省份数据
      provinceValue: "",
      provinceData: [],
      //城市数据
      cityValue: "",
      cityData: [],
      //区县数据
      aredValue: "",
      aredData: [],
      //街道数据
      streetValue: "",
      streetData: []
    });

    //获取省份
    const getProvince = () => {
      GetCityPicker({ type: "province" }).then(respone => {
        data.provinceData = respone.data.data.data;
      });
    };

    //获取城市,选择省份后去获取城市
    const hanglerProvince = () => {
      data.cityValue = "";
      data.aredValue = "";
      data.streetValue = "";
      GetCityPicker({ type: "city", province_code: data.provinceValue }).then(
        respone => {
          data.cityData = respone.data.data.data;
        }
      );
    };
    //获取区县,选择城市后去获取地区县
    const hanglerCity = () => {
      data.aredValue = "";
      data.streetValue = "";
      GetCityPicker({ type: "area", city_code: data.cityValue }).then(
        respone => {
          data.aredData = respone.data.data.data;
        }
      );
    };
    //获取街道,选择区县后去获取街道
    const hanglerStreet = () => {
      data.streetValue = "";
      GetCityPicker({ type: "street", area_code: data.aredValue }).then(
        respone => {
          data.streetData = respone.data.data.data;
        }
      );
    };

    getProvince();

    return {
      data,
      hanglerProvince,
      hanglerCity,
      hanglerStreet
    };
  }
};
</script>
<style lang="scss" scoped>
.region {
  overflow: hidden;
}
</style>