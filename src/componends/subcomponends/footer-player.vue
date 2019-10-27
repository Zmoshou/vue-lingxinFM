<template>
  <div class="footerPlayer-container">
    <transition name="playerPage">
      <div class="playerPage-box" v-show="!fullPage">
        <div class="playerPage-bg" :style="{backgroundImage: 'url(' + this.playerInfo.cover + ')'}"></div>
        <div class="content-box">
          <div class="header">
            <span @click="dofullPage" class="down iconfont icon-icon-test60"></span>
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
              <span class>00.00</span>
              <div class="progress">
                <div class="progress_bar">
                  <div class="circle"></div>
                </div>
              </div>
              <span>{{ playerInfo.duration | timeFormat}}</span>
            </div>
            <div class="icon_box">
              <div class="action">
                <span class="iconfont icon-xinaixin1"></span>
                <span class="like_num">{{ playerInfo.sharenum }}</span>
              </div>
              <div class="action">
                <span class="iconfont icon-xiazai"></span>
              </div>
              <div class="action" @click="toComment(id)">
                <span class="message iconfont icon-icon-test2"></span>
                <span class="message_num">{{ playerInfo.commentnum }}</span>
              </div>
              <div class="action">
                <span class="iconfont icon-shijian1"></span>
              </div>
            </div>
            <div class="player_contolrol_box">
              <div class="player_mode">
                <span class="iconfont icon-inturn"></span>
              </div>
              <div class="player_pre">
                <span class="iconfont icon-shangyishou"></span>
              </div>
              <div class="player_btn">
                <span class="iconfont icon-bofang"></span>
              </div>
              <div class="player_next">
                <span class="iconfont icon-xiayishou"></span>
              </div>
              <div class="player_list">
                <span class="iconfont icon-yinleliebiao1"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <footer class="footer-box" @click="dofullPage" v-show="fullPage">123</footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: 99396182,
      playerInfo: {},
      fullPage: true,
      audio: document.querySelector("#audio")
    };
  },
  created() {
    this.getPlayer();
  },
  methods: {
    dofullPage() {
      console.log(123);
      this.fullPage = !this.fullPage;
    },
    getPlayer() {
      this.$axios
        .get("fm/broadcast-detail.json", {
          params: {
            id: this.id,
            key: this.$store.state.key
          }
        })
        .then(res => {
          if (res.data.code === 0) {
            this.playerInfo = res.data.data;
            // var audio = document.querySelector("#audio");
            if (audio.src != this.playerInfo.url) {
              audio.src = this.playerInfo.url;
            }
          }
        });
    },
    toComment(id) {
      this.$router.push({
        name: "comment",
        params: { id }
      });
    },
    playClick() {},
    preClick() {},
    nextClick() {},
    playModeClick() {},
    playListClcik() {}
  }
};
</script>

<style lang="scss" scoped>
.playerPage-box {
  z-index: 25;
  position: absolute;
  overflow: hidden;
  height: 100%;
  width: 100%;
  .playerPage-bg {
    position: absolute;
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
        width: 100%;
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
      .progress {
        position: relative;
        margin-top: 0.12rem;
        height: 0.1rem;
        line-height: 0.1rem;
        width: 80%;
        background-color: rgba(100, 100, 100, 0.5);
        .progress_bar {
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          width: 30%;
          height: 125%;
          background-color: #fff;
          border-radius: 2rem;
          .circle {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
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
      justify-content: space-around;
      .action {
        span {
          color: #fff;
          font-size: 0.875rem;
        }
        .like_num {
          font-size: 0.4rem;
        }
        .message {
          font-size: 0.95rem;
        }
        .message_num {
          font-size: 0.4rem;
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
  bottom: 0;
  z-index: 999;
  height: 2.2rem;
  width: 100%;
  background-color: #ccc;
}
// 播发页面的进出动画
.playerPage-enter-active {
  transition: all .5s ease;
}
.playerPage-leave-active {
  transition: all .5s ease;
}
.playerPage-enter, .playerPage-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(50%) scale(.5);
  opacity: 0;
}
</style>