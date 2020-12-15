<template>
  <div class="parking-add">
    <VueForm :formItem="form_item" :formData="form" ref="vuForm" :formHandler="form_handler">
      <template v-slot:city>
        <CityArea ref="cityAred" :mapLocation="true" :city_value.sync="form.area" @address="callbackAddress" />
      </template>
      <template v-slot:amap>
        <div class="address-map">
          <Map @callback="callbackComponent" :options="options_map" ref="amap" />
        </div>
      </template>
    </VueForm>
  </div>
</template>
<script>
//组件
import Map from "@/componeents/amap";
import CityArea from "@/componeents/common/cityArea";
import VueForm from "@/componeents/form";  //form表单
//api
import { ParkingAdd, parkingDetailed, parkingEdit } from "@/api/parking";
//自定义校验
import { validateNumber } from "@/utils/validata";
export default {
  name: "ParkingAdd",
  components: { Map, CityArea, VueForm },
  data() {
    return {
      //表单数据配置
      form: {
        parkingName: "", //停车场名称  String
        area: "", //省市区     String
        address: "", //详细地址    String
        type: "", //停车场类型   2	停车场类型（1：室内；2：室外）
        carsNumber: "", //最多可停放数量  true	Number	0	最多可停放数量
        status: "", //禁启用  Number	2	禁启用（false：禁用；true：启用）
        lnglat: "", //经纬度    String
      },
      //表单配置
      form_item: [
        { type: "Input", label: "停车场名称", prop: "parkingName", placeholder: "请输入停车场名称", width: "200px", required: true, },
        { type: "Slot", label: "区域", prop: "area", slotName: "city" },
        { type: "Radio", label: "类型", prop: "type", options: this.$store.state.app.parking_type, required: true, },
        {
          type: "Input", label: "可停放车辆", prop: "carsNumber", width: "200px",
          validator: [{ validator: validateNumber, trigger: "change" }]
        },
        { type: "Radio", label: "禁启用", prop: "status", options: this.$store.state.app.parking_status_json, required: true, },
        { type: "Slot", label: "位置", slotName: "amap", },
        { type: "Input", label: "经纬度", prop: "lnglat", width: "200px", disabled: true, },
      ],
      form_handler: [
        { label: '确定', type: 'primary', handler: () => this.formValidate() },
      ],
      id: this.$route.query.id, //编辑按钮传过来的id
      options_map: { mapLoad: true }, //地图配置
      //按钮加载状态
      button_loading: false,
    };
  },
  methods: {
    //提交按钮，验证通过后
    formValidate() {
      this.$refs.vuForm.$refs.ruleForm.validate((valid) => {
        if (valid) { //验证通过
          //判断是否有id，没有就添加、有就修改
          this.id ? this.editParking() : this.addParKing();
        }
      });
    },
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
          this.$refs.cityAred.clear(); //重置级联选择
          this.$refs.amap.clearMarker(); //清除点覆盖物
          this.$router.push({ path: "/parkingIndex" });
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
    resetForm() {
      this.$refs.vuForm.$refs.resetFields();
    },
    //获取详情,点击编辑时，根据ID调取接口数据，并重新定位地图
    getDetaile() {
      if (this.id) {
        parkingDetailed({ id: this.id }).then((respone) => {
          const data = respone.data.data;
          console.log(data)
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
  beforeMount() { },
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