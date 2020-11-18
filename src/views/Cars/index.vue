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
    <template>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column prop="name" label="LOGO"></el-table-column>
        <el-table-column prop="type" label="车辆品牌"></el-table-column>
        <el-table-column prop="area" label="品牌型号"></el-table-column>
        <el-table-column prop="disabled" label="禁启用">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.disabled"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="operate" label="操作">
          <template>
            <el-button type="danger" size="mini">编辑</el-button>
            <el-button type="warning" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- dialog 弹窗 -->
    <AddCarsBrand :flagVisble.sync="dialog_show" :form="form"/>
  </div>
</template>
<script>
import AddCarsBrand from "@/componeents/dialog/addCarsBrand";
export default {
  name: "CarsBrandIndex",
  components: { AddCarsBrand },
  data() {
    return {
      //弹窗标记
      dialog_show: false,
      formLabelWidth: "120px",
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
      //表格数据
      tableData: [
        {
          name: "包河区停车场",
          type: "室内",
          area: "合肥市包河区万岗路",
          carsNumber: 20,
          disabled: true,
          address: "32155,565654",
          operate: "",
        },
      ],
    };
  },
  methods: {
    onSubmit() {
      this.dialog_show = false;
      console.log("submit!");
    },
    handleChange(value) {
      console.log(value);
    },
  },
};
</script>

<style lang="scss" scoped>
.text-right {
  text-align: right;
}
</style>