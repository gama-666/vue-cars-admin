<template>
  <el-dialog title="车辆自定义属性添加" width="30%" style="margin-top:150px" :visible.sync="dialogVisble" @close="close" :close-on-click-modal="false">
    <el-form ref="ruleForm" :rules="rules" :model="form" label-width="100px">
      <el-form-item label="当前属性">
        <el-col :span="20">
          <el-input v-model="title" disabled></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="字段" prop="key">
        <el-col :span="20">
          <el-input v-model="form.key"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="文本" prop="value">
        <el-col :span="20">
          <el-input v-model="form.value"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>

import { carsAttrAdd } from "@/api/carsAttr";

export default {
  name: "carsAttrType",
  props: {
    //弹窗显示隐藏开关
    flagVisble: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
      //表单数据
      form: {
        key: "",
        value: "",
        typeId: "",
      },
      title: "",
      //弹窗的显示隐藏
      dialogVisble: false,
      //表单验证规则
      rules: {
        key: [
          { required: true, message: "字段不能为空", trigger: 'blur' },
        ],
        value: [
          { required: true, message: "文本不能为空", trigger: 'blur' },
        ]
      },
    }
  },
  methods: {
    //关闭按钮
    close() {
      this.$emit("update:flagVisble", false);
      this.form = {};
    },
    //确定按钮
    onSubmit() {
      if (this.form.key != "" && this.form.value != "") {
        this.Add()
      } else {
        this.$message({
          message: "品牌名称不能为空",
          type: "success",
        });
      }
    },
    //自定义属性添加请求接口
    Add() {
      carsAttrAdd(this.form).then((response) => {
        const data = response.data;
        this.$message({
          message: data.message,
          type: "success",
        });
        this.form.key = ""
        this.form.value = ""
        this.$emit("callback", this.form.typeId);
      }).catch((error) => {
        this.dialogVisble = false;
        this.resetForm("ruleForm");
      });
    },

    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  //监听弹窗显示隐藏开关
  watch: {
    data: {
      handler(newVlaue) {
        this.title = newVlaue.value
        this.form.typeId = newVlaue.id
      },
    },
    flagVisble: {
      handler(newVlaue) {
        this.dialogVisble = newVlaue;
      },
    },
  },
};
</script>
<style lang="scss" scoped>
</style>