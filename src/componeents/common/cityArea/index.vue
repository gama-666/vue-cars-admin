<template>
  <el-cascader
    v-model="value"
    :options="cascader_options"
    :props="cascader_props"
    @change="handleChange"
  ></el-cascader>
</template>
<script>
import { GetCity } from "@/api/common";
export default {
  name: "cityArea",
  props: {
    city_value: {
      type: String,
      default: "",
    },
    mapLocation: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    const _this = this;
    return {
      value: "",
      addressCode: [],
      addressValue: [],
      addressData: {},
      cascader_options: [],
      cascader_props: {
        lazy: true,
        lazyLoad(node, resolve) {
          const { level } = node;
          const requesData = {};
          //省市区请求数据字段
          const JsonType = [
            { type: "province" },
            { type: "city", code: "province" },
            { type: "area", code: "city" },
          ];
          //省市区请求数据
          if (JsonType[level].code) {
            requesData[`${JsonType[level].code}_code`] = node.value;
          }
          requesData.type = JsonType[level].type;
          //省市区请求接口
          GetCity(requesData).then((resonse) => {
            const data = resonse.data.data.data;
            //请求成功所需要显示的数据
            data.forEach((item) => {
              item.value = item[`${JsonType[level].type.toUpperCase()}_CODE`];
              item.label = item[`${JsonType[level].type.toUpperCase()}_NAME`];
              if (level == 2) item.leaf = level >= 2;
            });
            _this.addressData[`${JsonType[level].type}`] = data;
            resolve(data);
          });
          // 获取addres
          if (level != 0) {
            _this.getAddress(node);
          }
        },
      },
    };
  },
  methods: {
    //级联框的值
    handleChange(value) {
      this.$emit("update:city_value", value.join());
      //匹配最后一项
      const lastCode = value[value.length - 1];
      const areaCode = this.addressData.area.filter(
        (item) => lastCode === item.value
      );
      this.addressCode[2] = areaCode[0].label;
      this.addressValue[2] = areaCode[0].value;
      //回调,执行组件函数
      this.getAddress();
    },

    // 获取中文地址
    getAddress(node) {
      if (node) {
        const index = node.level - 1;
        this.addressCode[index] = node.label;
        this.addressValue[index] = node.value;
      }
      if (this.mapLocation) {
        this.$emit("address", {
          fn: "setMapcenter",
          data: {
            addressCode: this.addressCode.join(""),
            addressValue: this.addressValue.join(","),
          },
        });
      }
    },
    //清除
    clear() {
      this.value = "";
    },
  },
};
</script>
<style lang="scss" scoped>
</style>

<!--
1、组件传入的 city_value 省市区
2、this.$emit（"update:city_value"）反向修改，结合组件属性的.sync
3、组件传入的 mapLocation:true 判断是否交互
-->