<template>
  <v-container text-xs-center>
    <v-layout row wrap justify-center>
      <v-flex xs12>
        <h1>エントリー情報編集</h1>
      </v-flex>

      <v-flex xs-10 md-6 mt-5>
        <v-card>
          <v-card-text>
            <v-form>
      <!-- DatePickerここから -->
      <v-menu
        v-model="showDatePicker"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="entry.date"
            label="エントリー日"
            prepend-icon="event"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="entry.date" @input="showDatePicker = false"></v-date-picker>
      </v-menu>
      <!-- DatePickerここまで -->
      <!-- TimePickerここから -->
      <v-menu
        ref="menu"
        v-model="showTimePicker"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="entry.time"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="entry.time"
            label="エントリー時刻"
            prepend-icon="access_time"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
          v-if="showTimePicker"
          v-model="entry.time"
          full-width
          format="24hr"
          @click:minute="$refs.menu.save(entry.time)"
        ></v-time-picker>
      </v-menu>
      <!-- TimePickerここまで -->
      <!-- TimePicker2ここから -->
      <v-menu
        ref="menu2"
        v-model="showTimePicker2"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="entry.exittime"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="entry.exittime"
            label="決済時刻"
            prepend-icon="access_time"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
          v-if="showTimePicker2"
          v-model="entry.exittime"
          full-width
          format="24hr"
          @click:minute="$refs.menu2.save(entry.exittime)"
        ></v-time-picker>
      </v-menu>
      <!-- TimePicker2ここまで -->

              <v-select
                v-model="entry.pair"
                label="通貨ペア"
                dence
                :items="pairList"
              ></v-select>
              <v-select
                v-model="entry.result"
                label="結果"
                dence
                :item="resultList"
              ></v-select>
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
      entry: {},
      showDatePicker: false,
      showTimePicker: false,
      showTimePicker2: false,
      pairList: ['ドル円', 'ユーロドル', 'ポンドドル', 'ユーロ円'],
      resultList: ['勝', '負']
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
