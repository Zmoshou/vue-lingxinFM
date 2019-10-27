import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

let historyWordsList = JSON.parse(localStorage.getItem('historyWordsList') || '[]'); //取出本地储存的搜索记录

const store = new Vuex.Store({
  state: {
    key: '&key=046b6a2a43dc6ff6e770255f57328f89', //配置请求的key
    token: "b845588abcf58804c99d289584cd6068", //用户的token

    historyWordsList,
  },
  mutations: {
    addHstoryWords(state, searchWord) {
      if (state.historyWordsList.indexOf(searchWord) != -1) {
        let index = state.historyWordsList.indexOf(searchWord);
        state.historyWordsList.splice(index, 1);
      }
      state.historyWordsList.unshift(searchWord);
      localStorage.setItem('historyWordsList', JSON.stringify(state.historyWordsList));
    },
    removeAllHstoryWords(state) {
      state.historyWordsList = [];
      localStorage.setItem('historyWordsList', JSON.stringify(state.historyWordsList));
    },
    removeThisHstoryWords(state, index) {
      console.log(index);
      console.log(state.historyWordsList);

      state.historyWordsList.splice(index, 1);
      localStorage.setItem('historyWordsList', JSON.stringify(state.historyWordsList));
    }
  }

})

export default store