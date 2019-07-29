import Vue from 'vue';
import Router from 'vue-router';
import Queue from './views/Queue';
import QrScanner from './views/QrScanner';
Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      name: 'queue',
      path: '/',
      component: Queue,
    },
    {
      name: 'scanner',
      path: '/scanner',
      component: QrScanner,
    },
  ],
});
