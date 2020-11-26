<template>
  <div>
    <div class="filter-from">
      <el-row>
        <el-col :span="18">
          <el-form
            :inline="true"
            :model="form"
            class="demo-form-inline"
            label-width="100px"
            label-position="centen"
          >
            <el-form-item label="车辆品牌：">
              <el-select v-model="form.type" placeholder="选择品牌">
                <el-option label="福特" value="1"></el-option>
                <el-option label="奔驰" value="2"></el-option>
                <el-option label="红旗" value="3"></el-option>
                <el-option label="宝马" value="4"></el-option>
                <el-option label="五菱" value="5"></el-option>
              </el-select>
              <el-form-item label="品牌型号：">
                <el-input
                  v-model="form.parking_name"
                  placeholder="型号"
                ></el-input>
              </el-form-item>
            </el-form-item>
            <el-form-item>
              <el-button type="danger" @click="onSubmit">搜索</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6">
          <div class="text-right">
            <el-button type="primary" @click="dialog_show = true"
              >新增车辆品牌</el-button
            >
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 表格数据 -->
    <TableData ref="table" :config="table_conging"></TableData>
    <!-- dialog 弹窗 -->
    <AddCarsBrand :flagVisble.sync="dialog_show"/>
  </div>
</template>
<script>
import TableData from "@/componeents/tableData";

import AddCarsBrand from "@/componeents/dialog/addCarsBrand";
export default {
  name: "CarsBrandIndex",
  components: { AddCarsBrand ,TableData},
  data() {
    return {
      //弹窗标记
      dialog_show: false,
      formLabelWidth: "120px",
      //搜索
      form: {
        parking_name: "",
        type: ""
      },
        //tableData 表格配置
      table_conging: {
        thend: [
          { prop: "nameCh", label: "品牌名称（中文）" },
          { prop: "nameEn", label: "品牌名称（英文）" },
          { prop: "imgUrl", label: "品牌LOGO",},
          { prop: "status", label: "禁启用"},
          { prop: "operate",  label: "操作"},
        ],
        url: "barndList",
        data: {
          pageSize: 10,
          pageNumber: 1,
        },
      },
    };
  },
  methods: {
    onSubmit() {
      this.dialog_show = false;
    }
  },
};
</script>
<style lang="scss" scoped>
.text-right {
  text-align: right;
}
</style>