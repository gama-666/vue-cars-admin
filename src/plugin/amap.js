import Vue from "vue";

//高德地图
import VueAMap from "vue-amap";

Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
    key: '5461862fe93d317e4ed2987b1ab172d5',
    plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBer', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.MarkerClusterer'],
    v: '1.4.15',
    uiVersion: '1.0.11'
})