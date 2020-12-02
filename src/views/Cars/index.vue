<template>
  <div>
    <div class="filter-from">
      <el-row>
        <el-col :span="18">
          <el-form :inline="true" :model="form"  class="demo-form-inline"  label-width="100px"  label-position="centen">
            <el-form-item label="车辆品牌：">
              <el-select v-model="form.type" placeholder="选择品牌">
                <el-option label="福特" value="1"></el-option>
                <el-option label="奔驰" value="2"></el-option>
                <el-option label="红旗" value="3"></el-option>
                <el-option label="宝马" value="4"></el-option>
                <el-option label="五菱" value="5"></el-option>
              </el-select>
              <el-form-item label="品牌型号：">
                <el-input v-model="form.parking_name"  placeholder="型号"></el-input>
              </el-form-item>
            </el-form-item>
            <el-form-item>
              <el-button type="danger" @click="search">搜索</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6">
          <div class="text-right">
            <el-button type="primary" @click="CarsAdd">新增车辆</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 表格数据 -->
   <TableData ref="table" :config="table_conging"></TableData>
  </div>
</template>
<script>
import TableData from "@/componeents/tableData";
export default {
  name: "CarsBrandIndex",
  components: {  TableData },
  data() {
    return {
      formLabelWidth: "120px",
       //表格数据
      table_conging: {
        //表头
        thend: [
          { prop: "nameCh", label: "品牌名称（中文）" },
          { prop: "nameEn", label: "品牌名称（英文）" },
        ],
        //请求地址和参数
        url: "carsList",
        data: {
          pageSize: 10,
          pageNumber: 1,
        },
      },
      //表单数据
      form: {
        parking_name: "",
        name: "",
        type: "",
        area: "",
        carsNumber: "",
        disabled: "1",
        address: "32155,565654",
        operate: "",
      },
    };
  },
  methods: {
    //新增车辆按钮,跳转新增车辆页面
    CarsAdd() {
      this.$router.push({ path: "/carsAdd" });
    },
    //搜索
    search() {
      console.log("submit!");
    }
  },
};
</script>

<style lang="scss" scoped>
.text-right {
  text-align: right;
}
</style>