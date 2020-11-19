<template>
  <div class="parking-add">
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="停车场名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="区域">
        <CityArea :city_value.sync="form.area" />
      </el-form-item>
      <el-form-item label="类型" prop="resource">
        <el-radio-group v-model="form.type">
          <el-radio label="室内"></el-radio>
          <el-radio label="室外"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="可停放车辆">
        <el-input v-model="form.carsNumber"></el-input>
      </el-form-item>
      <el-form-item label="禁启用" prop="resource">
        <el-radio-group v-model="form.disabled">
          <el-radio label="1">启用</el-radio>
          <el-radio label="2">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="位置">
        <div class="address-map">
          <Map @lonlag="getLAL" />
        </div>
      </el-form-item>
      <el-form-item label="经纬度">
        <el-input v-model="form.lonlag"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">新增</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Map from "@/componeents/amap";
import CityArea from "@/componeents/common/cityArea";
export default {
  name: "ParkingAdd",
  components: { Map, CityArea },
  data() {
    return {
      form: {
        area: "", //省市区
        lonlag: "", //经纬度
        name: "",
        type: "",
        carsNumber: "",
        disabled: "1",
        operate: "",
      },
    };
  },
  methods: {
    //获取经纬度
    getLAL(data) {
      this.form.lonlag = data.value;
    },
    //新增按钮
    onSubmit() {
      console.log(this.form.area);
    },
  },
};
</script>

<style lang="scss" scoped>
.parking-add {
  width: 100%;
}
.address-map {
  width: 100%;
  height: 400px;
  overflow: hidden;
}
</style>