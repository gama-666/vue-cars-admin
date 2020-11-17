import {
    getUsername
} from "../../utils/app.js";

const state = {
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