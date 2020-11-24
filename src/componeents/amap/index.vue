<template>
  <div id="amap-wrap">
    <el-amap vid="container" :events="events" class="amap-demo"></el-amap>
  </div>
</template>
<script>
//地图
import { lazyAMapApiLoaderInstance } from "vue-amap";
//方法
import { getLngLat } from "./common";
import { addressSetMapCenter } from "./location";
import { mapSetMarker ,amapClearMarker} from "./marker";

export default {
  name: "Amap",
  props:{
    options:{
      type:Object,
      default:()=>{}
    }
  },
  data() {
    return {
      map: null,
      lnglat: "",
      zoom: 18,
      events: {},
    };
  },
  mounted() {
    lazyAMapApiLoaderInstance.load().then(() => {
      this.mapCreate()  //创建地图
      this.map.on("click", (e) => {
        //经纬度公共方法
        const lnglat = getLngLat(e);
        //更新经纬度
        this.lnglat = lnglat;
        //回调父组件方法
        this.$emit("callback", {
          function: "getLnglat",
          data: { lnglat },
        });
        //设置点覆盖物
        this.setMarker();
      });
    });
  },
  methods: {
    //创建地图
    mapCreate(){
      this.map = new AMap.Map("container", {
        zoom: this.zoom,
        resizeEnable: true,
      });
      this.map.on("complete", ()=>{
        this.mapLoad() 
      });
    },
    //销毁地图
    mapDestroy(){
      this.map && this.map.destroy()
    },
     //地图加载完成
    mapLoad(){
      if(this.options.mapLoad){
        this.$emit("callback",{
          function:"mapLoad"
        })
      }
    },
    //根据区域定位
    setMapcenter(value) {
      addressSetMapCenter(value, this.map);
    },
    //设置点覆盖物
    setMarker(lnglat) {
      mapSetMarker(lnglat || this.lnglat, this.map);
    },
    //清楚点覆盖物
    clearMarker(){
      amapClearMarker(this.map)
    }
  },
};

</script>
<style lang="scss" scoped>
#amap-wrap {
  height: 100%;
}
</style>