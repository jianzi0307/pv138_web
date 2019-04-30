import store from '../store'

const beforeEach = async (to: any, from: any, next: any) => {
  //
  const isLogged = await store.getters.isLogged;
  if (!isLogged) {
    if (
      to.matched.length > 0 &&
      !to.matched.some((record: any) => record.meta.requiresAuth)
    ) {
      next();
    } else {
      next({ name: 'auth.login' });
    }
  } else {
    if (!store.getters.hasPermission) {
      store.dispatch('loadPermission').then(() => {
        console.log(to.path, '<to.path')
        next({ path: to.path });
      })
    } else {
      if (to.name !== 'auth.login') {
        next();
      } else {
        // next(from.fullPath);
        next({ name: 'console.home' });
      }
    }
  }
}
export default beforeEach;
