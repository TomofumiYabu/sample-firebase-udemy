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
    deleteLoginUser (state) {
      //ログアウト時はstoreのユーザ情報にnullをセットする
      state.login_user = null
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
    deleteLoginUser({ commit }) {
      commit('deleteLoginUser')
    },
    login() {
        // firebaseのログイン機能を呼び出す
        // googleの画面にてサインイン後、元のページに自動でリダイレクトされる
        const google_auth_provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithRedirect(google_auth_provider)
    },
    logout() {
      //firebaseのログアウト機能を呼び出す
      firebase.auth().signOut()
    },
    toggleSideMenu ({commit}) {
      commit('toggleSideMenu')
    },
    addAddress ({commit}, address) {
      commit('addAddress', address)
    }
  },
  getters: {
    userName: state => state.login_user ? state.login_user.displayName : '' ,
    photoURL: state => state.login_user ? state.login_user.photoURL : ''
  },
  modules: {
  }
})
