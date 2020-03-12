import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import firebase from 'firebase'

Vue.config.productionTip = false

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSg1lox75DLdrFaD-0ke3yB7azFM17OuY",
  authDomain: "entry-diary-say77.firebaseapp.com",
  databaseURL: "https://entry-diary-say77.firebaseio.com",
  projectId: "entry-diary-say77",
  storageBucket: "entry-diary-say77.appspot.com",
  messagingSenderId: "723419089001",
  appId: "1:723419089001:web:013b9c16cddcc9f0547af8",
  measurementId: "G-0EY12G52W8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
