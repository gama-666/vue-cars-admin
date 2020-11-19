<template>
  <div id="amap-wrap">
    <el-amap vid="container" :events="events" class="amap-demo"></el-amap>
  </div>
</template>
<script>
import { lazyAMapApiLoaderInstance } from "vue-amap";
import { getLonLag } from "./common";
export default {
  name: "Amap",
  data() {
    return {
      map: null,
      zoom: 18,
      events: {},
    };
  },
  mounted() {
    lazyAMapApiLoaderInstance.load().then(() => {
      this.map = new AMap.Map("container", {
        zoom: this.zoom,
        resizeEnable: true,
      });
      this.map.on("click", (e) => {
        //经纬度公共方法
        const lonlag = getLonLag(e);
        //回调父组件事件
        this.$emit("lonlag", lonlag);
      });
    });
  }
};
</script>
<style lang="scss" scoped>
#amap-wrap {
  height: 100%;
}
</style>