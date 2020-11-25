<template>
  <div>
    <div class="filter-from">
      <el-row>
        <el-col :span="22">
          <el-form :inline="true" :model="form" class="demo-form-inline">
            <el-form-item label="区域">
              <CityArea
                ref="cityAred"
                :mapLocation="true"
                :city_value.sync="form.area"
                @address="callbackAddress"
              />
            </el-form-item>
            <el-form-item label="类型">
              <el-select
                v-model="form.type"
                placeholder="类型"
                class="width-120"
              >
                <el-option
                  v-for="item in parking_type"
                  :key="item.label"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="禁启用">
              <el-select
                v-model="form.status"
                placeholder="禁启用"
                class="width-120"
              >
                <el-option
                  v-for="item in parking_status"
                  :key="item.label"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="关键字">
              <el-select
                v-model="search_key"
                placeholder="请选择"
                class="width-120"
              >
                <el-option label="停车场名称" value="parkingName"></el-option>
                <el-option label="详细区域" value="address"></el-option>
              </el-select>
              <el-input
                v-model="keyword"
                placeholder="请输入关键字按Enter键搜索"
                class="width-200 left-10"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="danger" @click="getParkingList">搜索</el-button>
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
    <TableData :config="table_conging" />
    <template>
      <el-table
        :data="tableData"
        v-loading="table_loading"
        border
        style="width: 100%"
      >
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column
          prop="parkingName"
          label="停车场名称"
        ></el-table-column>
        <el-table-column prop="type" label="停车场类型">
          <template slot-scope="scope">
            <span>{{ getTyle(scope.row.type) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="区域"></el-table-column>
        <el-table-column prop="carsNumber" label="可停放车辆"></el-table-column>
        <el-table-column prop="status" label="禁启用">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="lnglat" label="查看位置">
          <template slot-scope="scope">
            <el-button type="success" size="mini" @click="dialogShow(scope.row)"
              >查看地图位置</el-button
            >
          </template>
        </el-table-column>
        <el-table-column prop="operate" label="操作">
          <template slot-scope="scope">
            <el-button
              type="danger"
              size="mini"
              @click="parkingEdit(scope.row.id)"
              >编辑</el-button
            >
            <el-button
              type="warning"
              size="mini"
              @click="deleteParking(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
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
    </template>
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
import { ParkingList, parkingDelete } from "@/api/parking";
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
            if(data) return data.label
            }, 
          },
          { prop: "address", label: "区域" },
          { prop: "carsNumber", label: "可停放车辆" },
          { 
            prop: "status", 
            label: "禁启用",
            type: "function",
            callback: (row, prop) => {
              console.log(row[prop])
            }, 
          },
          { prop: "lnglat", label: "查看位置" },
          { prop: "operate", label: "操作" },
        ],
        url: "/parking/list/",
      },

      //数据总条数
      total: 0,
      //当前页码
      currentPage: 1,
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
      //停车场禁启用及停车场类型数据
      parking_status: this.$store.state.app.parking_status,
      parking_type: this.$store.state.app.parking_type,
      //停车场禁启用及停车场类型数据JSON
      parking_type_json: this.$store.state.app.parking_type_json,
      //表格数据加载状态
      table_loading: true,
      //表格数据
      tableData: [],
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
            this.getParkingList();
          });
        })
        .catch();
    },
    //停车场列表请求接口
    getParkingList() {
      //默认请求数据
      const requestData = {
        pageSize: this.pageSize,
        pageNumber: this.pageNumber,
      };
      //当点击的的搜索按钮时，过滤筛选项，请求数据过滤
      const filterData = { ...this.form };
      for (let key in filterData) {
        if (filterData[key]) requestData[key] = filterData[key];
      }
      if (this.search_key && this.keyword)
        requestData[this.search_key] = this.keyword;
      //发送请求
      ParkingList(requestData)
        .then((respone) => {
          this.table_loading = false;
          this.total = respone.data.data.total;
          this.tableData = respone.data.data.data;
        })
        .catch((error) => {
          this.table_loading = false;
        });
    },
    //编辑按钮，跳转编辑页面
    parkingEdit(id) {
      this.$router.push({
        path: "parkingAdd",
        query: { id },
      });
    },
    //区域（省市区）回调,执行组件函数
    callbackAddress(params) {
      this.form.area = params.data.addressValue;
    },
    //返回类型文本
    getTyle(value) {
      const data = this.parking_type.filter((item) => item.value == value);
      if (data && data.length > 0) return data[0].label;
    },
    //页码(10条/页、20条每页、......)
    handleSizeChange(value) {
      this.pageSize = value;
      this.getParkingList();
    },
    //页码(跳转到指定页码)
    handleCurrentChange(value) {
      this.pageNumber = value;
      this.getParkingList();
    },
    //弹窗，查看地图位置
    dialogShow(data) {
      this.dialog_show = true;
      this.parking_data = data;
    },
  },
  //DOM元素渲染之前 （生命周期）
  beforeMount() {
    this.getParkingList();
  },
  //DOM元素渲染完成 （生命周期）
  mounted() {},
};
</script>

<style lang="scss" scoped>
.text-right {
  text-align: right;
}
.block {
  margin-top: 20px;
  text-align: right;
}
.left-10 {
  margin-left: 10px;
}
</style>