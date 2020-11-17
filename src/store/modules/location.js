const state = {
    selfLocation: true
}
const mutations = {
    SELF_LOCATION(state){
        state.selfLocation = !state.selfLocation;  // true 与 false 之间的切换
    }
}
const actions = {}
const getters = {}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}

