<template>
  <div class="parking-add">
    <el-form ref="ruleForm" :rules="rules" :model="form" label-width="100px">
      <el-form-item label="停车场名称" prop="parkingName">
        <el-input v-model="form.parkingName"></el-input>
      </el-form-item>
      <el-form-item label="区域" prop="area">
        <CityArea ref="cityAred" :mapLocation="true" :city_value.sync="form.area" @address="callbackAddress"/>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-radio-group v-model="form.type">
          <el-radio v-for="item in type" :key="item.label" :label="item.value" >{{ item.label }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="可停放车辆" prop="carsNumber">
        <el-input v-model.number="form.carsNumber"></el-input>
      </el-form-item>
      <el-form-item label="禁启用" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio v-for="item in status" :key="item.label" :label="item.value">{{ item.label }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="位置">
        <div class="address-map">
          <Map @callback="getLnglat" ref="amap" />
        </div>
      </el-form-item>
      <el-form-item label="经纬度" prop="lnglat">
        <el-input v-model="form.lnglat"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('ruleForm')">新增</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
//组件
import Map from "@/componeents/amap";
import CityArea from "@/componeents/common/cityArea";
//api
import { ParkingAdd } from "@/api/parking";
export default {
  name: "ParkingAdd",
  components: { Map, CityArea },
  data() {
    return {
      status: [
        { label: "启用", value: 1 },
        { label: "禁用", value: 2 },
      ],
      type: [
        { label: "室内", value: 1 },
        { label: "室外", value: 2 },
      ],
      form: {
        parkingName: "", //停车场名称  String
        area: "", //省市区     String
        address: "", //详细地址    String
        type: "", //停车场类型   2	停车场类型（1：室内；2：室外）
        carsNumber: "", //最多可停放数量  true	Number	0	最多可停放数量
        status: "", //禁启用  Number	2	禁启用（false：禁用；true：启用）
        lnglat: "", //经纬度    String
        content: "", //停车场描述 String
      },
      //表单验证规则
      rules: {
        parkingName: [
          { required: true, message: "请输入停车场名称", trigger: "change" },
        ],
        carsNumber: [
          { required: true, message: "不能为空" },
          { type: "number", message: "请输入数字" },
        ],
        area: [{ required: true, message: "请选择省市区", trigger: "change" }],
        lnglat: [
          { required: true, message: "经纬度不能为空", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    //获取经纬度,输入框显示
    getLnglat(params) {
      this.form.lnglat = params.data.lnglat.value;
    },
    //回调,执行组件函数
    callbackAddress(params) {
      if (params.fn) this[params.fn](params.data.addressCode);
      this.form.area = params.data.addressValue;
    },
    //根据级联选择定位
    setMapcenter(data) {
      this.$refs.amap.setMapcenter(data);
    },
    //提交按钮
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.form);
          //添加停车场接口
          this.addParjing();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //新增停车场接口
    addParjing(){
      ParkingAdd(this.form).then((response) => {
          let data = response.data;
           this.$message({
            message: data.message,
            type: "success"
          });
          this.resetForm("ruleForm");
          this.$refs.cityAred.clear()
      });
    },
    //重置表单
    resetForm(formName) {
        this.$refs[formName].resetFields();
    }
  }
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