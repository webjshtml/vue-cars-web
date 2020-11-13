const state = {
    message_item: {
        check_real_name: {
            msg: "您未实名认证，请先实名认证",
            router: "Authentication"
        },
        check_cars: {
            msg: "您未上传驾驶证，请先上传驾驶证，审合通过后便可租车",
            router: "Authentication"
        },
        gilding: {
            msg: "您还没交押金，请先缴纳押金哦",
            router: "Recharge"
        },
        illegalAmount: {
            msg: "您的预缴违章金额小于200元，请先预缴违章金额",
            router: "Recharge"
        },
        blank: {
            msg: "请先绑定银行卡",
            router: "Authentication"
        }
    }
}
const getters = {}
const mutations = {}
const actions = {}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
