import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import './registerServiceWorker';
import firebase from 'firebase/app';
import 'firebase/firestore';
firebase.initializeApp({
  apiKey: 'AIzaSyCq0mKSOte7m3JTrjF9qSKDAQCRP--yjAY',
  authDomain: 'enqueapp.firebaseapp.com',
  databaseURL: 'https://enqueapp.firebaseio.com',
  projectId: 'enqueapp',
  storageBucket: 'enqueapp.appspot.com',
  messagingSenderId: '519790489109',
  appId: '1:519790489109:web:4c4bda4ce1f02e14',
});
export const db = firebase.firestore();

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: h => h(App),
}).$mount('#app');
