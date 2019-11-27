import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    login_user: null,
    drawer: false,
    addresses: []
  },
  mutations: {
    setLoginUser (state, user) {
      state.login_user = user
    },
    toggleSideMenu(state) {
      state.drawer = !state.drawer
    },
    addAddress (state, address) {
      state.addresses.push(address)
    }
  },
  actions: {
    setLoginUser({ commit }, user) {
      commit('setLoginUser', user)
    },
    login() {
        // firebaseのログイン機能を呼び出す
        // googleの画面にてサインイン後、元のページに自動でリダイレクトされる
        const google_auth_provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithRedirect(google_auth_provider)
    },
    toggleSideMenu ({commit}) {
      commit('toggleSideMenu')
    },
    addAddress ({commit}, address) {
      commit('addAddress', address)
    }
  },
  modules: {
  }
})
