import store from '../store'

const afterEach = (to: any, from: any) => {
    // const routerList = to.matched;
    // store.commit('setCrumbList', routerList);

    // 通过to.name查找菜单的ID
    let currMenuId = 0;
    for (const v of store.state.web.sidebarMenu) {
        if (v.route === to.name) {
            currMenuId = to.meta.id;
            break;
        }
    }
    store.commit('SET_CURRENT_MENU', currMenuId);
};

export default afterEach;
