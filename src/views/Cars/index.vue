<template>
  <div>
    <div class="filter-from">
      <el-row>
        <el-col :span="18">
          <el-form :inline="true" :model="form" class="demo-form-inline" label-width="100px" label-position="centen">
            <el-form-item label="车辆品牌：">
              <el-select v-model="form.type" placeholder="选择品牌">
                <el-option label="福特" value="1"></el-option>
                <el-option label="奔驰" value="2"></el-option>
                <el-option label="红旗" value="3"></el-option>
                <el-option label="宝马" value="4"></el-option>
                <el-option label="五菱" value="5"></el-option>
              </el-select>
              <el-form-item label="品牌型号：">
                <el-input v-model="form.parking_name" placeholder="型号"></el-input>
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
    <TableData ref="table" :config="table_conging">
      <!-- 禁启用 -->
      <template v-slot:status="slotData">
        <el-switch @change="switchChang(slotData.data)" v-model="slotData.data.status" :disabled="slotData.data.id == switch_disabled" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </template>
      <!-- 操作 -->
      <template v-slot:operation="slotData">
        <el-button type="danger" size="mini" @click="carsEdit(slotData.data.id)">编辑</el-button>
        <el-button type="warning" size="mini" @click="deleteCars(slotData.data.id)">删除</el-button>
      </template>
    </TableData>
  </div>
</template>
<script>
import TableData from "@/componeents/tableData";
import { CarsDelete, CarsStatus } from "@/api/cars";  //车辆删除，禁启用
export default {
  name: "CarsBrandIndex",
  components: { TableData },
  data() {
    return {
      formLabelWidth: "120px",
      //表格数据
      table_conging: {
        //表头
        thend: [
          { prop: "nameCh", label: "品牌名称" },
          { prop: "parkingName", label: "停车场名称" },
          { prop: "carsMode", label: "车辆品牌" },
          { prop: "address", label: "城市" },
          { prop: "status", label: "禁启用", type: "slot", slotName: "status", },
          { prop: "operate", label: "操作", type: "slot", slotName: "operation", },
        ],
        //请求地址和参数
        url: "carsList",
        data: {
          pageSize: 10,
          pageNumber: 1,
        },
      },
      //禁启用按钮状态，防止连续点击
      switch_disabled: "",
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
    //删除停车广场
    deleteCars(id) {
      this.$confirm("此操作将永久删除该信息", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          CarsDelete({ id }).then((response) => {
            let data = response.data;
            this.$message({
              message: data.message,
              type: "success",
            });
            this.$refs.table.requestData();
          });
        })
        .catch();
    },
    //禁启用
    switchChang(params) {
      const responseData = {
        id: params.id,
        status: params.status,
      };
      this.switch_disabled = params.id;
      CarsStatus(responseData)
        .then((response) => {
          let data = response.data;
          this.$message({
            message: data.message,
            type: "success",
          });
          this.switch_disabled = "";
        })
        .catch((error) => {
          this.switch_disabled = "";
        });
    },
    //编辑按钮，跳转详情页面
    carsEdit(id) {
      this.$router.push({
        path: "carsAdd",
        query: { id },
      });
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