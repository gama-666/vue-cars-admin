<template>
  <el-select v-model="data.selectValue" placeholder="请选择" @change="select">
    <el-option
      v-for="item in data.initOption"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    ></el-option>
  </el-select>
</template>
<script>
import { reactive, onMounted } from "@vue/composition-api";
export default {
  name: "useSelect",
  props: {
    config: {
      type: Object,
      default: _ => {}
    },
    selectData: {
      type: Object,
      default: _ => {}
    }
  },
  setup(props,{emit}) {
    const data = reactive({
      //默认搜索类型
      selectValue: "",
      //初始化默认值
      initOption: [],
      //可匹配的数据
      option: [
        { value: "name", label: "姓名" },
        { value: "phone", label: "手机号" },
        { value: "email", label: "邮箱" },
        { value: "id", label: "ID" },
        { value: "title", label: "标题" }
      ]
    });
    /*初始化下拉对象*/
    let initOption = () => {
      //接收传入的值
      let initData = props.config.init;
      let optionArr = [];
      //数据校验
      if (initData.length === 0) {
        console.log("config的参数是空的，无法显示下拉菜单");
        return false;
      }
      //筛选,根据传入的数据筛选
      initData.forEach(item => {
        let newArr = data.option.filter(elem => elem.value == item);
        if (newArr.length > 0) {
          optionArr.push(newArr[0]);
        }
      });
      //数据校验
      if (optionArr.length === 0) {
        console.log(
          "匹配的数据为空，请重新传参，或者在option中添加需要匹配的数据"
        );
        return false;
      }
      //初始化赋值
      data.initOption = optionArr;
      //初始化搜索类型
      data.selectValue = optionArr[0].value;
    };

    //选择出发
    const select = val => {
      let newData = data.option.filter(item => item.value === val)[0];
      emit("update:selectData",newData)
    };

    /*挂载完成后*/
    onMounted(() => {
      initOption();
    });
    return {
      data,
      select
    };
  }
};
</script>
<style lang="scss" scoped>
</style>

<!--
组件目录位置：src/componeents/Select/index.vue;
组件引用方式：import SelectValue from "@/componeents/Select";
template: <SelectValue :config="data.configOption" />  

参数配置：
 configOption: {
    init: ["name", "phone"]
 }  

 configOption：{
    init:[]
 }
    init:
        数据类型: Array;[]
        可配置的数据："name","phone","email","id","title";

-->