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
        <span class="delete iconfont icon-shanchu-copy-copy" @click="dialogShow = true"></span>
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
    <div class="dialog_box" v-show="dialogShow">
      <div class="dialog">
        <div class="dialog_title">确定清空历史记录吗？</div>
        <span class="confirm" @click="removeAllhistory">确定</span>
        <span class="cancel" @click.stop="dialogShow = false">取消</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogShow: false,
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
      this.dialogShow = false;
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
        font-size: 0.45rem;
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
//确认框样式-----
.dialog_box {
  position: fixed;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 3000;
  .dialog {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: 14%;
    border-radius: 5px;
    background-color: #fff;
    .dialog_title {
      position: absolute;
      top: 20%;
      left: 8%;
      font-size: 0.6rem;
      color: #666;
    }
    span {
      position: absolute;
      font-size: 0.5rem;
      bottom: 18%;
      width: 12%;
      text-align: center;
    }
    .confirm {
      right: 5%;
      color: #f3482a;
    }
    .cancel {
      right: 20%;
      color: #000;
    }
  }
}
</style>