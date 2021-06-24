const state = {
    selfLocation: true,
    // 停车场ID，
    parking_id: []
}
const mutations = {
    SELF_LOCATION(state){
        state.selfLocation = !state.selfLocation;  // true 与 false 之间的切换
    },
    SET_PARKING_ID(state, value){
        state.parking_id = value;
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

