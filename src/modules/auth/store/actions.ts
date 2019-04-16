import { userTokenStorageKey } from '@/config';

import { ActionContext } from 'vuex';
import localforage from 'localforage';
import _ from 'lodash';
import * as services from '@/utils/services'
import * as TYPES from './mutations-types';

// 尝试登录
export const attemptLogin = (context: ActionContext<any, any>, payload: any) => {
  return services.postLogin(payload)
    .then(({ data }) => {
      console.log(data, '<<<<<登录成功');
      context.dispatch('setToken', data);
    })
    .then(() => context.dispatch('loadUser'));
};

// 手机验证码登录
export const attemptLoginPhone = (context: ActionContext<any, any>, payload: any) => {
  return services.postLoginPhone(payload)
    .then(({ data }) => {
      console.log(data, '<<<<<登录成功');
      context.dispatch('setToken', data);
    })
    .then(() => { context.dispatch('loadUser') });
};

// 尝试注册
export const attemptRegister = (context: ActionContext<any, any>, payload: any) => {
  return services.postRegister(payload)
    .then(({ data }) => {
      console.log(data, '<<<<<注册成功');
      context.dispatch('setToken', data);
    })
    .then(() => context.dispatch('loadUser'));
};

// 发送验证码
export const sendSmsCode = (context: ActionContext<any, any>, payload: any) => {
  return services.postSendSmsCode(payload);
};

// 退出
export const logout = (context: ActionContext<any, any>) => {
  return localforage.removeItem(userTokenStorageKey)
    .then(() => context.dispatch('setToken', null))
    .then(() => context.dispatch('setUser', {}));
};

// 设置用户
export const setUser = (context: ActionContext<any, any>, data: any) => {
  context.commit(TYPES.SET_USER, data);
  Promise.resolve(data);
};

// 设置Token
export const setToken = (context: ActionContext<any, any>, payload: any) => {
  const token = _.isEmpty(payload) ? null : payload.token || payload;
  context.commit(TYPES.SET_TOKEN, token);
  return Promise.resolve(token);
};

// 检查用户
export const checkUserToken = (context: ActionContext<any, any>) => {
  if (!_.isEmpty(context.state.token)) {
    return Promise.resolve(context.state.token);
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
        return context.dispatch('setToken', token);
      })
      .then(() => context.dispatch('loadUser'))
  )
};

/**
 * 获取并更新用户信息
 * 抛错则说明token是无效的，直接退出系统
 */
export const loadUser = (context: ActionContext<any, any>) => {
  services.loadUserData()
    .then(({ data }: any) => {
      console.log(data, '<<<<< 当前用户信息')
      context.dispatch('setUser', data);
    })
    .catch(logout);
};
