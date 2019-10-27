<template>
  <div class="detial-container">
    <div class="detial-header">
      <span class="icon iconfont icon-icon-test59" @click="back"></span>
      <div class="detial-info">
        <div class="photo">
          <img :src="getSpeakerInfo.cover" />
        </div>
        <h3 class="p_name">{{ getSpeakerInfo.title }}</h3>
        <p class="listen_info">
          收听
          <span>{{ getSpeakerInfo.viewnum }}</span>
          关注
          <span>{{ getSpeakerInfo.favnum }}</span>
        </p>
        <div>
          <em class="circle"></em>
          <em class="circle"></em>
        </div>
        <div class="focus">
          <span class="guanzhu">已关注</span>
          <i>|</i>
          <span class="letter iconfont icon-goutong"></span>
        </div>
      </div>
      <span class="icon iconfont icon-icon-test14"></span>
    </div>
    <div class="list_box">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <ul>
            <li
              class="item"
              v-for="(item, index) in speakRadiolist"
              :key="index"
              @click="toPlayerPage(item.id)"
            >
              <div class="cover_box">
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
                <van-icon name="ellipsis" class="control_box_icon" />
              </div>
            </li>
          </ul>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      id: this.$route.params.id,
      speakRadiolist: [],
      speakerInfo: {},
      isLoading: false,
      loading: false,
      finished: false,
      limit: 5,
      offset: 0
    };
  },
  created() {
    this.getSpeakerInfo(this.id);
  },
  methods: {
    // 获取电台主持人个人信息
    getSpeakerInfo(id) {
      this.$axios
        .get("fm/diantai-detai.json", {
          params: {
            id: this.id,
            key: this.$store.state.key
          }
        })
        .then(res => {
          if (res.data.code === 0) {
            this.getSpeakerInfo = res.data.data;
          }
        });
    },
    //获取主播的电台列表
    getspeakRadiolist(id) {
      // console.log(id);
      this.$axios
        .get("fm/diantai-jiemu-list.json", {
          params: {
            offset: this.offset,
            limit: this.limit,
            diantai_id: id,
            key: this.$store.state.key
          }
        })
        .then(res => {
          if (res.data.code === 0) {
            let Data = res.data.data;
            this.speakRadiolist = [...this.speakRadiolist, ...Data];
            this.offset = this.offset + this.limit;
            // 加载状态结束

            this.loading = false;

            // 数据全部加载完成
            if (Data.length < this.limit) {
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
        // 异步更新数据
        this.getspeakRadiolist(this.id);
      });
    },
    onRefresh() {
      setTimeout(() => {
        this.getspeakRadiolist(this.id);
        Toast({
          message: "刷新成功",
          duration: 1000
        });
        this.isLoading = false;
      }, 500);
    },
    toPlayerPage(id) {
      this.$router.push({
        name: "playerPage",
        params: { id }
      });
    },
    back() {
      // this.$router.push("/find");
    }
  }
};
</script>

<style lang="scss" scoped>
.list_box {
  height: 60%;
  overflow: auto;
}
.detial-container {
  width: 100%;
  height: 100%;
  // background-color: #666;
  position: absolute;
  z-index: 15;
  top: 0;
  left: 0;
  .detial-header {
    width: 100%;
    height: 10rem;
    background-color: rgb(32, 34, 65);
    background: radial-gradient(
      farthest-corner at 50% 30%,
      rgb(5, 129, 129),
      rgb(77, 68, 68),
      rgb(29, 30, 31)
    );
    box-sizing: border-box;
    padding: 0 0.625rem;
    display: flex;
    justify-content: space-between;
    .icon {
      margin-top: 0.75rem;
      color: #fff;
      font-size: 1rem;
    }
    .detial-info {
      height: 100%;
      width: 88%;
      text-align: center;
      .photo {
        margin: 1.5rem auto 0;
        width: 3.4375rem;
        height: 3.4375rem;
        img {
          width: 100%;
          border-radius: 50%;
        }
      }
      .p_name {
        margin-top: 0.5rem;
        font-size: 0.75rem;
        font-weight: 700;
        color: #fff;
        line-height: 1rem;
        .span {
          line-height: 1rem;
          font-size: 0.75rem;
          margin-left: 0.5rem;
        }
      }
      .listen_info {
        margin-top: 0.5rem;
        color: #fff;
        font-size: 0.5rem;
        span {
          font-size: 0.5rem;
        }
      }
      .circle {
        margin: 0.5rem 0.125rem 0;
        display: inline-block;
        width: 0.25rem;
        height: 0.25rem;
        border-radius: 50%;
        background-color: #fff;
      }
      .focus {
        margin: 0.25rem auto 0;
        border-radius: 1.125rem;
        width: 4.25rem;
        height: 1rem;
        font-size: 0.5rem;
        color: #fff;
        line-height: 0.7rem;
        border: 1px solid #fff;
        position: relative;
        .guanzhu {
          position: absolute;
          top: 0.15rem;
          left: 0.8rem;
          font-size: 0.5rem;
        }
        i {
          position: absolute;
          top: 0.13rem;
          left: 2.5rem;
        }
        .letter {
          position: absolute;
          font-size: 0.8rem;
          top: 0.2rem;
          left: 2.8rem;
        }
      }
    }
  }

  // .mui-table-view {
  //   margin-bottom: 2.2rem;
  // }
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
.item {
  overflow: hidden;
  position: relative;
  margin-left: 0.5rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f4f4f4;
  .cover_box {
    height: 1.8rem;
    width: 1.8rem;
    float: left;
    img {
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