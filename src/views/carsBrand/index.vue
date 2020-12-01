<template>
  <div>
    <div class="filter-from">
      <el-row>
        <el-col :span="18">
          <el-form :inline="true" :model="form" class="demo-form-inline" label-width="100px" label-position="centen">
            <el-form-item label="车辆品牌：">
              <el-select v-model="form.nameCh" placeholder="选择品牌">
                <el-option label="福特" value="福特"></el-option>
                <el-option label="奔驰" value="奔驰"></el-option>
                <el-option label="红旗" value="红旗"></el-option>
                <el-option label="宝马" value="宝马"></el-option>
                <el-option label="五菱" value="五菱"></el-option>
              </el-select>
              <el-form-item label="品牌型号：">
                <el-input v-model="form.nameEn"  placeholder="型号" ></el-input>
              </el-form-item>
            </el-form-item>
            <el-form-item>
              <el-button type="danger" @click="search">搜索</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6">
          <div class="text-right">
            <el-button type="primary" @click="dialog_show = true">新增车辆品牌</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 表格数据 -->
    <TableData ref="table" :config="table_conging">
     <!-- 禁启用 -->
      <template v-slot:status="slotData">
        <el-switch
          @change="switchChang(slotData.data)"
          v-model="slotData.data.status"
          :disabled="slotData.data.id == switch_disabled"
          active-color="#13ce66"
          inactive-color="#ff4949"
        ></el-switch>
      </template>
       <!-- 操作 -->
      <template v-slot:logo="slotData">
          <img  :src="slotData.data.imgUrl" width="50px" height="50px" /> 
      </template>
       <!-- 操作 -->
      <template v-slot:operation="slotData">
        <el-button type="danger" size="mini"  @click="brandEdit(slotData.data)">编辑</el-button>
        <el-button type="warning" size="mini" @click="deletebrand(slotData.data.id)" >删除</el-button>
      </template>
    </TableData>
    <!-- dialog 弹窗 -->
    <AddCarsBrand :flagVisble.sync="dialog_show" :data="form" v-on:callback="loadata" />
  </div>
</template>
<script>
import TableData from "@/componeents/tableData";
import AddCarsBrand from "@/componeents/dialog/addCarsBrand";
import { BrandStatus,BrandDelete } from "@/api/barnd";
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
      //禁启用按钮状态，防止连续点击
      switch_disabled: "",
      //tableData 表格配置
      table_conging: {
        //表头
        thend: [
          {
            prop: "imgUrl", 
            label: "品牌LOGO",
            type: "slot",
            slotName: "logo"
          },
          { prop: "nameCh", label: "品牌名称（中文）" },
          { prop: "nameEn", label: "品牌名称（英文）" },
          { 
            prop: "status", 
            label: "禁启用",
            type: "slot",
            slotName: "status"
          },
          { 
            prop: "operate",  
            label: "操作",
            type: "slot",
            slotName: "operation",
          },
        ],
        //请求地址和参数
        url: "barndList",
        data: {
          pageSize: 10,
          pageNumber: 1,
        },
      },
      form: {},
    };
  },
  methods: {
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
      console.log(requestData)
      this.$refs.table.requestData(requestData);
    },
    //编辑汽车品牌
    brandEdit(params){
      this.form = {...params};
      this.dialog_show = true; 
    },
    //删除汽车品牌
    deletebrand(id) {
      this.$confirm("此操作将永久删除该信息", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          BrandDelete({ id }).then((response) => {
            let data = response.data;
            this.$message({
              message: data.message,
              type: "success",
            });
            this.loadata()
          });
        })
        .catch();
    },
    //汽车品牌禁启用
    switchChang(params) {
      const responseData = {
        id: params.id,
        status: params.status,
      };
      this.switch_disabled = params.id;
      BrandStatus(responseData)
        .then((response) => {
          let data = response.data;
          this.$message({
            message: data.message,
            type: "success",
          });
          this.switch_disabled = "";
        }).catch(error => { this.switch_disabled = ""});
    },
    //刷新表格数据
    loadata(){
      this.$refs.table.requestData();   
    },
  },
};
</script>
<style lang="scss" scoped>
.text-right {
  text-align: right;
}
</style>