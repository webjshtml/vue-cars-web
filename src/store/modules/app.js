import { setToken, setUsername, getUsername, removeToken, removeUsername } from "@/utils/cookies";

const state = {
   routerName: ""
}
const getters = {}
const mutations = {
    SET_ROUTER_NAME(state, value){
        state.routerName = value;
    }
}
const actions = {
    
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
