<template>
  <div>
    <div class="filter-from">
      <el-row>
        <el-col :span="22">
          <el-form :inline="true" :model="form" class="demo-form-inline">
            <el-form-item label="区域">
              <CityArea ref="cityAred" :mapLocation="true" :city_value.sync="form.area" @address="callbackAddress" />
            </el-form-item>
            <el-form-item label="类型">
              <el-select v-model="form.type" placeholder="类型" class="width-120">
                <el-option v-for="item in parking_type" :key="item.label" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="禁启用">
              <el-select v-model="form.status" placeholder="禁启用" class="width-120">
                <el-option v-for="item in parking_status" :key="item.label" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="关键字">
              <el-select v-model="search_key" placeholder="请选择" class="width-120">
                <el-option label="停车场名称" value="parkingName"></el-option>
                <el-option label="详细区域" value="address"></el-option>
              </el-select>
              <el-input v-model="keyword" placeholder="请输入关键字按Enter键搜索" class="width-200 left-10"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="danger" @click="search">搜索</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="2">
          <div class="text-right">
            <el-button @click="parkingAdd" type="primary">新增停车场</el-button>
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
      <!-- 查看地图 -->
      <template v-slot:lnglat="slotData">
        <el-button type="success" size="mini" @click="dialogShow(slotData.data)">查看地图位置</el-button>
      </template>
      <!-- 操作 -->
      <template v-slot:operation="slotData">
        <el-button type="danger" size="mini" @click="parkingEdit(slotData.data.id)">编辑</el-button>
        <el-button type="warning" size="mini" @click="deleteParking(slotData.data.id)">删除</el-button>
      </template>
    </TableData>
    <!-- 弹窗 -->
    <ShowMaoLocation :flagVisble.sync="dialog_show" :data="parking_data" />
  </div>
</template>
<script>
//区域（省市区）组件
import CityArea from "@/componeents/common/cityArea";
//table表格数据
import TableData from "@/componeents/tableData";
//弹窗，显示地图 组件
import ShowMaoLocation from "@/componeents/dialog/showMaoLocation";
//接口 停车场
import { parkingDelete, parkingStatus } from "@/api/parking";
export default {
  name: "ParkingIndex",
  components: { CityArea, ShowMaoLocation, TableData },
  data() {
    return {
      //tableData 表格配置
      table_conging: {
        thend: [
          { prop: "parkingName", label: "停车场名称" },
          {
            prop: "type",
            label: "停车场类型",
            type: "function",
            callback: (row, prop) => {
              //回调，返回停车场类型，（室内、室外）
              const data = this.parking_type_json[row[prop]];
              if (data) return data.label;
            },
          },
          { prop: "address", label: "区域" },
          { prop: "carsNumber", label: "可停放车辆" },
          {
            prop: "status",
            label: "禁启用",
            type: "slot",
            slotName: "status",
          },
          {
            prop: "lnglat",
            label: "查看位置",
            type: "slot",
            slotName: "lnglat",
          },
          {
            prop: "operate",
            label: "操作",
            type: "slot",
            slotName: "operation",
          },
        ],
        url: "parkingList",
        data: {
          pageSize: 10,
          pageNumber: 1,
        },
      },
      //请求API的页码（默认）
      pageSize: 10,
      pageNumber: 1,
      //搜索
      form: {
        area: "",
        type: "",
        status: "",
      },
      keyword: "",
      search_key: "",
      //禁启用按钮状态，防止连续点击
      switch_disabled: "",
      //停车场禁启用及停车场类型数据
      parking_status: this.$store.state.app.parking_status,
      parking_type: this.$store.state.app.parking_type,
      //停车场禁启用及停车场类型数据JSON
      parking_type_json: this.$store.state.app.parking_type_json,
      //显示地图弹窗
      dialog_show: false,
      //显示地图数据
      parking_data: {},
    };
  },
  methods: {
    //新增停车场按钮
    parkingAdd() {
      this.$store.commit("app/SET_ROLES", "/parkingAdd");
      const currentRoute = this.$store.state.app.currentRoute;
      this.$router.push({ path: "parkingAdd" });
    },
    //删除停车广场
    deleteParking(id) {
      this.$confirm("此操作将永久删除该信息", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          parkingDelete({ id }).then((response) => {
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
      parkingStatus(responseData)
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
    //编辑按钮，跳转编辑页面
    parkingEdit(id) {
      this.$router.push({
        path: "parkingAdd",
        query: { id },
      });
    },
    //搜索按钮
    search() {
      const requestData = {
        pageSize: 10,
        pageNumber: 1,
      };
      const filterData = JSON.parse(JSON.stringify(this.form));
      for (let key in filterData) {
        if (filterData[key]) {
          requestData[key] = filterData[key];
        }
      }
      //关键字
      if (this.keyword && this.search_key) {
        requestData[this.search_key] = this.keyword;
      }
      this.$refs.table.requestData(requestData);
    },
    //区域（省市区）回调,执行组件函数
    callbackAddress(params) {
      this.form.area = params.data.addressValue;
    },
    //弹窗，查看地图位置
    dialogShow(data) {
      this.dialog_show = true;
      this.parking_data = data;
    },
  },
  //DOM元素渲染之前 （生命周期）
  beforeMount() { },
  //DOM元素渲染完成 （生命周期）
  mounted() { },
};
</script>
<style lang="scss" scoped>
.text-right {
  text-align: right;
}
.left-10 {
  margin-left: 10px;
}
</style>