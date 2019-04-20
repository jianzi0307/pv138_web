import store from '../store'

// const needAuth = (route: any) => route.meta.requiresAuth === true
const beforeEach = (to: any, from: any, next: any) => {
  store
    .dispatch('checkUserToken')
    .then(() => {
      if (store.getters.isLogged && to.path.indexOf('auth') > 0) {
        if (!store.getters.hasPermission) {
          store.dispatch('loadPermission')
            .then(() => {
              return next({ path: to.path });
            })
            .catch((e: any) => {
              console.log(e);
            });
          // return next({ name: 'console.home' });
        }
      }
      return next();
    })
    .catch(() => {
      if (
        to.matched.length > 0 &&
        !to.matched.some((record: any) => record.meta.requiresAuth)
      ) {
        next();
      } else {
        next({ name: 'auth.login' });
      }
    });
}
export default beforeEach;
