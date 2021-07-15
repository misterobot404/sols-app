import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import auth from './modules/auth'
import layout from './modules/layout'
import data from "./modules/data";

export default new Vuex.Store({
    strict: true,
    modules: {
        auth,
        layout,
        data
    }
})


