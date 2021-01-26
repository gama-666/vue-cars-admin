<template>
  <el-form ref="ruleForm" :model="formData" label-width="100px">
    <el-form-item v-for="item in formItem" :key="item.prop" :label="item.label" :prop="item.prop" :rules="item.rules">
      <!-- Input -->
      <el-input v-if="item.type === 'Input'" v-model.trim="formData[item.prop]" :placeholder="item.placeholder" :style="{ width: item.width }" :disabled="item.disabled"></el-input>
      <!-- Select -->
      <el-select filterable v-if="item.type === 'Select'" v-model.trim="formData[item.prop]" :placeholder="item.placeholder" :style="{ width: item.width }" :disabled="item.disabled">
        <el-option v-for="selectItem in item.options" :key="selectItem.id" :label="selectItem.label  || selectItem[item.select_value] " :value="selectItem.value || selectItem[item.select_id]"></el-option>
      </el-select>
      <!-- 禁启用 -->
      <el-radio-group v-if="item.type === 'Disabled'" v-model="formData[item.prop]">
        <el-radio v-for="radio in radio_disabled" :key="radio.label" :label="radio.value">{{ radio.label }}</el-radio>
      </el-radio-group>
      <!-- 省市区 -->
      <slot v-if="item.type === 'Slot'" :name="item.slotName" />
      <!-- 类型 -->
      <el-radio-group v-if="item.type === 'Radio'" v-model="formData[item.prop]">
        <el-radio v-for="radio in item.options" :key="radio.label" :label="radio.value">{{ radio.label }}</el-radio>
      </el-radio-group>
      <!-- 富文本编辑器 -->
      <template v-if="item.type === 'wangeditor'">
        <EditorDom :isClear="wangeditorClear" ref="wangeditor" :value="formData[item.prop]" :content.sync="formData[item.prop]" />
      </template>
    </el-form-item>
    <!-- 提交按钮 -->
    <el-form-item>
      <el-button v-for="item in formHandler" :key="item.id" :type="item.type" @click="item.handler && item.handler()">{{item.label}}</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import EditorDom from "@/componeents/common/wangeditor";  //富文本编辑器
export default {
  name: "vueForm",
  components: { EditorDom },
  props: {
    formItem: {
      type: Array,
      default: () => [],
    },
    formHandler: {
      type: Array,
      default: () => []
    },
    formData: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
      radio_disabled: this.$store.state.config.radio_disabled,
      type_Msg: {
        "Input": "请输入",
        "Radio": "请选择",
        "Select": "请选择",
      },
      //清除富文本
      wangeditorClear: false,
    };
  },
  methods: {
    //重置表单
    reset() {
      this.$refs.ruleForm.resetFields()
      //重置富文本,判断是否存在富文本
      if (this.$refs.wangeditor) {
        this.wangeditorClear = !this.wangeditorClear;
      }
    },
    //表单基础数据处理
    formInitData() {
      this.formItem.forEach((item) => {
        //rules 规则
        if (item.required) { this.rules(item) }
        //自定义校验规则
        if (item.validator) { item.rules = item.validator }
      })
    },
    // 验证规则
    rules(item) {
      const requiredRules = [{ required: true, message: item.requiredMsg || `${this.type_Msg[item.type]}${item.label}`, trigger: 'change' }];
      item.rules && item.rules.length > 0 ? item.rules = requiredRules.concat(item.rules) : item.rules = requiredRules;
    },
  },
  watch: {
    formItem: {
      handler(newValue) {
        this.formInitData()
      },
      immediate: true
    }
  },
  //DOM元素渲染之前 （生命周期）
  beforeMount() { },
};
</script>
<style lang="scsss" scoped>
</style>