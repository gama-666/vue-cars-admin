<template>
  <div id="header-wrap">
    <div class="pull-left header-icon" @click="navMenuState">
      <svg-icon iconName="menu" :className="menuClass" />
    </div>
    <div class="pull-right">
      <div class="pull-left user-Info">
        <svg-icon iconName="userInfo" :className="userClass" />
      </div>
      <div class="user pull-left">{{ username }}</div>
      <div class="pull-left header-icon" @click="exit">
        <svg-icon iconName="exit" :className="exitClass" />
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "@vue/composition-api";
import { removeToken, removeUsername } from "@/utils/app.js";
export default {
  name: "layoutHeader",
  setup(props, { root }) {
    //1、数据位置 ************************************************************************/
    //、svg图标class名称
    const menuClass = ref("menu");
    const exitClass = ref("exit");
    const userClass = ref("userInfo");

    //2、声明函数 ***********************************************************************/
    //、状态,导航菜单的展开收起
    const navMenuState = () => {
      root.$store.commit("app/SET_COLLPASE");
    };
    const username = root.$store.state.app.username;

    //退出，删除Cookie
    const exit = () => {
      root
        .$confirm("确定退出登录?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "success",
          closeOnPressEscape: true
        })
        .then(() => {
          removeToken();
          removeUsername();
          root.$router.push({
            name: "Login"
          });
        })
        .catch(() => {
          root.$message({
            type: "info",
            message: "已取消退出"
          });
        });
    };

    return {
      username,
      menuClass,
      exitClass,
      userClass,
      navMenuState,
      exit
    };
  }
};
</script>
<style lang="scss" scoped>
.open {
  #header-wrap {
    left: $navMenu;
  }
}
.close {
  #header-wrap {
    left: $minNavMenu;
  }
}
#header-wrap {
  position: fixed;
  top: 0;
  right: 0;
  height: $layoutHeader;
  line-height: $layoutHeader;
  background-color: #ffffff;
  @include webkit(transition, all 0.3s ease 0s);
  @include webkit(box-shadow, 0 3px 16 0px rgbe(0, 0, 0, 0.1));
}
.header-icon {
  padding: 0 32px;
  svg {
    font-size: 20px;
    cursor: pointer;
    margin-bottom: -8px;
  }
}
.user {
  padding: 0 32px 0px 15px;
  border-right: 1px solid #dedede;
}
.user-Info {
  height: $layoutHeader;
  line-height: $layoutHeader;
  svg {
    font-size: 35px;
    cursor: pointer;
    margin-bottom: -12px;
  }
}
</style>