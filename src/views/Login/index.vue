<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          v-for="item in menuTab"
          :key="item.id"
          :class="{ current: item.current }"
          @click="toggleMenu(item)"
        >
          {{ item.txt }}
        </li>
      </ul>
      <!-- 表单 -->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        size="small"
        class="login-form"
      >
        <el-form-item prop="username">
          <label for="username">邮箱</label>
          <el-input
            id="username"
            type="text"
            v-model="ruleForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <label for="password">密码</label>
          <el-input
            id="password"
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>

        <el-form-item prop="passwords" v-if="model === 'register'">
          <label for="passwords">重复密码</label>
          <el-input
            id="passwords"
            type="password"
            v-model="ruleForm.passwords"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>

        <el-form-item prop="code">
          <label for="code">验证码</label>
          <el-row :gutter="11">
            <el-col :span="12">
              <el-input
                type="text"
                id="code"
                v-model="ruleForm.code"
                minlength="6"
                maxlength="6"
              ></el-input>
            </el-col>
            <el-col :span="12">
              <el-button
                type="success"
                round
                class="block"
                :disabled="codeButtonStatus"
                @click="getsms()"
                >{{ codeButtonText }}</el-button
              >
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-button
            type="danger"
            @click="submitForm('ruleForm')"
            class="login-bin block"
            :disabled="loginButtonStatus"
            >{{ model === "login" ? "登录" : "注册" }}</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import sha1 from "js-sha1";
import { GetSms, Register, Login } from "@/api/login.js";
import {
  stripscript,
  validataEmail,
  validataPassword,
  validataCode
} from "@/utils/validata";
import { setToken, setUsername } from "@/utils/app.js";
import { ref, reactive, onMounted, onUnmounted } from "@vue/composition-api";
export default {
  name: "login",
  setup(props, { refs, root }) {
    /*
       setup第二个参数是context，包含以下方法
        context.attrs
        context.slots
        context.parent
        context.root
        context.emit
        context.refs
        context.root == this
      */
    //1、表单的验证 ************************************************************************/
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
      ruleForm.password = stripscript(value);
      value = ruleForm.password;
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
      if (model.value === "login") {
        callback();
      }
      ruleForm.passwords = stripscript(value);
      value = ruleForm.passwords;
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value != ruleForm.password) {
        callback(new Error("密码不一致"));
      } else {
        callback();
      }
    };
    //、验证码校验
    let checkAge = (rule, value, callback) => {
      ruleForm.code = stripscript(value);
      value = ruleForm.code;
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else if (validataCode(value)) {
        callback(new Error("格式有误"));
      } else {
        callback();
      }
    };

    //2、数据位置 ************************************************************************/
    //、登录注册按钮的数据
    const menuTab = reactive([
      { txt: "登录", current: true, type: "login" },
      { txt: "注册", current: false, type: "register" }
    ]);
    //、模块值
    const model = ref("login");
    //、登录注册按钮禁用
    const loginButtonStatus = ref(true);
    //、获取验证码按钮状态
    const codeButtonStatus = ref(false);
    const codeButtonText = ref("获取验证码");
    //、倒计时
    const timer = ref(null);
    //、表单的数据
    const ruleForm = reactive({
      username: "",
      password: "",
      passwords: "",
      code: ""
    });
    const rules = reactive({
      username: [{ validator: validateUsername, trigger: "blur" }],
      password: [{ validator: validatePassword, trigger: "blur" }],
      passwords: [{ validator: validatePasswords, trigger: "blur" }],
      code: [{ validator: checkAge, trigger: "blur" }]
    });

    //3、声明函数 ***********************************************************************/
    //、登录注册按钮的状态切换
    const toggleMenu = data => {
      resetForm("ruleForm");
      //高光,当前选中
      menuTab.forEach(item =>
        item.txt == data.txt ? (item.current = true) : (item.current = false)
      );
      //修改模块的值
      model.value = data.type;
      //清除倒计时
      clearCountDown();
      //初始化邮箱状态
      ruleForm.username = "";
      loginButtonStatus.value = true;
      //初始化验证码状态
      codeButtonText.value = "获取验证码";
      codeButtonStatus.value = false;
    };
    //、获取验证码
    const getsms = () => {
      //验证提示
      if (ruleForm.username == "") {
        root.$message.error("邮箱不能为空");
        return false;
      }
      if (validataEmail(ruleForm.username)) {
        root.$message.error("邮箱格式有误,请重新输入");
        return false;
      }
      //修改验证码按钮状态
      codeButtonStatus.value = true;
      codeButtonText.value = "发送中";

      //验证码请求的接口
      let requestdata = {
        username: ruleForm.username,
        module: model.value
      };
      GetSms(requestdata)
        .then(response => {
          let data = response.data;
          root.$message({
            message: data.message,
            type: "success"
          });
          countDowm();
          loginButtonStatus.value = false;
        })
        .catch(error => {
          loginButtonStatus.value = false;
          codeButtonText.value = "获取验证码";
        });
    };
    //、提交表单
    const submitForm = formName => {
      refs[formName].validate(valid => {
        if (valid) {
          //注册及登录请求接口数据
          let requestData = {
            username: ruleForm.username,
            password: sha1(ruleForm.password),
            code: ruleForm.code,
            module: model.value
          };
          //当前页面在register发生注册请求
          if (model.value == "register") {
            regiser(requestData);
            //如果也是在login发生登录请求
          } else if (model.value == "login") {
            signIn(requestData);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };

    //注册
    const regiser = requestData => {
      Register(requestData)
        .then(response => {
          let data = response.data;
          root.$message({
            message: data.message,
            type: "success"
          });
          toggleMenu(menuTab[0]);
        })
        .catch(error => {
          console.log(error);
        });
    };
    //登录
    const signIn = requestData => {
      Login(requestData)
        .then(response => {
          let data = response.data;
          setToken(data.data.token);
          setUsername(data.data.username);
          root.$store.commit("app/GET_USERNAME");
          root.$message({
            message: data.message,
            type: "success"
          });
          //登录成功路由跳转
          root.$router.push({
            name: "Console"
          });
        })
        .catch(error => {
          console.log(error);
        });
    };

    //、重置表单
    const resetForm = formName => {
      refs[formName].resetFields();
    };
    //、倒计时60秒
    const countDowm = () => {
      if (timer.value) {
        clearCountDown();
      }
      let time = 30;
      timer.value = setInterval(() => {
        if (time === -1) {
          clearCountDown();
          codeButtonStatus.value = false;
          codeButtonText.value = `再次获取`;
        } else {
          codeButtonText.value = `倒计时${time}秒`;
        }
        time--;
      }, 1000);
    };
    //、清除倒计时
    const clearCountDown = () => {
      clearInterval(timer.value);
    };

    //4、生命周期 ***********************************************************************/
    //、挂载完成后
    onMounted(() => {});

    //、页面销毁时，清除定时器
    onUnmounted(()=>{
      clearCountDown(timer.value);
    })

    //5、3.0需要返回//
    return {
      menuTab,
      ruleForm,
      model,
      loginButtonStatus,
      codeButtonStatus,
      codeButtonText,
      rules,
      toggleMenu,
      submitForm,
      getsms,
      resetForm
    };
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
    cursor: pointer;
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