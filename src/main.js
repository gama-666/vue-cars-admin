import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VueCompositionAPI from "@vue/composition-api";
//路由守卫
import "./router/primit";
//高德地图
import './plugin/amap.js';
//自定义全局方法
import globalMethod from "./utils/global"
//自定义全局组件
import "./icon";

Vue.use(globalMethod)
Vue.use(VueCompositionAPI)
Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");