import {
    getUsername
} from "../../utils/app.js";

const state = {
    parking_type_json: {
       1: { label: "室内", value: 1 },
       2: { label: "室外", value: 2 }
    },  
    parking_status_json: {
       1: { label: "启用", value: 1 },
       2: { label: "禁用", value: 2 }
    },
    // 禁启用及类型数据公共静态数据
    parking_type: [
        { label: "室内", value: 1 },
        { label: "室外", value: 2 }
    ],  
    parking_status: [
        { label: "启用", value: 1 },
        { label: "禁用", value: 2 }
    ],
    //禁用、启用
    radio_disabled: {
        1: { label: "启用", value: true },
        2: { label: "禁用", value: false }
    },
    // 取本地值，本地没值取默认值(临时)
    isCollpase: JSON.parse(sessionStorage.getItem('isCollpase')) || false,
    username: getUsername() || "",
    currentRoute: "",
}
const getters = {

}

const mutations = {
    SET_COLLPASE: (state) => {
        state.isCollpase = !state.isCollpase;
        // html5本地存储(临时存储，关闭浏览器就清除)
        sessionStorage.setItem('isCollpase', JSON.stringify(state.isCollpase))
    },
    GET_USERNAME: (state) => {
        state.username = getUsername()
    },
    SET_ROLES(state, value) {
        state.currentRoute = value
    },

}
const actions = {}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};