<template>
  <div class="footerPlayer-container">
    <transition name="playerPage">
      <div class="playerPage-box" v-show="fullScreen" @touchmove.prevent>
        <div class="playerPage-bg" :style="{backgroundImage: 'url(' + this.playerInfo.cover + ')'}"></div>
        <div class="content-box">
          <div class="header">
            <span @click="toDown" class="down iconfont icon-icon-test60"></span>
            <span class="yuanwen iconfont icon-ziyuan"></span>
            <span class="share iconfont icon-fenxiang1"></span>
          </div>
          <div class="cover-box">
            <div class="cover">
              <img :src="playerInfo.cover" />
            </div>
            <div class="description">
              <h4 class="title">{{ playerInfo.title }}</h4>
              <p class="speak">
                <span>{{ playerInfo.speak }} ></span>
              </p>
            </div>
          </div>
          <div class="control-box">
            <div class="progress_box">
              <span class>{{ currentTime | timeFormat }}</span>
              <div
                class="progress_outer"
                ref="progress"
                @touchstart.prevent="progressTouchStart"
                @touchmove.prevent="progressTouchMove"
                @touchend.prevent="progressTouchEnd"
              >
                <div class="progress">
                  <div class="progress_bar" ref="progressBar" :style="{width:barWidth}">
                    <div class="circle" ref="progressBtn"></div>
                  </div>
                </div>
              </div>
              <span>{{ playerInfo.duration | timeFormat}}</span>
            </div>
            <div class="icon_box">
              <div class="action" @click="shouCang = !shouCang">
                <span class="iconfont icon-xinaixin1" v-show="!shouCang"></span>
                <transition name="shou_cang">
                  <span class="iconfont icon-main_girl" style="color:#fa7963" v-show="shouCang"></span>
                </transition>
                <span class="like_num">{{ playerInfo.sharenum + Number(shouCang) }}</span>
              </div>
              <div class="action">
                <span class="iconfont icon-xiazai"></span>
              </div>
              <div class="action" @click="toComment($store.state.mediaUrlId)">
                <span class="message iconfont icon-icon-test2"></span>
                <span class="message_num">{{ playerInfo.commentnum }}</span>
              </div>
              <div class="action">
                <span class="iconfont icon-shijian1"></span>
              </div>
            </div>
            <div class="player_contolrol_box">
              <div class="player_mode">
                <span
                  v-show="playerMode == 1"
                  class="iconfont icon-shunxubofang"
                  @click.stop="changePlayMode(2)"
                ></span>
                <span
                  v-show="playerMode == 2"
                  class="iconfont icon-danquxunhuan"
                  @click.stop="changePlayMode(3)"
                ></span>
                <span
                  v-show="playerMode == 3"
                  class="iconfont icon-suiji"
                  @click.stop="changePlayMode(1)"
                ></span>
              </div>
              <div class="player_pre">
                <span class="iconfont icon-shangyishou" @click="changeRadio(playerInfo.id,-1)"></span>
              </div>
              <div class="player_btn" @click="playClick">
                <span v-show="playing" class="iconfont icon-bofang"></span>
                <span v-show="!playing" class="iconfont icon-zanting"></span>
              </div>
              <div class="player_next">
                <span class="iconfont icon-xiayishou" @click.stop="changeRadio(playerInfo.id,1)"></span>
              </div>
              <div class="player_list" @click.stop="changePopUPshow">
                <span class="iconfont icon-yinleliebiao1"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <div v-if="footerShow">
      <transition name="footer">
        <footer class="footer-box" @click="toUp" v-show="!fullScreen&& playerList.length > 0">
          <div class="smallPalyBtn" @click.stop="playClick">
            <van-icon class="smallPlay" v-show="playing" name="play" />
            <van-icon class="smallPlay" v-show="!playing" name="pause" />
            <van-circle v-model="cicleBar" layer-color="#ccc" color="#fa7963" size="1.5rem" />
          </div>
          <div class="smallMessageBox">
            <p class="smallTitle">{{playerInfo.title}}</p>
            <p class="smallSpeak">{{playerInfo.speak}}</p>
          </div>
          <span
            class="smallNext iconfont icon-xiayishou"
            @click.stop="changeRadio(playerInfo.id,1)"
          ></span>
          <span class="smallPlaylist iconfont icon-yinleliebiao" @click.stop="changePopUPshow"></span>
        </footer>
      </transition>
      <footer
        class="footer-box"
        @click.stop="$toast('先选择播放内容啦 o(∩_∩)o')"
        v-show="playerList.length <= 0"
      >
        <p class="hide_title">聆心FM,世界和我爱着你</p>
      </footer>
      <footer-popup ref="footerPopup"></footer-popup>
      <radio-popup></radio-popup>
    </div>
    <audio ref="audio" @timeupdate="timeUpdate" @ended="audioEnd" autoplay></audio>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import footerPopup from "./footer-popup.vue";
import radioPopup from "./radioPopup.vue";
export default {
  data() {
    return {
      popupShow: true,
      songFlag: false, //节流阀解决鼠标控制进度条时 进度条还会随歌曲进度改变的问题
      barWidth: 0, //进度条的进度长
      cicleBar: 0, //小播放器圆圈的进度
      // touch: {}, //用来控制拖动进度条时间的对象
      currentTime: 0,
      playerInfo: {},
      songReadey: false, // 能否跳转下一曲 还没使用
      //------------
      shouCang: false
    };
  },
  watch: {
    mediaUrlId: function(newVal, oldVal) {
      console.log(newVal);
      if (newVal == -1) {
        //播放列表清空时干的事
        this.$refs.audio.src = "";
        return this.$toast("暂无播放歌曲");
      }
      if (newVal != oldVal) {
        // this.barWidth = 0;
        this.getPlayer();
        this.$store.commit("setPlaying", false);
        //设置列表中正在播放高亮的索引
        let index = this.playerList.findIndex(ele => {
          return ele.id === this.mediaUrlId;
        });
        this.$store.commit("setSelectIndex", index);
      }
    }
  },
  computed: {
    ...mapGetters([
      "fullScreen",
      "mediaUrlId",
      "playing",
      "playerList",
      "playerMode",
      "footerShow"
    ])
  },
  methods: {
    //大播放器
    toUp() {
      this.$store.commit("setFullScreen", true);
    },
    //小播放器
    toDown() {
      this.$store.commit("setFullScreen", false);
    },
    //初始化播放器
    getPlayer() {
      this.$axios
        .get("fm/broadcast-detail.json", {
          params: {
            id: this.mediaUrlId,
            key: this.$store.state.key
          }
        })
        .then(res => {
          if (res.data.code === 0) {
            this.playerInfo = res.data.data;
            if (this.$refs.audio.src != this.playerInfo.url) {
              this.$refs.audio.src = this.playerInfo.url;
            }
          }
        });
    },
    //去评论页面
    toComment(id) {
      this.$router.push({
        name: "comment",
        params: { id }
      });
    },
    //音频播放时间和进度条跟新
    timeUpdate(e) {
      // 进度条岁歌曲进度显示
      // 利用节流阀解决鼠标控制进度条时 进度条还会随歌曲进度改变的问题
      if (this.songFlag == false) {
        this.currentTime = e.target.currentTime;
        let width = Math.floor(
          (e.target.currentTime / e.target.duration) * 100
        );
        this.cicleBar = width;
        this.barWidth = width + "%";
      }
    },
    //控制进度条
    progressTouchStart(e) {
      this.songFlag = true; //手指按下时 进度条停止跳动
      // 点击进度条改变时间和进度
      let width =
        ((e.touches[0].pageX - this.$refs.progress.offsetLeft) /
          this.$refs.progress.offsetWidth) *
        100;
      width = width >= 100 ? 100 : width;
      width = width <= 0 ? 0 : width;
      this.cicleBar = width;
      this.barWidth = width + "%";
      this.currentTime = this.$refs.audio.duration * (width / 100);
    },
    progressTouchMove(e) {
      // 移动进度条改变时间和进度
      let width =
        ((e.touches[0].pageX - this.$refs.progress.offsetLeft) /
          this.$refs.progress.offsetWidth) *
        100;
      width = width >= 100 ? 100 : width;
      width = width <= 0 ? 0 : width;
      this.cicleBar = width;
      this.barWidth = width + "%";
      this.currentTime = this.$refs.audio.duration * (width / 100);
    },
    progressTouchEnd() {
      //手指松开时 开始播放
      this.$refs.audio.currentTime = this.currentTime;
      this.songFlag = false;
      this.$store.commit("setPlaying", false); //改变播放图标
      this.$refs.audio.play(); // 音频播放
    },
    //播放和暂停的控制
    playClick() {
      if (this.playing == true) {
        this.$store.commit("setPlaying", false);
        this.$refs.audio.play();
        return;
      }
      this.$refs.audio.pause();
      this.$store.commit("setPlaying", true);
    },
    //底部列表popUP显示
    changePopUPshow() {
      this.$refs.footerPopup.popupShow = true;
      this.$nextTick(() => {
        this.$refs.footerPopup.scrollInit();
      });
    },
    //上一首 下一首
    changeRadio(id, Num) {
      if (this.playerMode == 3) {
        this.randomRadio();
        return;
      }
      let index = this.playerList.findIndex(ele => ele.id == id) + Num;
      index = index < 0 ? this.playerList.length - 1 : index;
      index = index > this.playerList.length - 1 ? 0 : index;
      let nextId = this.playerList[index].id;
      this.$store.commit("setMediaUrlId", nextId);
    },
    //设置播放模式
    changePlayMode(modeNum) {
      this.$store.commit("setPlayerMode", modeNum);
      if (this.fullScreen && modeNum == 1) {
        return this.$toast({
          duration: "2000",
          position: "bottom",
          message: "顺序播放"
        });
      }
      if (this.fullScreen && modeNum == 2) {
        return this.$toast({
          duration: "2000",
          position: "bottom",
          message: "单曲循环"
        });
      }
      if (this.fullScreen && modeNum == 3) {
        return this.$toast({
          duration: "2000",
          position: "bottom",
          message: "随机播放"
        });
      }
    },
    //随机radio
    randomRadio() {
      let randomIndex = Math.floor(Math.random() * this.playerList.length);
      let nextId = this.playerList[randomIndex].id;
      this.$store.commit("setMediaUrlId", nextId);
    },
    //音频播放结束
    audioEnd() {
      if (this.playerMode == 1) {
        this.changeRadio(this.mediaUrlId, 1);
        return;
      }
      if (this.playerMode == 2) {
        this.$refs.audio.currentTime = 0;
        this.$refs.audio.play();
        return;
      }
      if (this.playerMode == 3) {
        this.randomRadio();
      }
    }
  },
  components: {
    footerPopup,
    radioPopup
  }
};
</script>

<style lang="scss" scoped>
.playerPage-box {
  z-index: 100;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  height: 100%;
  width: 100%;
  .playerPage-bg {
    position: absolute;
    background-color: #333;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-size: 130% 130%;
    background-position: center center;
    // filter: blur(12px);
    filter: blur(5px) brightness(0.5);
    transform: scale(1.02);
  }
  .content-box {
    position: absolute;
    height: 100%;
    width: 100%;
    // overflow: hidden;
    background-color: rgba(0, 0, 0, 0.4);
    .header {
      position: absolute;
      top: 0;
      z-index: 5;
      width: 100%;
      height: 1.8rem;
      z-index: 5;
      color: #fff;
      .down {
        position: absolute;
        left: 0.3125rem;
        bottom: -0.25rem;
        width: 0.8rem;
        font-size: 1.2rem;
      }
      .yuanwen {
        text-align: center;
        position: absolute;
        width: 2rem;
        right: 2.5rem;
        bottom: 0;
        font-size: 0.8rem;
      }
      .share {
        width: 1.5rem;
        text-align: center;
        position: absolute;
        right: 0.5rem;
        bottom: 0;
        font-size: 0.9rem;
      }
    }
    .cover-box {
      width: 100%;
      height: 50%;
      box-sizing: border-box;
      padding-top: 3rem;
      .cover {
        margin: 0 auto;
        height: 100%;
        width: 75%;
        img {
          height: 100%;
          width: 100%;
        }
      }
      .title {
        font-size: 0.625rem;
        color: #fff;
        text-align: center;
        width: 90%;
        overflow: hidden;
        white-space: nowrap;
        margin: 0 auto;
        line-height: 1.6rem;
      }
      .speak {
        text-align: center;
        font-size: 0.5rem;
        color: #f2f2f2;
      }
    }
    .progress_box {
      box-sizing: border-box;
      position: absolute;
      bottom: 28%;
      width: 100%;
      height: 10%;
      padding: 0.3125rem;
      display: flex;
      justify-content: space-between;
      span {
        font-size: 0.5rem;
        color: #fff;
      }
      .progress_outer {
        width: 75%;
        height: 0.5rem;
      }
      .progress {
        position: relative;
        margin-top: 0.2rem;
        height: 0.1rem;
        line-height: 0.1rem;
        width: 100%;
        background-color: rgba(100, 100, 100, 0.5);
        .progress_bar {
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          width: 0%;
          height: 125%;
          background-color: #fff;
          border-radius: 2rem;
          .circle {
            position: absolute;
            top: 50%;
            transform: translate(50%, -50%);
            right: 0;
            height: 0.5rem;
            width: 0.5rem;
            background-color: #fff;
            border-radius: 50%;
          }
        }
      }
    }
    .icon_box {
      position: absolute;
      bottom: 20%;
      width: 100%;
      height: 5%;
      display: flex;
      // justify-content: space-around;
      .action {
        flex: 1;
        position: relative;
        span {
          position: absolute;
          top: 0;
          left: 50%;
          color: #fff;
          font-size: 0.875rem;
          transform: translateX(-50%);
        }
        .like_num {
          top: 28%;
          left: 65%;
          font-size: 0.4rem;
          transform: translateX(0%);
        }
        .message {
          font-size: 0.95rem;
        }
        .message_num {
          top: 20%;
          left: 65%;
          font-size: 0.4rem;
          transform: translateX(0%);
        }
        .shou_cang-enter {
          transform: translateX(-50%) scale(1.5);
        }
        .shou_cang-enter-active {
          transition: transform 0.3s;
        }
      }
    }
    .player_contolrol_box {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 20%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      div {
        width: 15%;
        text-align: center;
        span {
          font-weight: normal;
          font-size: 0.875rem;
          color: #fff;
        }
      }
      .player_btn {
        span {
          font-size: 1.75rem;
        }
      }
    }
  }
}
.footer-box {
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 99;
  height: 2.2rem;
  width: 100%;
  box-shadow: 0px -2px 2px #ccc;
  background-color: #fff;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  padding: 0 0.25rem;
  align-items: center;
  //列表没有播放音频时的样式
  .hide_title {
    margin: 0 auto;
    font-size: 0.6rem;
    color: #fa7963;
  }
  .smallPalyBtn {
    position: relative;
    width: 1.5rem;
    height: 1.5rem;
    .smallPlay {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 1rem;
      color: #fa7963;
    }
  }
  .smallMessageBox {
    margin-left: 0.325rem;
    margin-right: 0.5rem;
    width: 60%;
    .smallTitle {
      position: relative;
      width: 100%;
      line-height: 1.2;
      overflow: hidden;
      white-space: nowrap;
      font-size: 0.55rem;
      color: #000;
      margin-bottom: 0.25rem;
    }
    .smallSpeak {
      font-size: 0.5rem;
      color: #b1b5b8;
    }
  }
  span {
    margin-left: 0.5rem;
    width: 1rem;
    height: 0.8rem;
    font-size: 0.8rem;
    color: #fa7963;
  }
}

// 播放页面的进出动画
.playerPage-enter-active,
.playerPage-leave-active {
  transition: all 0.3s ease;
}
.playerPage-enter,
.playerPage-leave-to {
  transform: translateY(50%) scale(0.2);
  opacity: 0;
}
//footer小播放器的进出动画
.footer-enter-active {
  transition: all 0.7s ease;
}
.footer-leave-active {
  transition: all 0.3s ease;
}
.footer-enter,
.footer-leave-to {
  opacity: 0;
}
</style>