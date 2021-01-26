<template>
  <div>
    <div class="filter-from">
      <el-row>
        <el-col :span="18">
          <el-form :inline="true" :model="form" class="demo-form-inline" label-width="100px" label-position="centen">
            <el-form-item label="车辆品牌：">
              <el-select v-model="form.carsBrand" placeholder="选择品牌">
                <el-option v-for="item in form.option" :key="item.id" :value="item.nameEn" :label="item.nameCh"></el-option>
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
import { GetCarsBrand } from "@/api/common";  //车辆品牌
import { CarsList } from "@/api/cars";  //车辆列表

export default {
  name: "CarsIndex",
  components: { TableData },
  data() {
    return {
      formLabelWidth: "120px",
      //表格数据
      table_conging: {
        //表头
        thend: [
          { prop: "nameCh", label: "车辆品牌", width: "100px" },
          { prop: "imgUrl", label: "车辆LOGO", type: "image", width: "150px", imgWidth: 40 },
          { prop: "address", label: "区域" },
          { prop: "parkingName", label: "停车场名称" },
          { prop: "carsMode", label: "品牌名称" },
          {
            prop: "yearCheck", label: "年检", type: "function", width: "100px",
            callback: (row, prop) => {
              const data = this.$store.state.config.year_check;
              const filterData = data.filter(item => item.value == parseInt(row[prop]))
              if (filterData.length > 0) {
                return filterData[0].label
              }
              return ""
            }
          },
          {
            prop: "energyType", label: "能源类型", type: "function",
            callback: (row, prop) => {
              const data = this.$store.state.config.energyType;
              const filterData = data.filter(item => item.value == parseInt(row[prop]))
              if (filterData.length > 0) {
                return filterData[0].label
              }
              return ""
            }
          },
          { prop: "status", label: "禁启用", type: "slot", slotName: "status", width: "100px" },
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
        carsBrand: "",     //车辆品牌
        option: [],   //默认车辆品牌数据
        parking_name: "", //品牌型号
      },
    };
  },
  methods: {
    //新增车辆按钮,跳转新增车辆页面
    CarsAdd() {
      this.$router.push({ path: "/carsAdd" });
    },
    //获取车辆品牌
    getCarsBrandList() {
      GetCarsBrand().then((respone) => {
        const data = respone.data.data.data;
        if (data) {
          this.form.option = data;
        }
      })
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
    this.getCarsBrandList()   //获取车辆品牌
  },
};
</script>

<style lang="scss" scoped>
.text-right {
  text-align: right;
}
</style>