<template>
  <el-form ref="ruleForm" :model="form" label-width="100px">
    <el-form-item v-for="item in formItem" :key="item.prop" :label="item.label" :prop="item.prop">
      <!-- Input -->
      <el-input v-if="item.type === 'Input'" :placeholder="item.placeholder" :style="{ width: item.width }" ></el-input>
      <!-- 省市区 -->
      <slot v-if="'Solt' === item.type" :name="item.slotName"/>
    </el-form-item>
  </el-form>
</template>
<script>
//省市区
import CityArea from "@/componeents/common/cityArea";
export default {
  name: "VueForm",
  props: {
    formItem: {
      type: Array,
      default: () => [],
    },
  },
  components: { CityArea},
  data() {
    return {
      form: {},
    };
  },
  methods: {},
  //DOM元素渲染之前 （生命周期）
  beforeMount() {},
};
</script>
<style lang="scsss" scoped>
</style>