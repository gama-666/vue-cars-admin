<template>
  <el-form ref="ruleForm" :model="form" label-width="100px">
    <el-form-item v-for="item in formItem" :key="item.prop" :label="item.label" :prop="item.parkingName">
       <!-- Input -->
      <el-input v-if="item.type === 'Input'" :placeholder="item.placeholder" :style="{ width: item.width }" :disabled="item.disabled"></el-input>
       <!-- 省市区 -->
      <slot v-if="item.type === 'Slot'" :name="item.slotName"/>
      <!-- 类型 -->
      <el-radio-group  v-if="item.type === 'Radio'">
        <el-radio v-for="item in item.options" :key="item.label" :label="item.value" >{{ item.label }}</el-radio>
      </el-radio-group>


    </el-form-item>
  </el-form>
</template>
<script>
//省市区
import CityArea from "@/componeents/common/cityArea";
export default {
  name: "vueForm",
  props: {
    formItem: {
      type: Array,
      default: () => [],
    },
  },
  components: { CityArea},
  data() {
    return {
      form: {
        type: "", //停车场类型   2	停车场类型（1：室内；2：室外）
      },
    };
  },
  methods: {},
  //DOM元素渲染之前 （生命周期）
  beforeMount() {},
};
</script>
<style lang="scsss" scoped>
</style>