import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import './registerServiceWorker';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/messaging';

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
const messaging = firebase.messaging();

messaging.usePublicVapidKey("BFynTbdlIk1V9XzTzfkk4SgAVS5ZBj9QkPX3PRDZyIGpngAZ2gmPmVp7Og5kiwOaMfEXN4q0GgyCrHQt52mNq8E");

// Request Permission of Notifications
messaging.requestPermission().then(() => {
  console.log('Notification permission granted.');

  // Get Token
  messaging.getToken().then((token) => {
    localStorage.setItem("notificationToken", token);
  })
}).catch((err) => {
  console.log('Unable to get permission to notify.', err);
});

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: h => h(App),
}).$mount('#app');
