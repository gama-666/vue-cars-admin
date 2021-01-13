
const state = {
    //禁用、启用
    radio_disabled: {
        1: { label: "启用", value: true },
        2: { label: "禁用", value: false }
    },
    //年检
    year_check: [
        { label: "未年检", value: false },
        { label: "已年检", value: true }
    ],
    //档位
    gear: [
        { label: "手动", value: 1 },
        { label: "自动", value: 2 },
        { label: "人工智能", value: 3 }
    ],
    //档位
    energyType: [
        { label: "油", value: 1 },
        { label: "电", value: 2 },
        { label: "混合动力", value: 3 }
    ],

}
const getters = {

}

const mutations = {


}
const actions = {}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};