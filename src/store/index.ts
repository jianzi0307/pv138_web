import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import state, { RootState } from './state';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';
import AuthStore from '../modules/auth/store';

Vue.use(Vuex);

const store: Store<RootState> = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    auth: AuthStore.module
  }
})

export default store;
