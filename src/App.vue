<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-side-icon v-show="$store.state.login_user" @click="toggleSideMenu"></v-toolbar-side-icon>
      <v-toolbar-title class="headline text-uppercase">
        <span>エントリーノート</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items v-if="$store.state.login_user">
        <v-btn @click="logout">ログアウト</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <SideNav/>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import firebase from 'firebase'
import { mapActions } from 'vuex'
import SideNav from './components/SideNav.vue'
export default {
  name: 'App',
  components: {
    SideNav
  },
  created () {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        //firebaseからユーザが渡された（＝ログイン成功した）のでユーザ情報をstoreに格納
        this.setLoginUser(user)
        this.fetchAddresses()
        this.fetchEntries()
        //ログイン後、現在のページがhomeだった時にエントリー一覧のページへ移動する
        if(this.$router.currentRoute.name === 'home') this.$router.push({ name: 'entries'})
      } else {
        //nullが来たときはログアウト時なのでstoreのユーザ情報削除
        this.deleteLoginUser()
        //ログアウトしたらhomeへ移動
        this.$router.push({ name: 'home' })
      }
    })
  },
  data: () => ({
    //
  }),
  methods: {
    ...mapActions(['toggleSideMenu', 'setLoginUser', 'logout', 'deleteLoginUser', 'fetchAddresses', 'fetchEntries'], )
  }
};
</script>
