<template>
  <div id="nav-wrap">
    <div class="logo">
      <img src="../../../assets/logo.png" alt />
    </div>
    <el-row class="tac">
      <el-col :span="24">
        <el-menu
          router
          :default-active="currentRoute"
          class="el-menu-vertical-demo"
          :collapse="isCollpase"
          background-color="transparent"
          text-color="#fff "
          active-text-color="#fff"
     
        >
          <template v-for="(item, index) in routes">
            <el-submenu v-if="!item.hidden" :key="item.id" :index="index + ''">
              <!-- 一级菜单 -->
              <template slot="title">
                <svg-icon
                  :iconName="item.meta.icon"
                  :className="item.meta.icon"
                />
                <span>{{ item.meta.name }}</span>
              </template>
              <!-- 子级菜单 -->
              <template v-for="subitem in item.children">
                <el-menu-item
                  :key="subitem.id"
                  :index="subitem.path"
                  v-if="!subitem.hidden"
                  >{{ subitem.meta.name }}</el-menu-item
                >
              </template>
            </el-submenu>
          </template>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { reactive, ref, computed, watch } from "@vue/composition-api";
export default {
  name: "navMenu",
  setup(props, { root }) {
    //1、数据位置 ************************************************************************/
    //、导航菜单
    const routes = reactive(root.$router.options.routes);
    root.$store.commit("app/SET_ROLES", root.$router.currentRoute.path);
    const currentRoute = computed(() => root.$store.state.app.currentRoute);
    //、监听值得变化，导航菜单的展开收起
    const isCollpase = computed(() => root.$store.state.app.isCollpase);
    
    return {
      isCollpase,
      routes,
      currentRoute, 
    };
  },
};
</script>
<style lang="scss" scoped>
#nav-wrap {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: $navMenu;
  background-color: $navMenubg;
  @include webkit(transition, all 0.3s ease 0s);
  svg {
    font-size: 20px;
    margin-right: 10px;
    color: #fff;
  }
  ul,
  li {
    margin: 0;
    padding: 0;
    border: 0;
  }
}
.logo {
  img {
    margin: 25px auto 15px;
    display: block;
    @include webkit(transition, all 0.3s ease 0s);
  }
}
.open {
  #nav-wrap {
    width: $navMenu;
  }
  .logo {
    img {
      width: 105px;
    }
  }
}
.close {
  #nav-wrap {
    width: $minNavMenu;
  }
  .logo {
    img {
      width: 50px;
    }
  }
}
</style>