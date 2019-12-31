<template>
  <div class="communicationDetails-container">
    <header>
      <span class="set-box">
        <a href="#" class="iconfont icon-jiantou-px-" @click.prevent="$router.go(-1)"></a>
      </span>
      <div class="nvabar">内容评论({{ contentDetails.commentnum }})</div>
      <span class="serch-box"></span>
    </header>
    <div class="main_box" v-if="this.show">
      <div class="topic_box">
        <div class="title_box">
          <div class="info">
            <img :src="contentDetails.user&&contentDetails.user.avatar" />
            <div class="detail">
              <p class="name">{{ contentDetails.user&&contentDetails.user.nickname }}</p>
              <p class="date">{{ contentDetails.created }}</p>
            </div>
          </div>
          <p class="title">{{ contentDetails.title }}</p>
        </div>
        <p class="content">{{ contentDetails.content }}</p>
        <div class="pics" v-if="contentDetails.images&&contentDetails.images.length !== 0">
          <div class="pics">
            <p v-if="contentDetails.images.length === 1" @click="showImg(0)">
              <img class="one_pic" :src="contentDetails.images&&contentDetails.images[0]" />
            </p>
            <p class="more_pics" v-if="contentDetails.images&&contentDetails.images.length > 1">
              <img
                v-for="(item, index) in contentDetails.images"
                :key="index"
                class="more_pic"
                :src="item"
                @click="showImg(index)"
              />
            </p>
          </div>
        </div>
      </div>
      <div class="comments_box">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <div
              ref="commentBox"
              v-for="(item, index) in commentList"
              :key="index"
              class="comment_box"
              @click="showCommentControl(item)"
            >
              <div class="comment_userinfo">
                <div class="user_photo">
                  <img :src="item.user&&item.user.avatar" alt />
                </div>
                <div class="user_box">
                  <p class="u_name">{{ item.user&&item.user.nickname }}</p>
                  <span class="time">{{ item.created_str }}</span>
                </div>
                <span class="floor">第{{ item.floor }}楼</span>
                <div class="zan" @click.stop="dianZan(item.id)">
                  <span class="dianzan">{{ item.created }}</span>
                </div>
              </div>
              <div class="comment_message">
                <p class="comment_content">{{ item.content }}</p>
                <p class="other_comment" v-if="item.replyuser === null ? false : true">
                  <span>回复:{{ item.replyuser&&item.replyuser.nickname}}:</span>
                </p>
              </div>
            </div>
          </van-list>
        </van-pull-refresh>
      </div>
    </div>
    <footer class="do_comment">
      <!-- @focus="inputFocus"  
        @blur="changeSend"
        :placeholder="placeholderMsg"
      v-model="content"-->
      <input
        ref="commentInput"
        v-model="content"
        @blur="changeSend"
        :placeholder="placeholderMsg"
        class="comment_input"
        type="text"
      />
      <button class="fabiao iconfont icon-icon_send" @click.prevent="sendMessage"></button>
    </footer>
    <van-popup v-model="popupShow" :style="{ height: '20%',width:'40%',borderRadius: '0.5rem'}">
      <div class="popupbox">
        <p @click="changeMode">回复</p>
        <p>复制</p>
        <p>举报</p>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { ImagePreview } from "vant";

export default {
  data() {
    return {
      placeholderMsg: "写下你的心情和故事",
      mode: 0, //0表示评论帖子 1 表示回复他人
      popupShow: false, //是否显示弹窗
      content: "",
      replyUserID: 0, //回复别的用户的id
      show: false, //是否显示此组件
      loading: false,
      finished: false,
      isLoading: false,
      id: this.$route.params.id,
      offset: 0,
      limit: 15,
      contentDetails: {},
      commentList: []
    };
  },
  created() {
    this.getContentDetails();
  },
  methods: {
    //请求帖子详情数据
    getContentDetails() {
      this.$axios
        .get("fm/forum-comment-list.json", {
          params: {
            post_id: this.id,
            offset: 0,
            // limit: this.limit,
            key: this.$store.state.key
          }
        })
        .then(res => {
          if (res.data.code === 0) {
            this.contentDetails = res.data.post;
            this.show = true;
          }
        });
    },
    //请求评论列表数据
    getCommentList() {
      this.$axios
        .get("fm/forum-comment-list.json", {
          params: {
            post_id: this.id,
            offset: this.offset,
            limit: this.limit,
            key: this.$store.state.key
          }
        })
        .then(res => {
          if (res.data.code === 0) {
            let Data = res.data.data;
            this.commentList = [...this.commentList, ...Data];
            this.offset = this.offset + this.limit;
            // 加载状态结束
            this.loading = false;
            // 数据全部加载完成

            if (Data.length < this.limit) {
              this.finished = true;
            }
          }
        });
    },
    //发表评论
    postComment(id) {
      this.$axios
        .post("fm/post-forum-comment.json", {
          flag: 0,
          post_id: this.id,
          reply_user_id: id,
          content: this.content,
          key: this.$store.state.key,
          token: this.$store.state.token
        })
        .then(res => {
          this.content = "";
          if (res.data.code === 0) {
            let Data = res.data.data;
            this.commentList.unshift(Data);
            return this.$toast(res.data.message);
          }
          if (res.data.code === 40002) {
            return this.$toast(res.data.message);
          }
        });
    },

    //点击回复
    showCommentControl(item) {
      this.replyUserID = item.user_id;
      this.replyUserName = item.user.nickname;
      this.popupShow = true;
    },

    //changeMode
    changeMode() {
      this.popupShow = false;
      this.mode = 1;
      this.placeholderMsg = "回复:" + this.replyUserName;
      this.$refs.commentInput.focus();
    },
    //发表或者回复
    sendMessage() {
      if (this.content.trim() === "") {
        return this.$toast("评论内容不为空");
      }
      if (this.mode === 0) {
        this.postComment(0);
      } else if (this.mode === 1) {
        this.postComment(this.replyUserID);
      }
    },
    //失去焦点时 mode改为0
    changeSend() {
      setTimeout(() => {
        this.replyUserID = 0;
        this.mode = 0;
      }, 500);

      this.placeholderMsg = "写下你的心情和故事";
    },
    //上拉自动加载
    onLoad() {
      //异步更新数据
      setTimeout(() => {
        // 异步更新数据
        this.getCommentList();
      }, 800);
    },
    //下拉刷新
    onRefresh() {
      setTimeout(() => {
        this.$toast({
          message: "刷新成功",
          duration: 1000
        });
        this.offset = 0;
        this.commentList = [];
        this.isLoading = false;
        this.getCommentList();
      }, 500);
    },
    //图片预览
    showImg(index) {
      ImagePreview(this.contentDetails.images);
    }
  }
};
</script>

<style lang="scss" scoped>
.communicationDetails-container {
  z-index: 105;
  background-color: #f4f4f4;
  height: 100%;
  overflow: auto;
  padding: 2.2rem 0;
  position: relative;
  box-sizing: border-box;
  header {
    position: fixed;
    left: 0;
    height: 2.2rem;
    width: 100%;
    background-color: #fff;
    top: 0;
    display: flex;
    z-index: 10;
    justify-content: space-between;
    border-bottom: 1px solid rgb(243, 237, 237);
    .nvabar {
      width: 50%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 0.75rem;
      font-weight: 550;
    }
    .serch-box,
    .set-box {
      display: flex;
      align-items: center;
      width: 3.125rem;
      a {
        margin-left: 0.3125rem;
        font-size: 0.875rem;
        color: black;
      }
    }
  }
  .main_box {
    .topic_box {
      background-color: #fff;
      padding: 0.25rem;
      box-sizing: border-box;
      .title_box {
        height: 2.2rem;
        display: flex;
        line-height: 1.2;
        .info {
          display: flex;
          img {
            height: 2.2rem;
            width: 2.2rem;
          }
          .detail {
            margin-left: 0.25rem;
            color: #999;
            .name {
              margin: 0.25rem 0;
              font-size: 0.5rem;
            }
            .data {
              font-size: 0.4rem;
            }
          }
        }
        .title {
          margin-left: 0.25rem;
          flex: 1;
          font-size: 0.6rem;
          font-weight: 550;
          color: #000;
          display: flex;
          letter-spacing: 2px;
          align-items: center;
        }
      }
      .content {
        margin: 0.25rem 0;
        line-height: 1.5;
        letter-spacing: 2px;
        font-size: 0.55rem;
        text-indent: 2em;
      }
      .pics {
        .one_pic {
          box-sizing: border-box;
          max-width: 100%;
        }
        .more_pics {
          display: flex;
          flex-wrap: wrap;
          // justify-content: space-between;
          .more_pic {
            margin-bottom: 0.35rem;
            margin-left: 0.25rem;
            height: 4.8rem;
            width: 4.8rem;
          }
        }
      }
    }
    .comments_box {
      .comment_box {
        background-color: #fff;
        padding: 0 0.25rem;
        position: relative;
        margin-top: 0.5rem;
        padding-top: 0.5rem;
        box-sizing: border-box;
        .comment_userinfo {
          position: relative;
          height: 2rem;
          width: 100%;
          overflow: hidden;
          .floor {
            position: absolute;
            top: 5%;
            right: 2%;
            font-size: 0.4rem;
            color: #444;
          }
          .user_photo {
            float: left;
            height: 2rem;
            line-height: 2rem;
            width: 2rem;
            img {
              border-radius: 50%;
              width: 80%;
              height: 80%;
            }
          }
          .user_box {
            float: left;
            display: flex;
            height: 100%;
            flex-direction: column;
            justify-content: center;
            .u_name {
              // overflow: hidden;
              max-width: 12rem;
              color: #666;
              font-size: 0.5rem;
              margin-bottom: 0.35rem;
            }
            .time {
              font-size: 0.4rem;
              color: #ccc;
            }
          }
          .zan {
            position: absolute;
            bottom: 0;
            right: 2%;
            color: #999;
            font-size: 0.5rem;
          }
        }
        .comment_message {
          margin-left: 1.75rem;
          // height: 3rem;
          overflow: hidden;
          border-bottom: 1px solid #f3f3f3;
          .comment_content {
            margin: 0.5rem 0;
            font-size: 0.5rem;
            line-height: 0.65rem;
            max-width: 98%;
            color: #000;
            word-wrap: break-word;
            word-break: normal;
          }
          .other_comment {
            line-height: 1.1;
            padding: 0.2rem 0.2rem;
            max-width: 80%;
            font-size: 0.425rem;
            color: #666;
            border-left: 2px solid #ccc;
            span {
              color: rgb(105, 107, 216);
            }
            margin-bottom: 0.5rem;
          }
        }
      }
    }
  }

  footer {
    z-index: 10;
    height: 2.2rem;
    width: 100%;
    background-color: #f4f4f4;
    position: fixed;
    bottom: 0;
    line-height: 2.2rem;
    .comment_input {
      margin: 0;
      margin-left: 0.5rem;
      padding-left: 0.35rem;
      height: 1.2rem;
      border-radius: 1rem;
      width: 80%;
      font-size: 0.5rem;
      color: #000;
    }
    .fabiao {
      display: inline-block;
      background-color: #f8f8f8;
      border: none;
      outline: none;
      margin-left: 0.5rem;
      height: 0.8rem;
      line-height: 0.8rem;
      width: 1.5rem;
      font-size: 0.8rem;
    }
  }
  .popupbox {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    padding: 0.25rem 0;
    display: flex;
    flex-direction: column;
    p {
      flex: 1;
      border-bottom: 0.5px solid #888;
      font-size: 0.55rem;
      &:nth-child(3) {
        border: none;
      }
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>