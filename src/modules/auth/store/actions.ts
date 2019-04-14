import { userTokenStorageKey } from '@/config';

import localforage from 'localforage';
import _ from 'lodash';
import * as services from '@/utils/services'
import * as TYPES from './mutations-types';

export const attempLogin = ({ dispatch }: any, payload: any) => {
  services.postLogin(payload)
    .then((data: any) => {
      dispatch('setToken', data.token);
      return Promise.resolve();
    })
    .then(() => dispatch('loadUser'));
};

export const attempRegister = ({ dispatch }: any, payload: any) => {
  services.postRegister(payload)
    .then(({ token }: any) => {
      dispatch('setToken', token);
      return Promise.resolve();
    })
    .then(() => dispatch('loadUser'));
};

export const logout = ({ dispatch }: any) => {
  return localforage.removeItem(userTokenStorageKey)
    .then(dispatch('setToken', null))
    .then(dispatch('setuser', {}));
};

export const setUser = ({ commit }: any, user: any) => {
  commit(TYPES.SET_USER, user);
  Promise.resolve(user);
};

export const setToken = ({ commit }: any, payload: any) => {
  const token = _.isEmpty(payload) ? null : payload.token || payload;
  commit(TYPES.SET_TOKEN, token);
  return Promise.resolve(token);
};

export const checkUserToken = ({ dispatch, state }: any) => {
  if (!_.isEmpty(state.token)) {
    return Promise.resolve(state.token);
  }
  /**
   * Token does not exist yet
   * - Recover it from localstorage
   * - Recover also the user, validating the token also
   */
  return (
    localforage
      .getItem(userTokenStorageKey)
      .then((token) => {
        if (_.isEmpty(token)) {
          return Promise.reject('NO_TOKEN');
        }
        return dispatch('setToken', token);
      })
      .then(() => dispatch('loadUser'))
  )
};

/**
 * Retrieves updated user information
 * If something goes wrong, the user's token is probably invalid
 */
export const loadUser = ({ dispatch }: any) => {
  services.loadUserData()
    .then((user) => dispatch('setUser', user))
    .catch(logout);
};
