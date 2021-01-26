<template>
  <div class="parking-add">
    <VueForm :formItem="form_item" :formData="form_data" ref="vueForm" :formHandler="form_handler">
      <template v-slot:maintainDate>
        <el-row :gutter="10">
          <el-col :span="4">
            <el-date-picker v-model="form_data.maintainDate" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
          </el-col>
          <el-col :span="10"><span>下次保养日期 2021年5月10日</span></el-col>
        </el-row>
      </template>

      <template v-slot:energyType>
        <el-radio-group v-model="form_data.energyType" @change="changeEnergyType">
          <el-radio v-for="item in energyType" :key="item.value" :label="item.value">{{item.label}}</el-radio>
        </el-radio-group>
        <div class="progress-bar-wrap" v-if="form_data.energyType == 1 || form_data.energyType == 3">
          <span class="label-text">电量：</span>
          <el-row :gutter="24">
            <el-col :span="10">
              <el-slider v-model="form_data.electric" show-input>
              </el-slider>
            </el-col>
          </el-row>
        </div>
        <div class="progress-bar-wrap" v-if="form_data.energyType == 2 || form_data.energyType == 3">
          <span class="label-text">油量：</span>
          <el-row :gutter="24">
            <el-col :span="10">
              <el-slider v-model="form_data.oil" show-input></el-slider>
            </el-col>
          </el-row>
        </div>
      </template>

      <template v-slot:carsAttr>
        <el-button type="primary" @click="addCarsAtter">添加车辆属性</el-button>
        <div v-for="(item,index) in cars_Attr" :key="item.key" class="cars-attr-list">
          <el-row :gutter="10">
            <el-col :span="2">
              <el-input v-model="item.attr_key"></el-input>
            </el-col>
            <el-col :span="3">
              <el-input v-model="item.attr_value"></el-input>
            </el-col>
            <el-col :span="2">
              <el-button @click="removeCarsAtter(index)">删除</el-button>
            </el-col>
          </el-row>
        </div>
      </template>
    </VueForm>
  </div>
</template>
<script>
import { CarsAdd, CarsDetailed, CarsEdit } from "@/api/cars";  //新增接口、详情、修改
import { GetCarsBrand, GetParking } from "@/api/common";  //车辆品牌和停车场接口
import VueForm from "@/componeents/form";  //form表单
export default {
  name: "CarsAdd",
  components: { VueForm },
  data() {
    return {
      //能源类型固定数据
      energyType: this.$store.state.config.energyType,
      //表单配置项
      form_item: [
        { type: "Select", label: "车辆品牌", prop: "carsBrandId", placeholder: "请选择车辆品牌", select_id: "id", select_value: "nameCh", options: [], required: true },
        { type: "Select", label: "停车场", prop: "parkingId", placeholder: "请选择停车场", select_id: "id", select_value: "parkingName", options: [], required: true },
        { type: "Input", label: "车辆型号", prop: "carsMode", placeholder: "请输入车辆型号", width: "200px", required: true },
        { type: "Input", label: "车牌号", prop: "carsNumber", placeholder: "请输入车牌号", width: "200px", required: true },
        { type: "Input", label: "车架号", prop: "carsFrameNumber", placeholder: "请输入车架号", width: "200px", required: true },
        { type: "Input", label: "发动机号", prop: "engineNumber", placeholder: "请输入发动机号", width: "200px", required: true },
        { type: "Radio", label: "年检", prop: "yearCheck", placeholder: "请选择禁年检", options: this.$store.state.config.year_check },
        { type: "Slot", label: "保养日期", slotName: "maintainDate", placeholder: "请输入保养日期", prop: "maintainDate" },
        { type: "Radio", label: "档位", prop: "gear", placeholder: "请选择禁档位", options: this.$store.state.config.gear },
        { type: "Slot", label: "能源类型", slotName: "energyType", placeholder: "请选择能源类型", prop: "energyType" },
        { type: "Disabled", label: "禁启用", placeholder: "请选择禁启用", prop: "status" },
        { type: "Slot", label: "车辆属性", slotName: "carsAttr", prop: "carsAttr" },
        { type: "wangeditor", label: "车辆描述", prop: "content" }
      ],
      //表单确定按钮
      form_handler: [{ label: '确定', type: 'primary', handler: () => this.formValidate() }],
      //表单数据
      form_data: {
        parkingId: "",	 //true	Number		停车场名称
        carsBrandId: "",	//true	Number		车辆品牌
        carsMode: "",	//true	String		车辆型号
        carsNumber: "",	//true	String		车牌号
        carsFrameNumber: "",	//true	String		车架号
        engineNumber: "",	//true	String		发动机号
        yearCheck: false,	//true	Boolean		年检（true：已年检，false：未年检）
        gear: 1,	//true Number		档位（1：手动，2：自动，3：人工智能）
        energyType: 1,	//true	Number		能源类型（1：电，2：油，3：混合动力）
        electric: 100,	//true	Number		电量
        oil: 0,	//true	Number		油量
        carsAttr: [],	//true	String		车辆属性（{'颜色': '红色', '驱动':'四驱'}）
        content: "",	//true	String		内容介绍
        maintainDate: "",	//true	Date		保养日期（2020-10-10）
        status: true,	//true	Boolean		禁启用（true：启用，false：禁用）
      },
      cars_Attr: [], //车辆属性（{'颜色': '红色', '驱动':'四驱'}）
      id: this.$route.query.id, //编辑按钮传过来的id
    }
  },
  methods: {
    //确定按钮
    formValidate() {
      this.formatCarsAttr() //车辆属性格式化
      // 表单验证
      this.$refs.vueForm.$refs.ruleForm.validate((valid) => {
        if (valid) { //验证通过
          //判断是否有id，没有就添加、有就修改
          this.id ? this.carsEdit() : this.newAdd();
        }
      })
    },
    //新增车辆接口
    newAdd() {
      CarsAdd(this.form_data).then((response) => {
        this.$message({
          message: response.data.message,
          type: "success"
        })
        this.$refs.vueForm.reset();
        this.cars_Attr = [];
        this.form_data.content = "";
      })
    },
    //车辆编辑接口
    carsEdit() {
      CarsEdit({ ...this.form_data, id: this.id }).then((response) => {
        this.$message({
          message: response.data.message,
          type: "success"
        })
      })
    },
    //获取车辆品牌
    getCarsBrandList() {
      GetCarsBrand().then((respone) => {
        const data = respone.data.data.data;
        if (data) {
          const carsBrand = this.form_item.filter(item => item.prop == "carsBrandId");
          if (carsBrand.length > 0) carsBrand[0].options = data
        }
      })
    },
    //获取停车场
    getParking() {
      GetParking().then((respone) => {
        const data = respone.data.data.data;
        if (data) {
          const parkingId = this.form_item.filter(item => item.prop == "parkingId");
          if (parkingId.length > 0) parkingId[0].options = data;
        }
      })
    },
    //能源类型发生改变时
    changeEnergyType() {
      this.form_data.electric = 0;
      this.form_data.oil = 0;
    },
    //添加车辆属性
    addCarsAtter() {
      this.cars_Attr.push({
        attr_key: '', attr_value: ''
      });
    },
    //删除车辆属性
    removeCarsAtter(index) {
      this.cars_Attr.splice(index, 1);
    },
    //车辆属性格式化
    formatCarsAttr() {
      let data = this.cars_Attr;
      if (data && data.length == 0) { return false };
      const carsAttr = {};
      data.forEach(item => {
        if (item.attr_key) {
          carsAttr[item.attr_key] = item.attr_value;
        }
      });
      this.form_data.carsAttr = JSON.stringify(carsAttr)
    },
    //车辆详情
    carsDetailed() {
      if (this.id) {
        CarsDetailed({ id: this.id }).then(response => {
          //车辆属性格式化
          if (response.data.data.carsAttr != "Array") {
            let obj = JSON.parse(response.data.data.carsAttr);
            for (let key in obj) {
              this.cars_Attr.push({
                attr_key: key, attr_value: obj[key]
              })
            }
          }
          this.form_data = response.data.data;
        })
      }
    },
  },
  mounted() {
    this.getCarsBrandList()   //获取车辆品牌
    this.getParking()         //获取停车场
    this.carsDetailed()       //车辆详情
  },
};
</script>
<style lang="scss" scoped>
.progress-bar-wrap {
  margin-top: 10px;
  position: relative;
  padding-left: 60px;
  .label-text {
    position: absolute;
    left: 0;
  }
}
.cars-attr-list {
  padding-left: 6px;
  margin-top: 5px;
}
.address-describe {
  width: 500px;
  height: 200px;
  background-color: #dedede;
}
</style>