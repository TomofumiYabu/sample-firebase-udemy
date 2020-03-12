<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex xs12>
        <p>画像アップロード</p>
        <!-- 画像のプレビュー表示領域 -->
        <v-img :src="upimage.fileUrl" :contain="true"></v-img>
        <!-- ファイル情報部分
        <p>{{ upimage.fileName }}</p>
        <p>圧縮前サイズ(MB):{{ fileInfo.before.size }}</p>
        <p>圧縮後サイズ(MB):{{ fileInfo.after.size }}</p>
        -->
      </v-flex>
      <v-flex xs12>
        <!-- ファイルの選択 -->
        <input @change="selectedFile" type="file" accept="image/jpeg, image/jpg, image/png">
      </v-flex>
      <v-flex xs12>
        <!-- Submitボタン -->
        <v-btn color="primary" :disabled="isUploading" @click="submit()">submit</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ImageUtil from "./lib/ImageUtil.js"
import firebase from "firebase"

export default {
  data() {
    return {
      isUploading: false, // 画像ファイルアップロード中の判断フラグ
      upimage: { fileUrl: "", fileName: "", blob: null }, // 画像ファイル
      fileInfo: {
        before: { size: 0 },
        after: { size: 0 }
      },
      imageUrl: null
    };
  },
  methods: {
async selectedFile(e) {
      this.isUploading = true;

      const file = e.target.files[0];
      if (!file) {
        return;
      }

      try {
        // 圧縮した画像を取得
        const compFile = await ImageUtil.getCompressImageFileAsync(file);

        //ファイルサイズの表示
        this.fileInfo.before.size = (file.size / 1024 / 1024).toFixed(4);
        this.fileInfo.after.size = (compFile.size / 1024 / 1024).toFixed(4);
        // 画像情報の設定
        this.upimage.blob = compFile;
        this.upimage.fileUrl = await ImageUtil.getDataUrlFromFile(compFile);
        this.upimage.fileName = file.name;
      } catch (err) {
        // エラーメッセージ等を表示
      } finally {
        this.isUploading = false;
      }
    },
    submit: function() {
      //----------- 画像をサーバに送信する処理 -----------
      this.isUploading = true;

      if (!this.upimage.blob) {
        return;
      }
      try{
        // ストレージオブジェクト作成
        var storageRef = firebase.storage().ref();
        // ファイルのパスを設定
        var mountainsRef = storageRef.child(`entry/images/${this.upimage.fileName}`);
        // ファイルを適用してファイルアップロード開始
        mountainsRef.put(this.upimage.blob).then(snapshot => {
          snapshot.ref.getDownloadURL().then(downloadURL => {
            this.imageUrl = downloadURL;
            this.$emit('uploaded', this.imageUrl);
          });
        });
      } finally {
        this.isUploading = false;
      }

    }
  }
};
</script>