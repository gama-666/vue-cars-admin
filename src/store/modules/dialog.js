const state = {
    dialogInfo: false,
    dialogEdit: false,
    editData:{}
}
const getters = {}
const mutations = {
    SHOW_DIALOG: (state) => {
        state.dialogInfo = true;
    },
    HIDE_DIALOG: (state) => {
        state.dialogInfo = false;
    },

    SHOW_EDIT_DIALOG: (state) => {
        state.dialogEdit = true;
    },
    HIDE_EDIT_DIALOG: (state) => {
        state.dialogEdit = false;
    },

    SET_EDITDATA: (state,data) => {
        state.editData = data
    },
    GET_EDITDATA:(state)=>{
        state.editData
    }
}


const actions = {}



export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};