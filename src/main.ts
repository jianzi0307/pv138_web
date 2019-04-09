import Vue from 'vue';
// import '@/utils/viewport.js';
import App from '@/app.vue';
import router from '@/router';
import store from '@/store';
import '@/filters';
import '@/registerServiceWorker';

if (process.env.VUE_APP_MOCK_ENV === 'mock') {
  import('@/mock' as any);
}

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
