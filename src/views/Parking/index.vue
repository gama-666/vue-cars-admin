<template>
  <div>
    <div class="filter-from">
        <el-row>
            <el-col :span="18">
                <el-form :inline="true" :model="form" class="demo-form-inline">
                    <el-form-item label="停车场名称">
                    <el-input v-model="form.parking_name" placeholder="停车场名称"></el-input>
                    </el-form-item>
                    <el-form-item label="区域">
                    <el-cascader v-model="form.area" :options="options" :props="{ expandTrigger: 'hover' }" @change="handleChange"></el-cascader>
                    </el-form-item>
                    <el-form-item label="类型">
                    <el-select v-model="form.type" placeholder="类型">
                        <el-option label="室内" value="shanghai"></el-option>
                        <el-option label="室外" value="beijing"></el-option>
                    </el-select>
                    </el-form-item>
                    <el-form-item>
                    <el-button type="danger" @click="onSubmit">搜索</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="6">
                <div class="text-right">
                    <el-button @click="parkingAdd" type="primary">新增停车场</el-button>
                </div>
            </el-col>
        </el-row>
    </div>
    <!-- 表格数据 -->
    <template>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column prop="name" label="停车场名称"></el-table-column>
        <el-table-column prop="type" label="停车场类型"></el-table-column>
        <el-table-column prop="area" label="区域"></el-table-column>
        <el-table-column prop="carsNumber" label="可停放车辆"></el-table-column>
        <el-table-column prop="disabled" label="禁启用">
          <template slot-scope="scope">
              <el-switch v-model="scope.row.disabled" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="查看位置"></el-table-column>
        <el-table-column prop="operate" label="操作">
          <template>
            <el-button type="danger" size="mini">编辑</el-button>
            <el-button type="warning" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>
<script>
export default {
  name: "ParkingIndex",
  data() {
    return {
      //表单数据
      form: {
        parking_name: "",
        area: "",
        type: ""
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
          operate: ""
        }
      ],
      //搜索区域下拉
      options: [
        {
          value: "fankui",
          label: "安徽省",
          children: [
            {
              value: "1111",
              label: "合肥市",
              children: [
                { value: "444", label: "包河区" },
                { value: "555", label: "蜀山区" },
                { value: "666", label: "瑶海区" }
              ]
            },
            {
              value: "2222",
              label: "安庆市"
            }
          ]
        }
      ]
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleChange(value) {
      console.log(value);
    },
    parkingAdd(){
      this.$store.commit("app/SET_ROLES", '/parkingAdd');
      this.$router.push({ path: 'parkingAdd' })
    }
  }
};
</script>

<style lang="scss" scoped>
.text-right{
    text-align: right;
}
</style>