<template>
  <div>
    <el-table  :data="table_data" border style="width: 100%"   v-loading="table_loading">
      <el-table-column type="selection" v-if="table_config.checkbox" width="40"></el-table-column>
      <template v-for="item in table_config.thend">
        <!-- 如果有 function 回调 -->
        <el-table-column v-if="item.type=='function'" :prop="item.prop" :label="item.label" :key="item.prop">
          <template slot-scope="scope">
            <span>{{item.callback && item.callback(scope.row,item.prop)}}</span>
          </template>
        </el-table-column>
        <!-- 插槽 slot -->
        <el-table-column v-else-if="item.type=='slot'" :prop="item.prop" :label="item.label" :key="item.prop">
          <template slot-scope="scope">
              <slot :name="item.slotName" :data="scope.row"></slot>
          </template>
        </el-table-column>
        <!-- 否则纯文本的渲染 -->
        <el-table-column v-else :prop="item.prop" :label="item.label" :key="item.prop"></el-table-column>
      </template>
    </el-table>
       <!-- 分页 -->
      <div class="block" v-if="table_config.pagination">
       <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
     
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
      table_data:[],    //表格数据
      table_config: {
        thend: [],      //表头标题
        checkbox:true,  //复选框是否显示
        url:"",         //请求的接口
        data:{},
        pagination:true //配置分页，默认显示
      },
      total: 0,         //数据总条数
      currentPage: 1,   //当前页码
      table_loading:true,
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
        data:this.table_config.data
      };
      GetTableData(requestData).then((response) => {
        this.table_data = response.data.data.data;
        this.total = response.data.data.total;
        this.table_loading = false;
      });
    },
    requestData(params){
      if(params){ this.table_config.data = params}
      this.loadData()
    },
    //页码(10条/页、20条每页、......)
    handleSizeChange(value) {
      this.table_config.data.pageSize = value;
      this.loadData();
    },
    //页码(跳转到指定页码)
    handleCurrentChange(value) {
      this.table_config.data.pageNumber = value;
      this.loadData();
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
.block {
  margin-top: 20px;
  text-align: right;
}
</style>