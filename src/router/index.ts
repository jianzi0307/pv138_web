import Vue from 'vue'
import Router from 'vue-router'
// import store from '@/store'
import routes from '@/router/routes'

Vue.use(Router)
const router: Router = new Router({
    routes,
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior: (to: any, from: any, savedPosition: any) => {
        return savedPosition || { x: 0, y: 0 }
    }
})
router.beforeEach((to: any, from: any, next: any) => {
    next();
})
export default router;
