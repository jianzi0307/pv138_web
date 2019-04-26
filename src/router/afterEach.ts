import store from '../store'

const afterEach = (to: any, from: any) => {
    const routerList = to.matched;
    store.dispatch('setCrumbList', routerList);
    store.dispatch('setCurrentMenu', to.name);
};

export default afterEach;
