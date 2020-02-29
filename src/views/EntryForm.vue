<template>
  <v-container text-xs-center>
    <v-layout row wrap justify-center>
      <v-flex xs12>
        <h1>エントリー情報編集</h1>
      </v-flex>

      <v-flex xs5 mt-5>
        <v-card>
          <v-card-text>
            <v-form>
              <v-text-field v-model="entry.datetime" label="日時"></v-text-field>
              <v-text-field
                v-model="entry.pair"
                label="通貨ペア"
              ></v-text-field>
              <v-text-field
                v-model="entry.result"
                label="結果"
              ></v-text-field>
              <v-text-field
                v-model="entry.pips"
                label="PIPS"
              ></v-text-field>
              <v-btn @click="$router.push({ name: 'entries' })">キャンセル</v-btn>
              <v-btn color="info" @click="submit()">保存</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
export default {
  created() {
    //URLでエントリーIDを取得できない場合はcreatedでは何もしない
    if (!this.$route.params.entry_id) return;
    //取得できた時の読込処理
    const entry = this.$store.getters.getEntryById(this.$route.params.entry_id)
    if(entry) {
      this.entry = entry
    } else {
      this.$router.push({name: 'entries' })
    }
  },
  data() {
    return {
      entry: {}
    };
  },
  methods: {
    submit() {
      if (this.$route.params.entry_id) {
        this.updateEntry({
          id: this.$route.params.entry_id,
          entry: this.entry
        });
      } else {
        this.addEntry(this.entry);
      }
      this.$router.push({ name: "entries" });
    },
    ...mapActions(["addEntry", "updateEntry"])
  }
};
</script>
