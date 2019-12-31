<template>
  <div class="communicationItem-container">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div
          class="item_box"
          v-for="(item) in communicationList"
          :key="item.id"
          @click="toCommunicationDetails(item.id)"
        >
          <div class="item_header">
            <div class="user_info">
              <div class="cover">
                <img v-lazy="item.user.avatar" alt />
              </div>
              <div class="user_name">{{ item.user.nickname }}</div>
            </div>
            <div class="time">
              <span>最近更新:{{ item.updated }}</span>
              <span>创建:{{ item.created }}</span>
            </div>
          </div>
          <div class="item_body">
            <div class="item_body_left">
              <h3 class="title">{{ item.title }}</h3>
              <p class="content">{{ item.content }}</p>
              <p class="comment_num_box">
                <van-icon class="comment_icon" name="comment-o" />
                <span class="comment_num">{{ item.commentnum }}</span>
              </p>
            </div>
            <div class="item_body_right" v-if="item.images.length>0">
              <img v-lazy="item.images[0]" />
            </div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      finished: false,
      isLoading: false,
      offset: 0,
      limit: 15,
      communicationList: []
    };
  },
  props: {
    type: Number
  },
  created() {
    // this.getCommunicationList();
  },
  methods: {
    //请求数据
    getCommunicationList() {
      this.$axios
        .get("fm/forum-thread-list.json", {
          params: {
            flag: 0,
            offset: this.offset,
            limit: this.limit,
            type: this.type,
            key: this.$store.state.key
          }
        })
        .then(res => {
          if (res.data.code === 0) {
            let Data = res.data.data;
            this.communicationList = [...this.communicationList, ...Data];
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
    //上拉加载
    onLoad() {
      setTimeout(() => {
        // 异步更新数据
        this.getCommunicationList();
      }, 800);
    },
    //下拉刷新
    onRefresh() {
      setTimeout(() => {
        this.offset = 0;
        this.communicationList = [];
        this.$toast("刷新成功");
        this.isLoading = false;
        this.getCommunicationList();
      }, 800);
    },
    //路由跳转
    toCommunicationDetails(id) {
      this.$router.push({
        name: "communicationDetails",
        params: { id }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.communicationItem-container {
  padding-top: 0.25rem;
  box-sizing: border-box;
  height: 100%;
  background-color: #f4f4f4;
  overflow: auto;
  .item_box {
    padding: 0.25rem;
    box-sizing: border-box;
    width: 100%;
    background-color: #fff;
    margin-bottom: 0.5rem;
    .item_header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 1.5rem;
      border-bottom: 1px solid #f4f4f4;
      padding-bottom: 0.25rem;
      .user_info {
        display: flex;
        align-items: center;
        .cover {
          height: 1.5rem;
          width: 1.5rem;
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        .user_name {
          color: #444;
          margin-left: 0.2rem;
          font-size: 0.425rem;
        }
      }
      .time {
        font-size: 0.35rem;
        color: #999;
        span {
          margin-right: 0.25rem;
        }
      }
    }
    .item_body {
      display: flex;
      justify-content: space-between;
      margin-left: 1.75rem;
      .item_body_left {
        flex: 1;
        .title {
          line-height: 1.2;
          margin: 0.25rem 0;
          font-size: 0.6rem;
          color: #000;
          font-weight: 550;
        }
        .content {
          font-size: 0.5rem;
          line-height: 1.2;
          flex: 1;
          font-size: 0.5rem;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          text-overflow: ellipsis;
          margin-bottom: 0.25rem;
        }
        // .comment_num_box {
        //   height: 0.5rem;
        //   line-height: 0.5rem;
        // }
        .comment_icon {
          font-size: 0.375rem;
          color: #444;
        }
        .comment_num {
          color: #444;
          font-size: 0.35rem;
        }
      }
      .item_body_right {
        margin-top: 0.25rem;
        height: 2.2rem;
        width: 2.2rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>