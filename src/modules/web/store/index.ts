import _ from 'lodash';
import Util from '@/utils/util';
import * as services from '@/utils/services';
import defaultRoutes, { DynamicRoutes } from '@/modules/web/routes';
import router from '@/router/index';
import dynamicRouter from '@/modules/web/dynamic-router';

export default {
  module: {
    state: {
      // 所有路由
      permissionList: null,
      // 侧边栏菜单
      sidebarMenu: [],
      // 当前选中的导航栏
      currentMenu: ''
    },
    mutations: {
      SET_USER_PERMISSION(state: any, routes: any) {
        console.log('权限列表：', routes);
        state.permissionList = routes
      },
      SET_SIDER_MENUS(state: any, menu: any) {
        state.sidebarMenu = menu
      }
    },
    actions: {
      // 设置侧边栏菜单
      setMenus({ commit }: any, data: any) {
        commit('SET_SIDER_MENUS', data);
        console.log('菜单：', data);
        Promise.resolve(data);
      },
      // 设置用户权限
      setPermission({ commit }: any, data: any) {
        commit('SET_USER_PERMISSION', data);
        console.log('data=>', data);
        Promise.resolve(data);
      },
      // 请求用户权限
      loadPermission({ dispatch }: any) {
        services.loadUserPermission()
          .then(({ data }: any) => {
            console.log(data, '<<<<< 当前用户权限');
            console.log(dynamicRouter, '<<<< 动态路由');
            // 根据权限过滤用户路由
            const routes = Util.recursionRouter(data, dynamicRouter);

            console.log('routes==>', routes);

            // 合并路由
            const consoleRootRoute: any = DynamicRoutes.find((v: any) => v.name === 'console');
            const children = consoleRootRoute.children;
            children.push(...routes);

            // 生成侧边栏导航菜单
            console.log(children, '<<<<<< children');
            dispatch('setMenus', Util.createMenus(children));
            Util.setDefaultRoute([consoleRootRoute]);

            // 初始路由
            const initialRoutes = defaultRoutes;

            // 动态添加路由
            router.addRoutes(DynamicRoutes);

            // 最终完整路由表
            dispatch('setPermission', [...initialRoutes, ...DynamicRoutes]);
            Promise.resolve();
          })
          .catch(dispatch('logout'));
      }
    },
    getters: {
      hasPermission(state: any) { return !_.isEmpty(state.permissionList) },
      userPermission(state: any) { return state.permissionList; }
    }
  }
};
