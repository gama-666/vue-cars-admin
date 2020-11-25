<template>
  <div>
    <el-table :data="table_data" border style="width: 100%">
      <el-table-column type="selection" v-if="table_config.checkbox" width="40"></el-table-column>
      <template v-for="item in table_config.thend">
        <!-- 如果有 function 回调 -->
        <el-table-column v-if="item.type=='function'" :prop="item.prop" :label="item.label" :key="item.prop">
          <template slot-scope="scope">
            <span>{{item.callback && item.callback(scope.row,item.prop)}}</span>
          </template>
        </el-table-column>
        <!-- 否则纯文本的渲染 -->
        <el-table-column v-else :prop="item.prop" :label="item.label" :key="item.prop"></el-table-column>
      </template>
    </el-table>
  </div>
</template>
<script>
import { GetTableData } from "@/api/common";
export default {
  name: "tableData",
  props: {
    config: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      table_data:[],     //表格数据
      table_config: {
        thend: [],      //表头标题
        checkbox:true,  //复选框是否显示
        url:"",         //请求的接口
      },
    };
  },
  methods: {
    //初始化配置
    initConfig(){
      for(let key in this.config){
        if(Object.keys(this.table_config).includes(key)){
         this.table_config[key]=this.config[key];
        }
      }
      this.loadData()   //配置项完成之后，开始请求接口的表格数据
    },
    //表格数据请求接口
    loadData() {
      const requestData = {
        url: this.table_config.url,
        data: { pageSize: 10, pageNumber: 1 },
      };
      GetTableData(requestData).then((response) => {
        this.table_data = response.data.data.data
      });
    },
  },

  //监听有没有传入值，如果有初始化配置
  watch:{
    config:{
      handler(newVal){
        this.initConfig()
      },
      immediate:true
    }
  },
  //DOM元素渲染之前 （生命周期）
  beforeMount() {},
  //DOM元素渲染完成 （生命周期）
  mounted() {},

};
</script>
<style lang="scss" scoped>
</style>