<template>
  <div class="region">
    <el-row :gutter="10">
      <el-col :span="6">
        <el-select
          v-model="data.provinceValue"
          @change="hanglerProvince"
          v-if="init.province"
        >
          <el-option
            v-for="item in data.provinceData"
            :key="item.PROVINCE_CODE"
            :value="item.PROVINCE_CODE"
            :label="item.PROVINCE_NAME"
          ></el-option>
        </el-select>
      </el-col>

      <el-col :span="6">
        <el-select
          v-model="data.cityValue"
          @change="hanglerCity"
          v-if="init.city"
        >
          <el-option
            v-for="item in data.cityData"
            :key="item.CITY_CODE"
            :value="item.CITY_CODE"
            :label="item.CITY_NAME"
          ></el-option>
        </el-select>
      </el-col>

      <el-col :span="6">
        <el-select
          v-model="data.areaValue"
          @change="hanglerAred"
          v-if="init.ared"
        >
          <el-option
            v-for="item in data.areaData"
            :key="item.AREA_CODE"
            :value="item.AREA_CODE"
            :label="item.AREA_NAME"
          ></el-option>
        </el-select>
      </el-col>

      <el-col :span="6">
        <el-select
          v-model="data.streetValue"
          @change="hanglerStree"
          v-if="init.street"
        >
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
import { citypicker } from "@/mixins/citypicker";
import { onBeforeMount, reactive, watch } from "@vue/composition-api";
export default {
  name: "region",
  props: {
    citypickerLevel: {
      type: Array,
      defalut: _ => []
    },
    citypickerData: {
      type: Object,
      defalut: _ => {}
    }
  },
  setup(props, { root, emit }) {
    const {
      data, //省、市、区、街数据
      getProvince, //获取省份
      hanglerProvince, //获取城市
      hanglerCity, //获取区县
      hanglerAred, //获取街道
      hanglerStree, //选择街道后需返回
      resultData //返回的数据集合，需监听
    } = citypicker();

    //初始化配置项，dom元素的显示隐藏
    const init = reactive({
      province: false,
      city: false,
      ared: false,
      street: false
    });
    //初始化配置项方法，根据传过来的值决定
    const initCityPicker = () => {
      let initData = props.citypickerLevel || [];
      if (initData.length == 0) {
        for (let key in init) {
          init[key] = true;
        }
      } else {
        initData.forEach(item => {
          init[item] = true;
        });
      }
    };

    //监听返回的数据变化,并反向修改
    watch(
      [
        () => resultData.provinceValue,
        () => resultData.cityValue,
        () => resultData.areaValue,
        () => resultData.streetValue
      ],
      ([province, city, area, street]) => {
        emit("update:citypickerData", resultData);
      }
    );

    //生命周期
    onBeforeMount(_ => {
      initCityPicker(); //默认配置项
      getProvince(); //省份
    });

    return {
      data, //省、市、区、街数据
      //事件
      hanglerProvince, //城市
      hanglerCity, //区县
      hanglerAred, //街道
      hanglerStree, //选择街道后需返回
      init //配置项
    };
  }
};
</script>
<style lang="scss" scoped>
.region {
  overflow: hidden;
}
</style>