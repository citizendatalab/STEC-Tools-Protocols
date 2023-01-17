<template>
  <div class="container">
     <my-header></my-header>
     <div class="row">
      <div class="col-sm-8">
        <hr>
        <p>This tool allows you to convert raw text to a sorted list of word counts
        which can then be plotted on an A3 poster for use in workshops as explained <a target="_blank" href="https://visualmethodologies.org/Workshop-at-AMFI-Talk-back-to-the-map">here</a>.</p>
      </div>
      <div class="col-sm-4"></div>
      </div>
      <div class="row">
      <div class="col-sm-12">
        <span class="settingsHeader">Add your text below</span>
        <textarea v-model="rawtext" cols="50" rows="10" placeholder="raw text is fine"></textarea>
      </div>
      </div>
      <div class="row">
      <div class="col-sm-6">
      <p>
        <span class="settingsHeader">Text Settings:</span><br>
        Language: <select v-model="language" id="langugage">
                     <option value="dutch">Dutch</option>
                     <option value="english">English</option>
                   </select><br>
        Min number of word occurences:
        <input type="number" v-model="min_num_occ" min="1" value="2"/> <br>
        Min word length
        <input type="number" v-model="min_word_length" min="1" value="3"/> character (s)<br>
    </p>
        <button type="button"
            class="btn btn-success btn-sm" v-on:click="sendData()">Retrieve word counts</button>
        </div>
        <div class="col-sm-6">
        <span class="settingsHeader">Poster Settings:</span><br>
        <p>
        Number of columns: <select v-model="columns" id="columns">
                     <option value="1">1</option>
                     <option value="2">2</option>
                     <option value="3">3</option>
                   </select><br>
         Title/Source: <input type="text" v-model="title_source" /> <br>
           </p>
            <button type="button"
                class="btn btn-success btn-sm" :disabled="words.length == 0"
                v-on:click="createPDF()">Generate PDF</button>
         </div>

      </div>
       <div class="row">
      <div class="col-sm-12">
        <table class="table table-hover">
          <thead>
            <tr v-show="words.length != 0">
              <th scope="col">Word</th>
              <th scope="col">Count</th>
              <th> <button type="button" class="btn btn-success btn-sm"
                :disabled="words.length == 0"
                v-on:click="csvExport()">Download CSV</button></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(word, index) in words" :key="index">
              <td :class="{'hidewordclass': word[2]}">{{ word[0] }}</td>
              <td :class="{'hidewordclass': word[2]}">{{ word[1] }}</td>
              <td :class="{'hidewordclass': word[2]}">
                <div class="btn-group" role="group">
                  <button type="button" class="btn btn-danger btn-sm"
                  :disabled="!word[2]"
                  v-on:click="unhideWord(index)">Hide</button>
                  <button type="button"
                  class="btn btn-danger btn-sm"
                  :disabled="word[2]"
                  v-on:click="hideWord(index)">Show</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

      </div>
    </div>
  </div>
</template>

<style>
    textarea {
    width:100%
    }

    .hidewordclass{
        background-color:#F2F2F2;
        color:#D3D3D3
    }

    button{
        margin-right:10px
    }
    .settingsHeader{
    font-weight:bold;
    }
</style>


<script>
import axios from 'axios';
import Vue from 'vue';
import Header from './Header.vue';

export default {
  name: 'Main',
  components: {
    'my-header': Header,
  },
  data() {
    return {
      rawtext: '',
      min_num_occ: 2,
      min_word_length: 3,
      language: 'dutch',
      words: [],
      columns: 2,
      title_source: '',
    };
  },
  methods: {
    getText(payload) {
      // const path = 'http://localhost:5000/text';
      const path = 'http://vmc-genposter.herokuapp.com/text';
      axios.post(path, payload)
        .then((res) => {
          this.words = res.data;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    sendData() {
      const payload = {
        text: this.rawtext,
        min_num_occ: this.min_num_occ,
        min_word_length: this.min_word_length,
        language: this.language,
      };
      this.getText(payload);
    },
    hideWord(index) {
      Vue.set(this.words[index], 2, true);
    },
    unhideWord(index) {
      Vue.set(this.words[index], 2, false);
    },
    csvExport() {
      const exportData = this.words;
      let csvContent = 'data:text/csv;charset=utf-8,';
      csvContent += [
        Object.keys(exportData[0]).join(';'),
        ...exportData.map((item) => Object.values(item).join(';')),
      ]
        .join('\n')
        .replace(/(^\[)|(\]$)/gm, '');

      const data = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', data);
      link.setAttribute('download', 'export.csv');
      link.click();
    },
    createPDF() {
      const payload = {
        wordlist: this.words,
        columns: this.columns,
        title_source: this.title_source,
      };
      console.log(payload);
      // const path = 'http://localhost:5000/pdf';
      const path = 'http://vmc-genposter.herokuapp.com/pdf';
      axios({
        method: 'post',
        url: path,
        responseType: 'arraybuffer',
        data: payload,
      })
        .then((response) => {
          const blob = new Blob([response.data], { type: 'application/pdf' });
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = 'Report.pdf';
          link.click();
        });
    },
  },

  created() {
    // this.getMessage();
  },
};
</script>
