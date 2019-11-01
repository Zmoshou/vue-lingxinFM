import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

let historyWordsList = JSON.parse(localStorage.getItem('historyWordsList') || '[]'); //取出本地储存的搜索记录

const store = new Vuex.Store({
  state: {
    key: '&key=046b6a2a43dc6ff6e770255f57328f89', //配置请求的key
    token: "b845588abcf58804c99d289584cd6068", //用户的token
    mediaUrlId: '',
    historyWordsList, //搜索框的历史纪录词
    //-----播发器控制部分-------------------------
    fullScreen: false, // 播放页面的展开收起
    playing: true, // 控制音频播放和暂停
    playerList: [], //footer-play中的播放列表
    playerMode: 1, //1顺序播放 2单曲循环 3随机播放
    footerShow: true //进入appCover页面时使底部盒子影藏
  },
  mutations: {
    // 设置搜索页面历史词记录
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
      state.historyWordsList.splice(index, 1);
      localStorage.setItem('historyWordsList', JSON.stringify(state.historyWordsList));
    },
    //-----进入appCover页面时使底部盒子影藏-----
    setFooterShow(state, flag) {
      state.footerShow = flag;
    },
    //-----播发器控制部分-------------
    setMediaUrlId(state, id) {
      state.mediaUrlId = id
    },
    //-------设置播放器是否全屏---------
    setFullScreen(state, flag) {
      state.fullScreen = flag
    },
    //-------设置播放和暂停---------
    setPlaying(state, flag) {
      state.playing = flag
    },
    //--------footer-player 播放列表---------
    setPlayerList(state, list) {
      state.playerList = list
    },
    removeOnePlayerList(state, radioIndex) {
      state.playerList.splice(radioIndex, 1);
    },
    //-------设置播放模式---------
    setPlayerMode(state, modeNum) {
      state.playerMode = modeNum
    }
  },
  getters: {
    footerShow: state => state.footerShow,
    fullScreen: state => state.fullScreen,
    mediaUrlId: state => state.mediaUrlId,
    playing: state => state.playing,
    playerList: state => state.playerList,
    playerMode: state => state.playerMode,
  }

})

export default store