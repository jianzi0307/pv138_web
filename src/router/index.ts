import { routes as auth } from '@/modules/auth';
import { routes as web } from '@/modules/web';
import { routes as admin } from '@/modules/admin';
import Vue from 'vue'
import Router from 'vue-router'
import beforeEach from './beforeEach';
import afterEach from './afterEach';

Vue.use(Router);

const AppRoute = {
  path: '/',
  component: () => import('../App.vue'),
  children: [...auth, ...web, ...admin]
};

const routes = [AppRoute];

const router: Router = new Router({
  routes,
  base: process.env.BASE_URL,
  mode: 'history'
});

router.beforeEach(beforeEach);
router.afterEach(afterEach);

export default router;
