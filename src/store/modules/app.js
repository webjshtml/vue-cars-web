import { setToken, setUsername, getUsername, removeToken, removeUsername } from "@/utils/cookies";
const state = {
    // 是否点击了车辆列表
    isClickCarsList: true,
    // 是否是请求车辆列表
    isRequestCarsList: false,
    routerName: ""
}
const getters = {}
const mutations = {
    SET_ROUTER_NAME(state, value){
        state.routerName = value;
    },
    SET_CARS_LIST_STATUS(state, value){
        state.isClickCarsList = value;
    },
    SET_CARS_LIST_REQUEST(state, value){
        state.isRequestCarsList = value;
    }
}
const actions = {}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}

