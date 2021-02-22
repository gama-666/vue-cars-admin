<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li v-for="item in menuTab" :key="item.id" :class="{'current':item.current}" @click="toggleMeuu(item)">{{item.txt}}</li>
      </ul>
      <!-- 表单 -->
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" size="small" class="login-form">
        <el-form-item prop="username">
          <label>邮箱</label>
          <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <label>密码</label>
          <el-input type="password" v-model="ruleForm.password" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>

        <el-form-item prop="passwords" v-if="model === 'register'">
          <label>重复密码</label>
          <el-input type="password" v-model="ruleForm.passwords" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>

        <el-form-item prop="code">
          <label>验证码</label>
          <el-row :gutter="11">
            <el-col :span="12">
              <el-input type="text" v-model="ruleForm.code" minlength="6" maxlength="6"></el-input>
            </el-col>
            <el-col :span="12">
              <el-button type="success" round class="block">获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-button type="danger" @click="submitForm('ruleForm')" class="login-bin block">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import {
  stripscript,
  validataEmail,
  validataPassword,
  validataCode
} from "@/utils/validata";

export default {
  name: "login",
  data() {
    /************************************************************************/
    /*表单的验证*/
    //、验证码用户名
    let validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (validataEmail(value)) {
        callback(new Error("用户名格式有误"));
      } else {
        callback();
      }
    };
    //、密码校验
    let validatePassword = (rule, value, callback) => {
      this.ruleForm.password = stripscript(value);
      value = this.ruleForm.password;
      if (value === "") {
        callback(new Error("密码不能为空"));
      } else if (validataPassword(value)) {
        callback(new Error("密码为6~20位数字加字母"));
      } else {
        callback();
      }
    };
    //、重复密码校验
    let validatePasswords = (rule, value, callback) => {
      this.ruleForm.passwords = stripscript(value);
      value = this.ruleForm.passwords;
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value != this.ruleForm.password) {
        callback(new Error("密码不一致"));
      } else {
        callback();
      }
    };
    //、验证码校验
    let checkAge = (rule, value, callback) => {
      this.ruleForm.code = stripscript(value);
      value = this.ruleForm.code;
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else if (validataCode(value)) {
        callback(new Error("格式有误"));
      } else {
        callback();
      }
    };
    /************************************************************************/
    /*数据位置*/
    return {
      //、登录注册按钮的数据
      menuTab: [
        { txt: "登录", current: true, type: "login" },
        { txt: "注册", current: false, type: "register" }
      ],
      //模块值
      model: "login",
      //、表单的数据
      ruleForm: {
        username: "",
        password: "",
        passwords: "",
        code: ""
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        passwords: [{ validator: validatePasswords, trigger: "blur" }],
        code: [{ validator: checkAge, trigger: "blur" }]
      }
    };
  },
  created() { },
  mounted() { },
  /************************************************************************/
  /*函数位置*/
  methods: {
    //、登录注册按钮的状态切换
    toggleMeuu(data) {
      //高光,当前选中
      this.menuTab.forEach(item =>
        item.txt == data.txt ? (item.current = true) : (item.current = false)
      );
      //修改模块的值
      this.model = data.type;
      this.ruleForm.username = "";
    },
    //、表单的方法
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
#login {
  height: 100vh;
  background-color: #344a5f;
}
.login-wrap {
  width: 330px;
  margin: auto;
}
.menu-tab {
  text-align: center;
  padding-top: 120px;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #ffffff;
    border-radius: 2px;
  }
  .current {
    background-color: rgba(0, 0, 0, 0.1);
  }
  .el-form-item__label {
    color: #ffffff;
  }
}
.login-form {
  margin-top: 29px;
  label {
    color: #ffffff;
    display: block;
    font-size: 14px;
    margin-bottom: 3px;
  }
  .login-bin {
    margin-top: 19px;
  }
  .block {
    width: 100%;
    display: block;
  }
}
</style>