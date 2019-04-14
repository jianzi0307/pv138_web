import store from '../store'

const needAuth = (route: any) => route.meta.requiresAuth === true

const beforeEach = (to: any, from: any, next: any) => {
  /**
   * Otherwise  if authentication is required login.
   */
  store
    .dispatch('checkUserToken')
    .then(() => {
      if (store.getters.isLogged && to.path.indexOf('auth') > 0) {
        return next({ name: 'home' })
      }
      return next()
    })
    .catch(() => {
      if (needAuth(to)) {
        // No token, or it is invalid
        return next({ name: 'auth.login' }) // redirect to login
      }
      next()
    })
}
export default beforeEach
