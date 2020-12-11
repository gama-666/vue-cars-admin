<template>
  <div class="parking-add">
    <VueForm :formItem="form_item">
      <template v-slot:city="slotData">
        <CityArea ref="cityAred" :mapLocation="true" :city_value.sync="form.area" @address="callbackAddress"/>
      </template>
      <template v-slot:amap="slotData">
        <div class="address-map">
          <Map @callback="callbackComponent" :options="options_map" ref="amap"/>
        </div>
      </template>
    </VueForm>
    <el-form ref="ruleForm" :rules="rules" :model="form" label-width="100px">
      <el-form-item>
        <el-button type="primary" :loaging="button_loading" @click="onSubmit('ruleForm')" >确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
//组件
import Map from "@/componeents/amap";
import CityArea from "@/componeents/common/cityArea";
//form表单
import VueForm from "@/componeents/form";
//api
import { ParkingAdd, parkingDetailed, parkingEdit } from "@/api/parking";
export default {
  name: "ParkingAdd",
  components: { Map, CityArea, VueForm },
  data() {
    return {
      //表单配置
      form_item: [
        { type: "Input", label: "停车场名称", placeholder: "请输入停车场名称", prop: "parkingName", width: "200px",},
        { type: "Slot", slotName: "city", label: "区域" },
        {
          type: "Radio",
          label: "类型",
          prop: "type",
          options: this.$store.state.app.parking_type,
        },
        { type: "Input", label: "可停放车辆",  prop: "carsNumber", width: "200px", },
        {
          type: "Radio",
          label: "禁启用",
          prop: "status",
          options: this.$store.state.app.radio_disabled,
        },
        { type: "Slot", slotName: "amap", label: "位置" },
        { type: "Input", label: "经纬度",  prop: "lnglat", width: "200px", disabled: true,},
      ],

      options_map: { mapLoad: true }, //地图配置
      id: this.$route.query.id, //编辑按钮传过来的id
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
      //按钮加载状态
      button_loading: false,
    };
  },
  methods: {
    //回调,执行组件函数
    callbackAddress(params) {
      if (params.function) this[params.function](params.data.addressCode);
      this.form.area = params.data.addressValue;
    },
    callbackComponent(params) {
      if (params.function) this[params.function](params);
    },
    //获取经纬度,输入框显示
    getLnglat(params) {
      this.form.lnglat = params.data.lnglat.value;
    },
    //地图加载完成
    mapLoad() {
      this.getDetaile(); //获取详情
    },
    //根据级联选择定位
    setMapcenter(data) {
      this.$refs.amap.setMapcenter(data);
    },
    //提交按钮
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //添加停车场接口
          this.id ? this.editParking() : this.addParKing();
        } else {
          return false;
        }
      });
    },
    //新增停车场接口
    addParKing() {
      this.button_loading = true;
      ParkingAdd(this.form)
        .then((response) => {
          let data = response.data;
          this.$message({
            message: data.message,
            type: "success",
          });
          this.button_loading = false;
          this.resetForm("ruleForm"); //重置表单
          this.$refs.cityAred.clear(); //重置级联选择
          this.$refs.amap.clearMarker(); //清除点覆盖物
        })
        .catch(() => {
          this.button_loading = false;
        });
    },
    //修改停车场接口
    editParking() {
      this.form["id"] = this.id;
      parkingEdit(this.form).then((response) => {
        let data = response.data;
        this.$message({
          message: data.message,
          type: "success",
        });
        this.$router.push({ path: "/parkingIndex" });
      });
    },
    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //获取详情,点击编辑时，根据ID调取接口数据，并重新定位地图
    getDetaile() {
      if (this.id) {
        parkingDetailed({ id: this.id }).then((respone) => {
          const data = respone.data.data;
          for (let key in data) {
            if (data[key]) this.form[key] = data[key];
          }
          this.form.status = data.status ? 1 : 2;
          //调父组件方法，重新打点,地图加载完成时设置覆盖物
          let arr = data.lnglat.split(",");
          const lnglat = { lng: arr[0], lat: arr[1] };
          this.$refs.amap.setMarker(lnglat);
          this.$refs.cityAred.initDefault(this.form.region);
        });
      }
    },
  },
  //DOM元素渲染之前 （生命周期）
  beforeMount() {},
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