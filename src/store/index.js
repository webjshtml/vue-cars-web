import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import app from "./modules/app";
import account from "./modules/account";
import location from "./modules/location";
import config from "./modules/config";
export default new Vuex.Store({
  modules: {
    account,
    location,
    app,
    config
  }
});
