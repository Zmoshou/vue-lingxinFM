<template>
  <div class="hotSearch-container">
    <div class="hot_search_box">
      <div class="search_icon_box">
        <span class="search_icon iconfont icon-liuhang"></span> 热门搜索
      </div>
      <div class="hot_word">
        <span
          class="words"
          v-for="(item, index) in hotWordList"
          :key="index"
          @click="searchHotWord(index)"
        >{{ item }}</span>
      </div>
    </div>
    <div class="search_history">
      <div class="search_record">
        <span>历史搜索记录</span>
        <span class="delete iconfont icon-shanchu-copy-copy" @click="removeAllhistory"></span>
      </div>
      <ul class=".search_record_words">
        <li
          class="words_item"
          v-for="(item, index) in historyWordsList"
          :key="index"
          @click="searchHsitoryWord(index)"
        >
          <span class="tmieicon iconfont icon-shijian"></span>
          <p class="word">{{ item }}</p>
          <span class="remove iconfont icon-chahao" @click.stop="removeThisHistory(index)"></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hotWordList: [
        "睡前故事",
        "人际",
        "心事博物馆",
        "失眠",
        "音乐",
        "孤独",
        "3分钟心理学",
        "纱朵",
        "放松",
        "心理fm",
        "悦读心时光",
        "治愈"
      ],
      historyWordsList: this.$store.state.historyWordsList
    };
  },
  methods: {
    searchHotWord(idx) {
      // this.$emit("父组件方法名", 子组件data的数据);
      this.$emit("newWordChange", this.hotWordList[idx]);
    },
    searchHsitoryWord(idx) {
      // this.$emit("父组件方法名", 子组件data的数据);
      this.$emit("newWordChange", this.historyWordsList[idx]);
    },
    removeAllhistory() {
      this.historyWordsList = [];
      this.$store.commit("removeAllHstoryWords");
    },
    removeThisHistory(idx) {
      // this.historyWordsList.splice(idx, 1);
      this.$store.commit("removeThisHstoryWords", idx);
    }
  }
};
</script>

<style lang="scss" scoped>
.hotSearch-container {
  padding: 0 0.25rem 2.5rem;
  .hot_search_box {
    .search_icon_box {
      line-height: 1.5rem;
      color: #fa7963;
      font-size: 0.3rem;
      .search_icon {
        font-size: 0.25rem;
      }
    }
    .hot_word {
      padding-bottom: 0.625rem;
      .words {
        display: inline-block;
        line-height: 1rem;
        font-size: 0.35rem;
        padding: 0 0.5rem;
        background-color: #f7f7f7;
        color: #818181;
        margin-bottom: 0.625rem;
        margin-right: 0.25rem;
        border-radius: 15px;
      }
    }
  }
  .search_history {
    .search_record {
      height: 1.2rem;
      display: flex;
      color: #818181;
      justify-content: space-between;
      font-size: 0.25rem;
      .delete {
        color: #818181;
        width: 0.8rem;
        text-align: right;
        font-size: 0.5rem;
      }
    }
    .words_item {
      height: 1.8rem;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #f7f7f7;
      .tmieicon {
        font-size: 0.35rem;
        color: #818181;
      }
      .word {
        font-size: 0.5rem;
        margin-left: 0.35rem;
        width: 88%;
      }
      .remove {
        margin-left: 0.25rem;
        width: 0.8rem;
        font-size: 0.6rem;
        color: #ccc;
        text-align: right;
      }
    }
  }
}
</style>