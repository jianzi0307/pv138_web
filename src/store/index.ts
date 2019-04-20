import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import * as actions from './actions';
import * as mutations from './mutations';
import * as getters from './getters';
import AuthStore from '../modules/auth/store';
import WebStore from '../modules/web/store';

Vue.use(Vuex);

const store: any = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    auth: AuthStore.module,
    web: WebStore.module
  },
  plugins: [
    AuthStore.plugin
  ]
})

export default store;
