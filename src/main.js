import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import firebase from 'firebase'

Vue.config.productionTip = false

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDV-sbLkcy5XwCEqmJny4jfyejWcrVFmDM",
  authDomain: "fir-sample-myaddress-pj.firebaseapp.com",
  databaseURL: "https://fir-sample-myaddress-pj.firebaseio.com",
  projectId: "fir-sample-myaddress-pj",
  storageBucket: "fir-sample-myaddress-pj.appspot.com",
  messagingSenderId: "219024276010",
  appId: "1:219024276010:web:9fd5ec9a74e74fa581e153",
  measurementId: "G-5EXH7BEPYN"
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
