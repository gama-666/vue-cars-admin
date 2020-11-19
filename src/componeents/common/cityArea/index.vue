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
  },
  data() {
    return {
      value: "",
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
            resolve(data);
          });
        },
      },
    };
  },
  methods: {
    handleChange(value) {
      this.$emit("update:city_value", value.join());
    },
  },
};
</script>
<style lang="scss" scoped>
</style>

<!--
1、组件传入的 city_value 属性用 props 接收
2、this.$emit（"update:city_value"）反向修改，结合组件属性的.sync
-->