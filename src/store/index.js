import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    login_user: null,
    drawer: false,
    addresses: [],
    entries: []
  },
  mutations: {
    setLoginUser(state, user) {
      state.login_user = user;
    },
    deleteLoginUser(state) {
      //ログアウト時はstoreのユーザ情報にnullをセットする
      state.login_user = null;
    },
    toggleSideMenu(state) {
      state.drawer = !state.drawer;
    },
    addAddress(state, { id, address }) {
      //引数として受け取ったidをaddressオブジェクトの中に入れてstateを更新する
      address.id = id;
      state.addresses.push(address);
    },
    updateAddress(state, { id, address }) {
      const index = state.addresses.findIndex(address => address.id === id);
      state.addresses[index] = address;
    },
    deleteAddress(state, { id }) {
      const index = state.addresses.findIndex(address => address.id === id);
      state.addresses.splice(index, 1);
    },
    addEntry(state, { id, entry }) {
      //引数として受け取ったidをaddressオブジェクトの中に入れてstateを更新する
      entry.id = id;
      state.entries.push(entry);
    },
    updateEntry(state, { id, entry }) {
      const index = state.entries.findIndex(entry => entry.id === id);
      state.entries[index] = entry;
    },
    deleteEntry(state, {id}) {
      const index = state.entries.findIndex(entry => entry.id === id);
      state.entries.splice(index,1);
    }
  },
  actions: {
    setLoginUser({ commit }, user) {
      commit("setLoginUser", user);
    },
    deleteLoginUser({ commit }) {
      commit("deleteLoginUser");
    },
    login() {
      // firebaseのログイン機能を呼び出す
      // googleの画面にてサインイン後、元のページに自動でリダイレクトされる
      const google_auth_provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(google_auth_provider);
    },
    logout() {
      //firebaseのログアウト機能を呼び出す
      firebase.auth().signOut();
    },
    toggleSideMenu({ commit }) {
      commit("toggleSideMenu");
    },
    fetchAddresses({ getters, commit }) {
      // firestoreからデータを取得する。取得時のデータ形式に注意
      firebase
        .firestore()
        .collection(`users/${getters.uid}/addresses`)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc =>
            commit("addAddress", { id: doc.id, address: doc.data() })
          );
        });
    },
    addAddress({ getters, commit }, address) {
      if (this.getters.uid) {
        firebase
          .firestore()
          .collection(`users/${getters.uid}/addresses`)
          .add(address)
          .then(doc => {
            commit("addAddress", { id: doc.id, address });
          });
      }
    },
    updateAddress({ getters, commit }, { id, address }) {
      if (getters.uid) {
        firebase
          .firestore()
          .collection(`users/${getters.uid}/addresses`)
          .doc(id)
          .update(address)
          .then(() => {
            commit("updateAddress", { id, address });
          });
      }
    },
    deleteAddress({ getters, commit }, { id }) {
      if (getters.uid) {
        firebase
          .firestore()
          .collection(`users/${getters.uid}/addresses`)
          .doc(id)
          .delete()
          .then(() => {
            commit("deleteAddress", { id });
          });
      }
    },
    fetchEntries({ getters, commit }) {
      // firestoreからデータを取得する。取得時のデータ形式に注意
      firebase
        .firestore()
        .collection(`users/${getters.uid}/entries`)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc =>
            commit("addEntry", { id: doc.id, entry: doc.data() })
          );
        });
    },
    addEntry({ getters, commit }, entry) {
      if (this.getters.uid) {
        firebase
          .firestore()
          .collection(`users/${getters.uid}/entries`)
          .add(entry)
          .then(doc => {
            commit("addEntry", { id: doc.id, entry });
          });
      }
    },
    updateEntry({ getters, commit }, { id, entry }) {
      if (getters.uid) {
        firebase
          .firestore()
          .collection(`users/${getters.uid}/entries`)
          .doc(id)
          .update(entry)
          .then(() => {
            commit("updateEntry", { id, entry });
          });
      }
    },
    deleteEntry({ getters, commit }, { id }) {
      if (getters.uid) {
        firebase
          .firestore()
          .collection(`users/${getters.uid}/entries`)
          .doc(id)
          .delete()
          .then(() => {
            commit("deleteEntry", { id });
          });
      }
    }
  },
  getters: {
    userName: state => (state.login_user ? state.login_user.displayName : ""),
    photoURL: state => (state.login_user ? state.login_user.photoURL : ""),
    uid: state => (state.login_user ? state.login_user.uid : null),
    //関数を返すgetter(idを引数にとる)
    getAddressById: state => id =>
      state.addresses.find(address => address.id === id),
    getEntryById: state => id => state.entries.find(entry => entry.id === id)
  },
  modules: {}
});
