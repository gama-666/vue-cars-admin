import {
    GetUserRole
} from "@/api/login"
import {
    defaultRouterMap,
    asnycRouterMap
} from "../../router/index";

const state = {
    roles: [],
    allRouter: defaultRouterMap,
    addRouter: []
}
const getters = {
    roles: state => state.roles,
    allRouter: state => state.allRouter,
    addRouter: state => state.addRouter,
}
const mutations = {
    SET_ROLES(state, value) {
        state.roles = value
    },
    SET_ROUTER(state, router) {
        state.addRouter = router;
        state.allRouter = defaultRouterMap.concat(router)
    }
}

const actions = {
    //获取用户角色
    getRoles({
        commit
    }, requestData) {
        return new Promise((resolve, reject) => {
            GetUserRole().then((response) => {
                let role = response.data.data.role;
                commit("SET_ROLES", role)
                resolve(role)
            })
        })
    },
    //创建动态路由
    createRouter({
        commit
    }, data) {
        return new Promise((resolve, reject) => {
            let role = data;
            let addRouter = []
            //超管状态
            if (role.includes("admin")) {
                addRouter = asnycRouterMap;
            } else { //普通管理员
                addRouter = asnycRouterMap.filter(item => {
                    if (role.includes(item.meta.system)) {
                        return item;
                    }
                })
                addRouter.push(asnycRouterMap[asnycRouterMap.length - 1])
            }
            //更新路由
            commit("SET_ROUTER", addRouter)
            resolve()
        })
    }


}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};