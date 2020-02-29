<template>
  <v-container text-xs-center justify-center>
    <v-layout row wrap>
      <v-flex xs12>
        <h1>エントリー一覧</h1>
      </v-flex>

      <v-flex xs12 mt-5 text-xs-right>
        <router-link :to="{name: 'addresses_edit'}">
          <v-btn color="info">エントリー記録新規作成</v-btn>
        </router-link>
      </v-flex>


      <v-flex xs12 mt-5 justify-center>
        <v-data-table :headers='headers' :items='entries'>
          <template v-slot:items="props">
            <td class="text-xs-left">{{ props.item.datetime }}</td>
            <td class="text-xs-left">{{ props.item.pair }}</td>
            <td class="text-xs-left">{{ props.item.result }}</td>
            <td class="text-xs-left">{{ props.item.pips }}</td>
            <!--
            <td class="text-xs-left">
              <span>
                <router-link :to="{ name: 'addresses_edit', params: {address_id: props.item.id}}">
                  <v-icon small class="mr-2">edit</v-icon>
                </router-link>
              </span>
              <span>
                <v-icon small class="mr-2" @click="deleteConfirm(props.item.id)">delete</v-icon>
              </span>
            </td>
            -->
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
//import { mapActions } from 'vuex'

export default {
  data () {
    return {
      headers: [
        { text: '日時', value: 'datetime' },
        { text: '通貨ペア', value: 'pair' },
        { text: '結果', value: 'result' },
        { text: 'PIPS', value: 'pips' },
        { text: '操作', sortable: false}
      ],
      entries: []
      //entries: [{datetime: '20200224123110', pair: 'ドル円', result: '勝', pips: '5.0'}]
    }
  }
}

</script>