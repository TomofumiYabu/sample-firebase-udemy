<template>
  <v-container text-xs-center>
    <v-layout row wrap justify-center>
      <v-flex xs12>
        <h1>エントリー情報編集</h1>
        <v-img :src="entry.imageUrl" alt="画像がありません"></v-img>
      </v-flex>

      <ImageUpload @uploaded="uploadedImage"/>

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
                <v-date-picker
                  v-model="entry.date"
                  @input="showDatePicker = false"
                ></v-date-picker>
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
                v-model="entry.direction"
                label="売買"
                dence
                :items="buysellList"
              ></v-select>
              <v-select
                v-model="entry.direction"
                label="方向"
                dence
                :items="directList"
              ></v-select>
              <v-select
                v-model="entry.method"
                label="手法"
                dence
                :items="methodList"
              ></v-select>
              <v-switch
                v-model="entry.isAuto"
                label="自動決済"
              ></v-switch>
              <v-select
                v-model="entry.result"
                label="結果"
                dence
                :items="resultList"
              ></v-select>
              <v-text-field v-model="entry.pips" label="PIPS"></v-text-field>

              <v-divider />
              <v-subheader>根拠</v-subheader>
              <v-select
                v-model="entry.prosItem"
                label="根拠項目"
                dence
                chips
                muitiple
                :items="itemList"
              ></v-select>
              <v-select
                v-model="entry.prosLine"
                label="意識ライン"
                dence
                chips
                muitiple
                :items="lineList"
              ></v-select>

              <v-divider />
              <v-subheader>懸念</v-subheader>

              <v-select
                v-model="entry.consItem"
                label="懸念項目"
                dence
                chips
                muitiple
                :items="itemList"
              ></v-select>
              <v-select
                v-model="entry.consLine"
                label="懸念意識ライン"
                dence
                chips
                muitiple
                :items="lineList"
              ></v-select>

              <v-btn @click="$router.push({ name: 'entries' })"
                >キャンセル</v-btn
              >
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
import ImageUpload from '@/components/ImageUpload'
export default {
  components: {
    ImageUpload
  },
  created() {
    //URLでエントリーIDを取得できない場合は新規作成
    if (!this.$route.params.entry_id) {
      this.entry.date = new Date().toISOString().substr(0, 10)
      this.entry.pair = "ドル円"
      this.entry.result = "勝"
      this.entry.direction = "順"
      this.entry.pips = 0
      return;
    }
    //取得できた時の読込処理
    const entry = this.$store.getters.getEntryById(this.$route.params.entry_id);
    if (entry) {
      this.entry = entry;
    } else {
      this.$router.push({ name: "entries" });
    }
  },
  data() {
    return {
      entry: {},
      showDatePicker: false,
      showTimePicker: false,
      showTimePicker2: false,
      isAuto: false,
      pairList: ["ドル円", "ユーロドル", "ポンドドル", "ユーロ円"],
      resultList: ["勝", "負", "引分"],
      buysellList: ["ロング", "ショート"],
      directList: ["順", "逆"],
      methodList: ["POG1", "POG2","バンドウォーク","意識ラインブレイク", "バンド内ウォーク","ダブルトップ/ボトム-頂点逆張り", "ダブルトップ/ボトム-ネックライン抜け", "意識ライン逆張り"],
      itemList:['5分足PO', '15分足PO', '1時間足PO', '4時間足PO', 'ヒゲ', 'ダイバージェンス', '底値切り上げ/下げ', '天井切り上げ/下げ', '乖離'],
      lineList:['直近高値/安値', '5分足MA', '5分足EMA','5分足ボリンジャー','15分足MA', '15分足EMA','15分足ボリンジャー','1時間足MA13', '1時間足EMA','1時間足ボリンジャー','4時間足MA13', '4時間足EMA','4時間足ボリンジャー']
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
    uploadedImage(value) {
      this.entry.imageUrl = value;
      alert("ファイルをアップロードしました。")
    },
    ...mapActions(["addEntry", "updateEntry"])
  }
};
</script>
