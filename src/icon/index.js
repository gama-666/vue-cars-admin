import Vue from "vue";
import Svgicon from "./Svgicon";
//自定义全局组件
Vue.component("svg-icon", Svgicon);

/*
    *require.context:读取指定目录的所有文件
    *参数1：目录
    *参数2：是否遍历子级目录
    *参数3：定义遍历文件规则
*/
const req = require.context('./svg', false, /\.svg$/);
const requireAll = requireContext => {
    return requireContext.keys().map(requireContext)
}
requireAll(req)