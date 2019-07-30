import Vue from 'vue';
import Router from 'vue-router';
import Queue from './views/Queue';
import QrScanner from './views/QrScanner';
import ThankYouScreen from './views/ThankYouScreen';
Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      name: 'queue',
      path: '/queue',
      component: Queue,
    },
    {
      name: 'scanner',
      path: '/',
      component: QrScanner,
    },
    {
      name: 'thanks',
      path: '/thanks',
      component: ThankYouScreen,
    },
  ],
});
