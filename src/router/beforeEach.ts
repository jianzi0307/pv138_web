import store from '../store'
import { consoleHomeName } from '@/config';

const beforeEach = async (to: any, from: any, next: any) => {
  //
  store
    .dispatch('checkUserToken')
    .then(() => {
      // 已登录
      if (!store.getters.hasPermission) {
        store.dispatch('loadPermission').then(() => {
          console.log(to.path, to.params, to.query, '<to.path to.params to.query');
          next({ path: to.path, params: to.params, query: to.query });
        })
      } else {
        if (to.name !== 'auth.login') {
          next();
        } else {
          next({ name: consoleHomeName });
        }
      }
    })
    .catch(() => {
      if (
        to.matched.length > 0 &&
        !to.matched.some((record: any) => record.meta.requiresAuth)
      ) { // 不需要认证的路由
        next();
      } else { // 需要认证的路由
        next({ name: 'auth.login' });
      }
    });


/*
  const isLogged = store.getters.isLogged;
  // 未登录
  if (!isLogged) {
    if (
      to.matched.length > 0 &&
      !to.matched.some((record: any) => record.meta.requiresAuth)
    ) { // 不需要认证的路由
      next();
    } else { // 需要认证的路由
      next({ name: 'auth.login' });
    }
  } else {
    // 已登录
    if (!store.getters.hasPermission) {
      store.dispatch('loadPermission').then(() => {
        console.log(to.path, to.params, to.query, '<to.path to.params to.query');
        next({ path: to.path, params: to.params, query: to.query });
      })
    } else {
      if (to.name !== 'auth.login') {
        next();
      } else {
        // next(from.fullPath);
        next({ name: consoleHomeName });
      }
    }
  }*/
}
export default beforeEach;
