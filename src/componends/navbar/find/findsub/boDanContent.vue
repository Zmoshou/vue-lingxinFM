<template>
  <div class="detial-container">
    <div :class="['topBox',{'tboxBg':topBoxShow}]" ref="topBox">
      <span class="iconback iconfont icon-icon-test59" @click="back"></span>
      <transition name="top-box">
        <div class="toptitle" v-show="topBoxShow">{{ bodanConfig.title }}</div>
      </transition>
      <span class="iconshare iconfont icon-icon-test14"></span>
    </div>
    <div class="detial-header" ref="detialH">
      <div class="detial-info">
        <div class="cover_box">
          <img :src="bodanConfig.cover" />
        </div>
        <p class="p_title">{{ bodanConfig.title }}</p>
        <div class="collecting">
          <span class="iconfont icon-xinaixin1"></span>收藏
        </div>
      </div>
    </div>
    <van-sticky :offset-top="top" :z-index="10" @scroll="scroll()">
      <div class="operation" ref="operation">
        <div>
          <span class="palyallicon iconfont icon-icon-test19"></span>
          <span class="paly_all">播放全部</span>
        </div>
        <span class="allRadio">(已加载{{bodanContentList.length}}首)</span>
        <div class="duoxuan" @click.stop="selectMore">
          <span class="duoxuan_icon iconfont icon-icon-test39"></span>多选
        </div>
      </div>
    </van-sticky>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <ul class="list_ul">
          <li
            class="item"
            v-for="(item, index) in bodanContentList"
            :key="index"
            @click="toPlayerPage(item.id)"
          >
            <div class="item_cover_box">
              <img :src="item.cover" alt />
            </div>
            <div class="content_box">
              <p class="title">{{ item.title }}</p>
              <p class="u_name">
                {{ item.speak }}
                <span class="listen_num iconfont icon-yixianshi-"></span>
                <span>{{ item.viewnum }}</span>
              </p>
            </div>
            <div class="control_box">
              <van-icon name="ellipsis" class="control_box_icon" @click.stop="radioOperate(item)" />
            </div>
          </li>
        </ul>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  data() {
    return {
      topBoxShow: false,
      top: 0, //控制距离粘性定位的顶部距离
      id: 1311,
      // speakRadiolist: [],
      isLoading: false,
      loading: false,
      finished: false,
      offset: 0,
      rows: 10,
      bodanConfig: {},
      bodanContentList: []
    };
  },
  created() {
    // 获取上一个页面的播单页面信息
    this.bodanConfig = this.$store.state.bodanConfig;
  },
  methods: {
    getBodanContent() {
      this.$axios
        .get(
          `http://bapi.xinli001.com/fm2/broadcast_list.json/?q=${this.bodanConfig.name}&is_teacher=&offset=${this.offset}&speaker_id=0&rows=${this.rows}&key=046b6a2a43dc6ff6e770255f57328f89`
        )
        .then(res => {
          // console.log(res.data);
          if (res.data.code === 0) {
            let Data = res.data.data;
            this.bodanContentList = [...this.bodanContentList, ...Data];
            this.offset = this.offset + this.rows;
            // 加载状态结束
            this.loading = false;
            // 数据全部加载完成
            if (Data.length < this.rows) {
              this.finished = true;
            }
          } else {
            this.$toast("加载失败 请重新加载");
          }
        });
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        this.getBodanContent();
      });
    },
    onRefresh() {
      setTimeout(() => {
        this.getBodanContent();
        this.$toast({
          message: "刷新成功",
          duration: 1500
        });
        this.isLoading = false;
      }, 500);
    },
    scroll() {
      this.top = this.$refs.topBox.offsetHeight;
      if (this.$refs.operation.offsetTop <= 0) {
        this.topBoxShow = true;
      } else {
        this.topBoxShow = false;
      }
    },
    selectMore() {
      console.dir(this.$refs.detialH);
      console.log("没写");
    },
    toPlayerPage(id) {
      this.$store.commit("setFullScreen", true);
      this.$store.commit("setMediaUrlId", id);
      let newlist = JSON.parse(JSON.stringify(this.bodanContentList)); //利用json转换深拷贝
      this.$store.commit("setPlayerList", newlist);
    },
    radioOperate(radio) {
      this.$store.commit("setRadioPopupShow", true);
      this.$store.commit("setRadioObj", radio);
    },
    back() {
      // this.$router.push({
      //   name: this.$store.state.toRoute
      // });
      this.$router.go(-1);
    }
  }
  // beforeRouteEnter(to, from, next) {
  //   next(vm => {
  //     if (from.name === "bodanList" || from.name === "home") {
  //       vm.$store.commit("setToRoute", from.name);
  //     }
  //     // 通过 `vm` 访问组件实例
  //   });
  // }
};
</script>

<style lang="scss" scoped>
.top-box-enter-active,
.top-box-leave-active {
  transition: opacity 0.5s;
}
.top-box-enter,
.top-box-leave-to {
  opacity: 0;
}
.detial-container {
  position: relative;
  width: 100%;
  height: 100%;
  // z-index: 15;
  .tboxBg {
    background: linear-gradient(
      to right,
      rgb(29, 30, 31),
      rgb(77, 68, 68),
      rgb(5, 129, 129),
      rgb(77, 68, 68),
      rgb(29, 30, 31)
    );
  }
  .topBox {
    z-index: 10;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 1.5rem;

    .toptitle {
      text-align: center;
      position: absolute;
      font-size: 0.65rem;
      color: #fff;
      width: 80%;
      top: 30%;
      left: 50%;
      transform: translateX(-50%);
    }
    .iconback {
      position: absolute;
      top: 20%;
      left: 2%;
      color: #fff;
      font-size: 1rem;
    }
    .iconshare {
      position: absolute;
      top: 20%;
      right: 2%;
      color: #fff;
      font-size: 1rem;
    }
  }
  .detial-header {
    position: relative;
    width: 100%;
    height: 7rem;
    background-color: rgb(32, 34, 65);
    background: radial-gradient(
      farthest-corner at 50% 30%,
      rgb(5, 129, 129),
      rgb(77, 68, 68),
      rgb(29, 30, 31)
    );
    box-sizing: border-box;
    padding: 0 0.625rem;
    .detial-info {
      position: absolute;
      top: 1.5rem;
      left: 0;
      height: 70%;
      width: 100%;
      text-align: center;
      .cover_box {
        position: absolute;
        left: 5%;
        top: 5%;
        width: 4.5rem;
        height: 4.5rem;
        background-color: #fff;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .p_title {
        position: absolute;
        left: 40%;
        top: 12%;
        width: 50%;
        line-height: 1.2;
        font-size: 0.55rem;
        color: #fff;
        text-align: left;
      }
      .collecting {
        position: absolute;
        height: 1rem;
        text-align: center;
        line-height: 1rem;
        width: 2.5rem;
        right: 5%;
        bottom: 10%;
        color: #fff;
        font-size: 0.5rem;
        border-radius: 20px;
        border: 2px solid #fff;
        span {
          margin-right: 0.2rem;
          font-size: 0.4rem;
        }
      }
    }
  }
  .operation {
    width: 100%;
    border-bottom: 1px solid #ccc;
    background-color: #fff;
    height: 1.5rem;
    box-sizing: border-box;
    padding: 0 0.325rem;
    display: flex;
    justify-content: start;
    align-items: center;
    .palyallicon {
      margin-right: 0.25rem;
      color: #fa7963;
      font-size: 0.7rem;
    }
    .paly_all {
      font-size: 0.6rem;
      font-weight: 650;
    }
    .allRadio {
      margin-left: 0.325rem;
      font-size: 0.35rem;
      color: #b1b5b8;
    }
    .duoxuan {
      position: absolute;
      right: 1rem;
      color: #000;
      font-size: 0.5rem;
      .duoxuan_icon {
        margin-right: 0.2rem;
        color: #fa7963;
        font-size: 0.5rem;
      }
    }
  }

  .van-list {
    padding-bottom: 2.2rem;
  }

  .table-view-cell {
    padding: 0.5rem 0.75rem;
  }
  .table-view .mui-media-object {
    line-height: 2rem;
    max-width: 2rem;
    height: 2rem;
  }
  .radio_name {
    font-size: 0.625rem;
    line-height: 1.1;
    max-width: 95%;
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
    white-space: pre-wrap;
    margin-bottom: 0.25rem;
    padding-top: 0.25rem;
    // margin: ;
  }
  .mui-ellipsis span {
    margin-left: 0.5rem;
    &:nth-child(1) {
      margin-left: 0;
    }
  }
}
.list_ul {
  overflow: auto;
}
.item {
  overflow: hidden;
  position: relative;
  margin-left: 0.5rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f4f4f4;
  .item_cover_box {
    height: 1.8rem;
    width: 1.8rem;
    float: left;
    img {
      height: 100%;
      width: 100%;
    }
  }
  .content_box {
    float: left;
    width: 11.5rem;
    margin-left: 0.25rem;
    padding-top: 0.2rem;
    .title {
      width: 100%;
      word-wrap: break-word;
      word-break: break-all;
      // overflow: hidden;
      font-size: 0.55rem;
    }
    .u_name {
      margin-top: 0.5rem;
      font-size: 0.35rem;
      color: #b1b5b8;
      font-weight: normal;
    }
  }
  .control_box {
    position: absolute;
    height: 1rem;
    line-height: 1rem;
    width: 1rem;
    right: 0;
    top: 55%;
    transform: translate(-20%, -50%);
    .control_box_icon {
      font-size: 0.8rem;
      color: #ccc;
    }
  }
}
</style>