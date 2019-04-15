import { userTokenStorageKey } from '@/config';

import { ActionContext } from 'vuex';
import { State } from './state';
import localforage from 'localforage';
import _ from 'lodash';
import * as services from '@/utils/services'
import * as TYPES from './mutations-types';

// 尝试登录
export const attemptLogin = (store: ActionContext<State, any>, payload: any) => {
  services.postLogin(payload)
    .then((data: any) => {
      store.dispatch('setToken', data.token);
      return Promise.resolve();
    })
    .then(() => store.dispatch('loadUser'));
};

// 尝试注册
export const attemptRegister = (store: ActionContext<State, any>, payload: any) => {
  services.postRegister(payload)
    .then(({ token }: any) => {
      store.dispatch('setToken', token);
      return Promise.resolve();
    })
    .then(() => store.dispatch('loadUser'));
};

// 发送验证码
export const sendSmsCode = (store: ActionContext<State, any>, payload: any) => {
  console.log('wocao==========');
  services.postSendSmsCode(payload);
  Promise.resolve();
};

// 退出
export const logout = ({ dispatch }: any) => {
  return localforage.removeItem(userTokenStorageKey)
    .then(dispatch('setToken', null))
    .then(dispatch('setuser', {}));
};

// 设置用户
export const setUser = (store: ActionContext<State, any>, user: any) => {
  store.commit(TYPES.SET_USER, user);
  Promise.resolve(user);
};

// 设置Token
export const setToken = (store: ActionContext<State, any>, payload: any) => {
  const token = _.isEmpty(payload) ? null : payload.token || payload;
  store.commit(TYPES.SET_TOKEN, token);
  return Promise.resolve(token);
};

// 检查用户
export const checkUserToken = (store: ActionContext<State, any>) => {
  if (!_.isEmpty(store.state.token)) {
    return Promise.resolve(store.state.token);
  }
  // token不存在
  // - 从localstorage中取出，填充vuex的token
  // - 同时也要同时获取user信息，填充vuex的user
  return (
    localforage
      .getItem(userTokenStorageKey)
      .then((token) => {
        if (_.isEmpty(token)) {
          return Promise.reject('NO_TOKEN');
        }
        return store.dispatch('setToken', token);
      })
      .then(() => store.dispatch('loadUser'))
  )
};

/**
 * 获取并更新用户信息
 * 抛错则说明token是无效的，直接退出系统
 */
export const loadUser = (store: ActionContext<State, any>) => {
  services.loadUserData()
    .then((user) => store.dispatch('setUser', user))
    .catch(logout);
};
