<template>
  <div class="parking-add">
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="车辆型号">
        <el-select v-model="form.area" placeholder="车辆型号">
          <el-option label="H8641" value=""></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="停车场">
        <el-select v-model="form.area" placeholder="停车场">
          <el-option label="室内" value=""></el-option>
          <el-option label="室外" value=""></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="车牌号">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="车架号">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="发动机号">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="年检" prop="resource">
        <el-radio-group v-model="form.disabled">
          <el-radio label="1">已年检</el-radio>
          <el-radio label="2">未年检</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="保养日期">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-input v-model="form.name"></el-input>
          </el-col>
          <el-col :span="10">
            <span>下次保养日期 2021年5月10日</span>
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="档位" prop="resource">
        <el-radio-group v-model="form.disabled">
          <el-radio label="1">手动挡</el-radio>
          <el-radio label="2">自动挡</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="能源类型" prop="resource">
        <el-radio-group v-model="form.disabled">
          <el-radio label="1">电</el-radio>
          <el-radio label="2">油</el-radio>
          <el-radio label="3">混合动力</el-radio>
        </el-radio-group>
        <div class="progress-bar-wrap" v-if="form.disabled == 1 || form.disabled == 3">
          <span class="label-text">电量：</span>
          <el-row :gutter="20">
            <el-col :span="5">
              <div class="progress-bar">
                <span style="width: 50%">
                  <label>50%</label>
                </span>
              </div>
            </el-col>
            <el-col :span="2">
              <el-input size="mini" value="50"></el-input>
            </el-col>
          </el-row>
        </div>

        <div class="progress-bar-wrap" v-if="form.disabled == 2 || form.disabled == 3">
          <span class="label-text">油量：</span>
          <el-row :gutter="20">
            <el-col :span="5">
              <div class="progress-bar">
                <span style="width: 50%">
                  <label>50%</label>
                </span>
              </div>
            </el-col>
            <el-col :span="2">
              <el-input size="mini" value="50"></el-input>
            </el-col>
          </el-row>
        </div>
      </el-form-item>

      <el-form-item label="禁启用" prop="resource">
        <el-radio-group v-model="form.disabled">
          <el-radio label="1">禁用</el-radio>
          <el-radio label="2">启用</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="车辆属性">
        <div v-for="(item,index) in cara_attr" :key="item.key" class="cars-attr-list">
          <el-row :gutter="10">
            <el-col :span="2">
              <el-input v-model="item.key1"></el-input>
            </el-col>
            <el-col :span="3">
              <el-input v-model="item.value"></el-input>
            </el-col>
            <el-col :span="2">
              <el-button type="primary" v-if="index==0" @click="addCarsAtter">+</el-button>
              <el-button v-else> - </el-button>
            </el-col>
          </el-row>
        </div>
      </el-form-item>

      <el-form-item label="车辆描述">
        <div ref="editorDom" style="text-align:left;"></div>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="newAdd">新增</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
// 富文本编辑器
import Editor from "wangeditor";
import { CarsAdd } from "@/api/cars";
export default {
  name: "ParkingAdd",
  data() {
    return {
      //富文本对象
      editor: null,
      cara_attr: [
        { key1: 1111, value: 1111 },
        { key1: 2222, value: 2222 },
        { key1: 3333, value: 3333 },
      ],
      form: {
        name: "",
        area: "",
        carsNumber: "",
        disabled: "1",
        address: "32155,565654",
        operate: "",
      },
    };
  },
  methods: {
    //新增车辆
    newAdd() {
      const requestData = {
        // parkingId	true	Number		停车场名称
        // carsBrandId	true	Number		车辆品牌
        // carsMode	true	String		车辆型号）
        // carsNumber	true	String		车牌号
        // carsFrameNumber	true	String		车架号
        // engineNumber	true	String		发动机号
        // yearCheck	true	Boolean		年检（true：已年检，false：未年检）
        // gear	true	Number		档位（1：手动，2：自动，3：人工智能）
        // energyType	true	Number		能源类型（1：电，2：油，3：混合动力）
        // electric	true	Number		电量
        // oil	true	Number		油量
        // carsAttr	true	String		车辆属性（{'颜色': '红色', '驱动':'四驱'}）
        // content	true	String		内容介绍
        // maintainDate	true	Date		保养日期（2020-10-10）
        // status	true	Boolean		禁启用（true：启用，false：禁用）
        // countKm	true	String		总公里（油 || 新能源 || 混合动力）
      }
      CarsAdd(requestData).then((response) => {

      }).catch((error) => {

      })
    },

    addCarsAtter() {
      this.cara_attr.push({
        key1: 4444, value: 4444
      })
    },
    createEditor() {
      this.editor = new Editor(this.$refs.editorDom);
      this.editor.create();
    }
  },
  mounted() {
    this.createEditor()
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
.progress-bar {
  height: 10px;
  width: 100%;
  border-radius: 10px;
  background-color: #ccc;
  margin-top: 15px;
  span {
    position: relative;
    display: block;
    border-radius: 10px;
    height: 100%;
    background-color: #409eff;
  }
  label {
    position: absolute;
    right: 0;
    bottom: 10%;
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