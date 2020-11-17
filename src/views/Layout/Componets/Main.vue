<template>
  <div id="main-wrap">
    <div class="main-content">
      <div class="content">
        <!-- 子路由显示区 -->
        <keep-alive>
          <!-- 需要缓存 -->
          <router-view v-if="$route.meta.keepAlive"/>
        </keep-alive>
          <!-- 不需要缓存 -->
        <router-view v-if="!$route.meta.keepAlive"/>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "layoutMain",
  setup() {}
};
</script>
<style lang="scss" scoped>
#main-wrap {
  // position: fixed;
  // left: $navMenu;
  // top: 75px;
  // right: 0;
  // bottom: 0;
  // border-bottom: none;
  height: 100vh;
  background-color: #dedede;
}
.open {
  .main-content {
    padding-left: $navMenu + 30;
  }
}
.close {
  .main-content {
    padding-left: $minNavMenu + 30;
  }
}
.main-content {
  width: 100%;
  height: 100%;
  padding-top: $layoutHeader + 30;
  padding-left: $navMenu + 30;
  padding-right: 40px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  @include webkit(transition, all 0.3s ease 0s);
}
.content {
  width: 100%;
  height: 100%;
  padding: 30px 30px 0px 30px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background-color: #fff;
}
</style>