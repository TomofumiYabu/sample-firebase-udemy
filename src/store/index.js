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
    addAddress (state, { id, address }) {
      //引数として受け取ったidをaddressオブジェクトの中に入れてfirestoreに保存する
      address.id = id
      state.addresses.push(address)
    }
  },
  actions: {
    setLoginUser({ commit }, user) {
      commit('setLoginUser', user)
    },
    fetchAddresses ({ getters, commit }) {
      // firestoreからデータを取得する。取得時のデータ形式に注意
      firebase.firestore().collection(`users/${getters.uid}/addresses`).get().then(snapshot => {
        console.log(snapshot)
        snapshot.forEach(doc => commit('addAddress', {id: doc.id, address: doc.data() }))
      })
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
    addAddress ({getters, commit}, address) {
      if (this.getters.uid) {
        firebase.firestore().collection(`users/${getters.uid}/addresses`).add(address).then(doc => {
          commit('addAddress', {id: doc.id, address})
        })
      }
    }
  },
  getters: {
    userName: state => state.login_user ? state.login_user.displayName : '' ,
    photoURL: state => state.login_user ? state.login_user.photoURL : '',
    uid: state => state.login_user ? state.login_user.uid : null,
    //関数を返すgetter(idを引数にとる)
    getAddressById: state => id => state.addresses.find(address => address.id === id)
  },
  modules: {
  }
})
