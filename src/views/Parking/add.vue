<template>
  <div class="parking-add">
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="停车场名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="区域">
       <el-cascader v-model="form.area" :options="options" :props="{ expandTrigger: 'hover' }" @change="handleChange"></el-cascader>
      </el-form-item>
      <el-form-item label="类型" prop="resource">
        <el-radio-group v-model="form.type">
          <el-radio label="室内"></el-radio>
          <el-radio label="室外"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="可停放车辆">
        <el-input v-model="form.carsNumber"></el-input>
      </el-form-item>
      <el-form-item label="禁启用" prop="resource">
        <el-radio-group v-model="form.disabled">
          <el-radio label="1">启用</el-radio>
          <el-radio label="2">禁用</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="位置">
        <div class="address-map"></div>
      </el-form-item>

      <el-form-item label="经纬度">
       <el-input v-model="form.address"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">新增</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name:"ParkingAdd",
  data() {
    return {
      form: 
        {
          name: "",
          type: "",
          area: "",
          carsNumber:"",
          disabled: "1",
          address: "32155,565654",
          operate: ""
        },
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
    }
  }
};
</script>

<style lang="scss" scoped>
.parking-add{
  width: 600px;
}
.address-map{
  width: 500px;
  height: 300px;
  background-color: red;
  border:1px solid #000000;
}
</style>