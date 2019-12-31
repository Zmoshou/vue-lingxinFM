<template>
  <div>
    <van-popup v-model="popupShow" round position="bottom" :style="{ height: '60%' }">
      <div class="popup-container">
        <div class="popup_title">
          <div class="title_left">
            <div class="playMode_box" v-show="playerMode == 1" @click.stop="changePlayMode(2)">
              <span class="playicon iconfont icon-shunxubofang"></span>
              <span class="mode_name">顺序播放</span>
            </div>
            <div class="playMode_box" v-show="playerMode == 2" @click.stop="changePlayMode(3)">
              <span class="playicon iconfont icon-danquxunhuan"></span>
              <span class="mode_name">单曲循环</span>
            </div>
            <div class="playMode_box" v-show="playerMode == 3" @click.stop="changePlayMode(1)">
              <span class="playicon iconfont icon-suiji"></span>
              <span class="mode_name">随机播放</span>
            </div>
            <span class="list_num">({{ playerList.length }}首)</span>
            <span class="paly_order" v-show="order" @click="orderList">正序</span>
            <span class="paly_order" v-show="!order" @click="orderList">倒序</span>
          </div>
          <div class="title_right">
            <span class="iconfont icon-xiazai" @click.stop="$toast('下载好了，小老弟')"></span>
            <span class="iconfont icon-shanchu-copy-copy" @click.stop="dialogShow = true"></span>
          </div>
        </div>
        <div class="popup_content" ref="popupContent">
          <ul>
            <li class="item" v-for="(item, index) in playerList" :key="index" ref="item">
              <div class="item_title" @click.stop="playRadio(item.id)">
                <div class="longBox" v-show="index == selectIndex"></div>
                <div :class="['i_title',{'i_title_select':index == selectIndex}]">{{ item.title }}</div>
                <div class="i_speak">{{ item.speak }}</div>
              </div>
              <div class="item_icon">
                <span class="i_icon iconfont icon-xinaixin1"></span>
                <span class="i_icon iconfont icon-chahao" @click.stop="removeThisRadio(index)"></span>
              </div>
            </li>
          </ul>
        </div>
        <div class="popup_close" @click.stop="popupShow=false">关闭</div>
      </div>
    </van-popup>
    <!-- 确认框部分 之后考虑拆不拆成组件 -->
    <div class="dialog_box" v-show="dialogShow">
      <div class="dialog">
        <div class="dialog_title">确定清空播放列表吗？</div>
        <span class="confirm" @click="removeAllRadio">确定</span>
        <span class="cancel" @click.stop="dialogShow = false">取消</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      dialogShow: false,
      popupShow: false,
      order: true
    };
  },
  watch: {
    playerList: function(newVal, oLdVal) {
      if (newVal.length == 0) {
        this.popupShow = false;
        this.$store.commit("setMediaUrlId", -1);
        this.$store.commit("setPlaying", true);
        this.$store.commit("setFullScreen", false);
      }
    },
    mediaUrlId: function(newVal, oldVal) {
      if (newVal !== oldVal) {
        let idx = this.playerList.findIndex(ele => {
          return ele.id === this.mediaUrlId;
        });
        this.$store.commit("setSelectIndex", idx);
      }
    }
  },
  computed: {
    ...mapGetters(["playerList", "playerMode", "mediaUrlId", "selectIndex"])
  },
  methods: {
    changePlayMode(modeNum) {
      this.$store.commit("setPlayerMode", modeNum);
    },
    playRadio(radioId) {
      console.log(this.mediaUrlId);
      this.$store.commit("setMediaUrlId", radioId);
    },
    removeThisRadio(index) {
      console.log(index);
      console.log(this.selectIndex);

      if (index === this.selectIndex) {
        this.$parent.changeRadio(this.mediaUrlId, 1);
      }
      this.$store.commit("removeOnePlayerList", index);
    },
    removeAllRadio() {
      this.$parent.$refs.audio.pause();
      this.dialogShow = false;
      this.popupShow = false;
      this.$store.commit("setPlayerList", []);
      this.$store.commit("setMediaUrlId", -1);
      this.$store.commit("setPlaying", true);
      this.$store.commit("setFullScreen", false);
    },
    orderList() {
      this.order = !this.order;
      let order = this.playerList.reverse();
      this.$store.commit("setPlayerList", order);
      //重新设置高亮播放曲目
      let lightIndex = this.$store.state.playerList.findIndex(ele => {
        return ele.id == this.$store.state.mediaUrlId;
      });
      this.$store.commit("setSelectIndex", lightIndex);
      this.scrollInit();
    },
    scrollInit() {
      this.$refs.popupContent.scrollTop =
        this.$refs.item[0].offsetHeight * (this.selectIndex - 1);
    }
  }
};
</script>

<style lang="scss" scoped>
.longBox {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: #f3482a;
  // animation: name duration timing-function delay iteration-count direction fill-mode;
  animation: boxShow 1.5s linear infinite alternate;
  @keyframes boxShow {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
}
.popup-container {
  position: relative;
  height: 100%;
  padding: 0.25rem;
  box-sizing: border-box;
  .popup_title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 12%;
    border-bottom: 1px solid #f2f2f2;
    .title_left {
      height: 1.2rem;
      align-items: center;
      display: flex;
      .playMode_box .playicon {
        width: 0.7rem;
        display: inline-block;
        font-size: 0.6rem;
        color: #fa7963;
        margin-right: 0.25rem;
      }
      .mode_name {
        font-size: 0.6rem;
        font-weight: 800;
      }
    }
    .list_num {
      margin: 0 0.325rem;
      font-size: 0.4rem;
      color: #b1b5b8;
    }
    .paly_order {
      display: inline-block;
      text-align: center;
      width: 1.2rem;
      font-size: 0.5rem;
      border-radius: 5px;
      line-height: 0.65rem;
      color: #f3482a;
      border: 1px solid #fa7963;
    }
  }
  .item_icon,
  .title_right {
    span {
      display: inline-block;
      margin-right: 0.325rem;
      text-align: center;
      width: 1rem;
      font-size: 0.55rem;
      color: #666;
      line-height: 0.75rem;
    }
  }
}
.popup_content {
  height: 76%;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none; /*隐藏滚动条*/
  }
  .item {
    box-sizing: border-box;
    height: 1.6rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f2f2f2;
    .item_title {
      width: 75%;
      height: 0.65rem;
      line-height: 0.65rem;
      display: flex;
      justify-content: space-between;
      .i_title {
        width: 70%;
        font-size: 0.5rem;
        color: #000;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .i_title_select {
        color: #f3482a;
      }
      .i_speak {
        width: 20%;
        font-size: 0.4rem;
        color: #b1b5b8;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .item_icon {
      .i_icon {
        color: #b1b5b8;
      }
    }
  }
}
.popup_close {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 12%;
  font-size: 0.65rem;
  color: #666;
  border-top: 1px solid #f2f2f2;
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