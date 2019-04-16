import { userTokenStorageKey } from '@/config';
import localforage from 'localforage'
import * as TYPES from './mutations-types';
import { Store } from 'vuex';
// import { State } from './state';
import { setToken as httpSetToken } from '@/utils/http';

const subscribe = (store: Store<any>) => {
  store.subscribe((mutation, { auth }) => {
    if (TYPES.SET_TOKEN === mutation.type) {
      /**
       * Set the Axios Authorization header with the token
       */
      httpSetToken(auth.token)
      /**
       * Sets the token to the local storage
       * for auto-login purpose
       */
      localforage.setItem(userTokenStorageKey, auth.token)
    }
  })
}

export default (store: Store<any>) => {
  subscribe(store)
};
