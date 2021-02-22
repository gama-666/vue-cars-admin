<template>
  <div>
    <div class="filter-from">
      <el-row>
        <el-col :span="24">
          <el-form :inline="true" :model="form" class="demo-form-inline" label-width="100px" label-position="centen">
            <el-form-item label="车辆属性：">
              <el-select v-model="form.carsBrand" placeholder="选择属性">
                <el-option v-for="item in form.option" :key="item.id" :value="item.value" :label="item.label"></el-option>
              </el-select>
              <el-form-item class="left-10">
                <el-input v-model="form.parking_name" placeholder="型号"></el-input>
              </el-form-item>
            </el-form-item>
            <el-form-item>
              <el-button type="danger" @click="search">搜索</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="addType">新增</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <div class="cars-list">
      <el-button size="mini" v-for="item in form.cars_list" :key="item.id" @click="getTypeList(item)">{{item.value}}</el-button>
    </div>
    <!-- 表格数据 -->
    <TableData ref="table" :config="table_conging"></TableData>
    <!-- 自定义属性添加，弹窗 -->
    <CarsAttrType :flagVisble.sync="dialog_show" :data="current_cars_type_data" v-on:callback="loadata" />
  </div>
</template>
<script>
//表格组件
import TableData from "@/componeents/tableData";
// 弹窗组件
import CarsAttrType from "@/componeents/dialog/carsAttrType"
//车辆公用属性列表
import { carsAttrType } from "@/api/carsAttr";
export default {
  name: "CarsAttr",
  components: { TableData, CarsAttrType },
  data() {
    return {
      formLabelWidth: "120px",
      //表格数据
      table_conging: {
        //表头
        thend: [
          { prop: "key", label: "字段", },
          { prop: "value", label: "文本", },
        ],
        //请求地址和参数
        url: "carsAttrList",
        isReqest: false, //首次不请求接口数据
        pagination: false,
        data: {
          pageSize: 10,
          pageNumber: 1,
        },
      },
      //表单数据
      form: {
        carsBrand: "",     //车辆品牌
        option: this.$store.state.config.keyword_options,  //默认车辆品牌数据
        parking_name: "", //品牌型号
        cars_list: [],      //关键字默认公用属性数据
      },
      //弹窗标记
      dialog_show: false,
      //当前公用属性的数据
      current_cars_type_data: {}
    };
  },
  methods: {
    //新增自定义属性
    addType() {
      if (this.current_cars_type_data.id) {
        this.dialog_show = true;
      } else {
        this.$message({
          message: "请先选择基本属性",
          type: "error",
        });
        return false
      }
    },
    //自定义属性单击事件,获取车辆属性，并存数据
    getTypeList(item) {
      this.current_cars_type_data = item;
      this.getCarsAttrList(item.id)
    },
    //获取车辆自定义属性
    getCarsAttrList(id) {
      this.$refs.table.requestData({ typeId: id })
    },
    //添加自定义属性的回调,刷新列表
    loadata(id) {
      this.getCarsAttrList(id)
    },
    //获取车辆公用属性列表
    getCarsAttrType() {
      return carsAttrType().then(response => {
        const data = response.data.data.data;
        this.form.cars_list = data;
        return data
        //第一种做法:默认显示的第一个的数据
        // this.getCarsAttrList(data[0].id);
      })
    },
    //第二种做法:默认显示的第一个的数据
    async getCarsType() { //执行
      const data = await this.getCarsAttrType()  //等待--接口处理完成
      this.getCarsAttrList(data[0].id);
    },
    //搜索
    search() {
      const requestData = {
        pageSize: 10,
        pageNumber: 1,
        carsBrand: this.form.carsBrand,
        carsMode: this.form.parking_name
      }
      this.$refs.table.requestData(requestData);
    }
  },
  mounted() {
    // 第一种做法:默认显示的第一个的数据
    // this.getCarsAttrType()
    //第二种做法:默认显示的第一个的数据
    this.getCarsType()
  },
};
</script>

<style lang="scss" scoped>
.text-right {
  text-align: right;
}
.cars-list {
  margin-bottom: 22px;
}
</style>