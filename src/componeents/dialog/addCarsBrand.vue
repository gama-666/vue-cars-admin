<template>
  <el-dialog title="新增车辆品牌" :visible.sync="dialogVisble" @opened="opened" @close="close" :close-on-click-modal="false">
    <el-form ref="ruleForm" :model="form" label-width="100px">
      <el-form-item label="品牌中文" prop="nameCh">
        <el-col :span="10">
          <el-input v-model="form.nameCh"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="品牌英文" prop="nameEn">
        <el-col :span="10">
          <el-input v-model="form.nameEn"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="LOGO" prop="logo_current">
        <div class="upload-img-wrap">
          <div class="upload-img">
            <img v-show="logo_current" :src="logo_current" />
          </div>
          <ul class="img-list">
            <li v-for="item in logo_data" :key="item.id"  @click="logo_current = item.img">
              <img :src="item.img" :alt="item.name" />
            </li>
          </ul>
        </div>
      </el-form-item>
      <el-form-item label="禁启用" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio v-for="item in radio_disabled" :key="item.id" :label="item.value"  >{{ item.label }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="描述">
        <div class="address-map"></div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import { BrandLogo, BrandAdd } from "@/api/barnd";
export default {
  name: "AddCarsBrand",
  props: {
    //弹窗显示隐藏开关
    flagVisble: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      //表单数据
      form: {
        nameCh: "",
        nameEn: "",
        imgUrl: "",
        status: "",
        content: "",
      },
      //弹窗的显示隐藏
      dialogVisble: false,
      //车辆logo标志
      logo_current: "",
      logo_data: [],
      //禁启用状态
      radio_disabled: this.$store.state.config.radio_disabled,
    };
  },
  methods: {
    //关闭按钮
    close() {
      this.$emit("update:flagVisble", false);
      this.logo_current = "";
    },
    //确定按钮
    onSubmit() {
      this.$emit("update:flagVisble", false);
      this.brandAdd();
    },
    //添加请求接口
    brandAdd() {
      this.form.imgUrl = this.logo_current;
      BrandAdd(this.form)
        .then((response) => {
          const data = response.data;
          this.$message({
            message: data.message,
            type: "success",
          });
          this.resetForm("ruleForm");
        })
        .catch((error) => {
          this.resetForm("ruleForm");
        });
    },
    //弹窗打开时回调
    opened() {
      this.getBarndLogo();
    },
    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.logo_current = "";
    },
    //请求车辆logo标志
    getBarndLogo() {
      if (this.logo_data.length != 0) {
        return false;
      }
      BrandLogo().then((response) => {
        if (response.data.data) {
          this.logo_data = response.data.data;
        }
      });
    },
  },
  //监听弹窗显示隐藏开关
  watch: {
    flagVisble: {
      handler(newVlaue, oldVlaue) {
        this.dialogVisble = newVlaue;
      },
    },
  },
};
</script>
<style lang="scss" scoped>
.upload-img-wrap {
  display: flex;
  .upload-img {
    position: relative;
    width: 148px;
    height: 148px;
    cursor: pointer;
    line-height: 146px;
    border: 1px dashed #c0ccda;
    background-color: #fbfdff;
    border-radius: 6px;
    box-sizing: border-box;
    text-align: center;
    vertical-align: top;
    &:before {
      content: "+";
      font-size: 40px;
      color: #dedede;
      font-weight: 200;
    }
    img {
      position: absolute;
      left: 0px;
      top: 0px;
      width: 100%;
      height: 100%;
    }
  }
  .img-list {
    flex: 1;
    padding-left: 30px;
    li {
      float: left;
      width: 60px;
      height: 60px;
      margin: 0 10px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
.address-map {
  width: 500px;
  height: 100px;
  background-color: #f5f5f5;
  border: 1px solid #dedede;
}
</style>