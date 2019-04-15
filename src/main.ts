import Vue from 'vue';
// import '@/utils/viewport.js';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import '@/filters';
import '@/registerServiceWorker';
import iView from 'iview';
import 'iview/dist/styles/iview.css';

if (process.env.VUE_APP_MOCK_ENV === 'mock') {
    import('@/mock' as any);
}

Vue.config.productionTip = false;
Vue.use(iView);

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
