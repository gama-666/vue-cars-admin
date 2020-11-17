import {
    getUsername
} from "../../utils/app.js";

const state = {
    // 取本地值，本地没值取默认值(临时)
    id: "" || sessionStorage.getItem('id')

}
const getters = {
    id: state => state.id
}
const mutations = {
    SET_ID: (state, value) => {
        state.id = value;
        sessionStorage.setItem('id', state.id)
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