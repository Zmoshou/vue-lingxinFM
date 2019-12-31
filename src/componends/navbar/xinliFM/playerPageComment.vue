<template>
  <div class="comment-container" ref="commentcontainer">
    <header>
      <span class="set-box">
        <a href="#" class="iconfont icon-jiantou-px-" @click="back"></a>
      </span>
      <div class="nvabar">评论({{ total}})</div>
      <span class="serch-box"></span>
    </header>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="radio_box" ref="radiobox">
        <div class="radio_item">
          <div class="cover">
            <img :src="playerInfo.cover" />
            <span class="play iconfont icon-Album-Play"></span>
          </div>
          <div class="content">
            <h4 class="title">{{ playerInfo.title }}</h4>
            <p class="p_name">{{ playerInfo.speak }}</p>
          </div>
          <!-- <div class="control"> -->
          <!-- </div> -->
        </div>
        <p class="comment_title">节目评论</p>

        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <div
            ref="commentBox"
            v-for="(item, index) in commentList"
            :key="index"
            :class="{'comment_box_bg':showNum == index&&show ? true : false,'comment_box':true}"
            @click="showCommentControl($event,index)"
          >
            <div
              :style="{'left':positionLift}"
              ref="showMessageBox"
              class="show_message_box"
              v-show="showNum == index&&show ? true : false"
            >
              <div class="show_message_choose">
                <div @click.stop="doReply(item.id, item.user.nickname)">回复</div>
                <div>复制</div>
                <div @click="doJubao">举报</div>
              </div>
              <div class="trangle_bottom"></div>
            </div>
            <div class="comment_userinfo">
              <div class="user_photo">
                <img :src="item.user.avatar" alt />
              </div>
              <div class="user_box">
                <p class="u_name">{{ item.user.nickname }}</p>
                <span class="time">{{ item.created_str }}</span>
              </div>
              <div class="zan" @click.stop="dianZan(item.id)">
                <span class="num">{{ item.zannum }}</span>
                <span class="dianzan iconfont icon-zan2"></span>
              </div>
            </div>
            <div class="comment_message">
              <p class="comment_content">{{ item.content }}</p>
              <p
                :class="{'comment_box_bg':showNum == index&&show ? true : false,'other_comment':true}"
                v-if="item.replyobject == null ? false : true"
              >
                <span>@{{ item.replyobject.user.nickname}}:</span>
                {{ item.replyobject.content }}
              </p>
            </div>
          </div>
        </van-list>
      </div>
    </van-pull-refresh>
    <footer class="do_comment">
      <input
        @focus="inputFocus"
        ref="commentInput"
        class="comment_input"
        type="text"
        @blur="changeSend"
        :placeholder="placeholderMsg"
        v-model="content"
      />
      <button class="fabiao iconfont icon-icon_send" @click.prevent="sentMessage"></button>
    </footer>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      id: this.$route.params.id,
      total: 0, //评论数量
      commentList: [],
      playerInfo: {}, //播放信息
      loading: false,
      finished: false,
      isLoading: false,
      limit: 8,
      offset: 0,
      content: "", //评论内容
      placeholderMsg: "写下你的心情和故事",
      //控制点击盒子的显示和隐藏
      showNum: -1,
      show: true,
      //控制点赞回复显示的位置,
      commnetFlag: true, //控制发送按钮是执行回复评论还是评论
      replyId: 0, //所回复信息的用户的id
      //控制回复评论盒子的宽高
      positionLift: 0,
      positionTop:0
    
    };
  },
  created() {
    this.getPlayer();
  },
  methods: {
    //--------控制背景盒子显示和隐藏
    showCommentControl(e, index) {
      // console.log(e);
      
      // console.dir(this.$refs.commentBox[index].offsetTop);
      
      if (this.showNum == index) {
        this.show = !this.show;
      } else {
        this.show = true;
        this.showNum = index;
      }
      this.$nextTick(() => {
        let commentBox = this.$refs.commentBox;
        let showMessageBox = this.$refs.showMessageBox;
        let boxLeft = e.pageX - commentBox[index].offsetLeft - 8;
        let maxLeft =
          commentBox[index].offsetWidth - showMessageBox[index].offsetWidth;
        if (boxLeft < -7) {
          boxLeft = -7;
        } else if (boxLeft > maxLeft + 7) {
          boxLeft = maxLeft + 7;
        }
        this.positionLift = boxLeft + "px";
      });
    },
    //控制盒子显示的位置结束-----------
    //点击回复 使输入框获取焦点
    doReply(id, name) {
      this.placeholderMsg = "回复 " + name;
      let commentInput = this.$refs.commentInput;
      commentInput.focus();
      this.replyId = id;
      this.commnetFlag = false;
    },
    //输入框获取焦点时 评论选中状态取消
    inputFocus() {
      this.show = false;
    },
    doJubao() {
      return Toast({
        message: "举报成功",
        duration: 1000
      });
    },
    // 给某条评论点赞
    dianZan(id) {
      console.log(id);
      // @click.stop='show()'
    },
    changeSend() {
      //文本框失去焦点时
      setTimeout(() => {
        this.commnetFlag = true;
      }, 500);
      this.placeholderMsg = "写下你的心情和故事";
    },
    //发送评论
    sentMessage() {
      if (this.content.trim().length === 0) {
        return Toast({
          message: "评论不能为空",
          duration: 1000
        });
      }
      if (this.commnetFlag == true) {
        this.postComment();
        this.commnetFlag = true;
      } else {
        this.postReplyComment();
        this.commnetFlag = true;
      }
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
          }
        });
    },
    getCommentList() {
      this.$axios
        .get("fm/comment-latest-list.json?", {
          params: {
            offset: this.offset,
            broadcast_id: this.id,
            limit: this.limit,
            key: this.$store.state.key
          }
        })
        .then(res => {
          this.total = res.data.total;
          let Data = res.data.data;
          this.commentList = [...this.commentList, ...Data];
          this.offset = this.offset + this.limit;
          // 加载状态结束
          this.loading = false;
          // 数据全部加载完成

          if (Data.length < this.limit) {
            this.finished = true;
          }
        });
    },
    //品论
    postComment() {
      this.$axios
        .post("fm/post-comment.json", {
          broadcast_id: this.id,
          reply_object_id: 0,
          content: this.content,
          token: this.$store.state.token
        })
        .then(res => {
          this.content = "";
          if (res.data.code === 0) {
            this.commentList.unshift(res.data.data);
            return Toast(res.data.message);
          } else if (res.data.code === 40002) {
            return Toast({
              message: res.data.message,
              duration: 1000
            });
          } else {
            return Toast({
              message: "评论失败",
              duration: 1000
            });
          }
        });
    },
    // 回复某人评论
    postReplyComment() {
      this.$axios
        .post("fm/post-comment.json", {
          broadcast_id: this.id,
          reply_object_id: this.replyId,
          key: "046b6a2a43dc6ff6e770255f57328f89",
          content: this.content,
          token: this.$store.state.token
        })
        .then(res => {
          this.content = "";
          if (res.data.code === 0) {
            this.commentList.unshift(res.data.data);
            return Toast(res.data.message);
          } else if (res.data.code === 40002) {
            return Toast(res.data.message);
          }
          this.commnetFlag = true;
        });
    },
    //上拉自动加载
    onLoad() {
      //异步更新数据
      setTimeout(() => {
        // 异步更新数据
        this.getCommentList();
      },800);
    },
    //下拉刷新
    onRefresh() {
      setTimeout(() => {
        Toast({
          message: "刷新成功",
          duration: 1000
        });
        this.isLoading = false;
        this.getCommentList();
      }, 500);
    },
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.comment-container {
  z-index: 105;
  background-color: #fff;
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
  footer {
    z-index: 10;
    height: 2.2rem;
    width: 100%;
    background-color: #f8f8f8;
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
  .radio_item {
    margin-top: 0.625rem;
    width: 100%;
    height: 3rem;
    margin-bottom: 0.5rem;
    .cover {
      position: relative;
      float: left;
      height: 3rem;
      width: 3rem;
      .play {
        position: absolute;
        left: 0.2rem;
        bottom: 0.2rem;
        color: #fff;
        font-size: 0.8rem;
      }
      img {
        height: 100%;
        width: 100%;
      }
    }
    .content {
      float: left;
      box-sizing: border-box;
      padding: 0.5rem 0 0.5rem 0.5rem;
      height: 100%;
      width: 10rem;
      // width: 85%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .title {
        font-size: 0.55rem;
        color: #000;
        margin-bottom: 0.5rem;
      }
      .p_name {
        font-size: 0.5rem;
      }
    }
    .control {
      float: left;
      margin-left: 0.2rem;
      height: 100%;
      display: flex;
      align-items: center;
      .control_icon {
        font-size: 0.8rem;
        color: #ccc;
      }
    }
  }
  .radio_box {
    padding: 0 0.325rem;
    .van-list {
      position: relative;
    }
    .comment_title {
      font-size: 0.5rem;
      margin: 0.95rem 0 0.5rem;
    }
    .comment_box_bg {
      background-color: #f3f3f3;
    }
    .show_message_box {
      position: absolute;
      top: -18%;
      right: 0%;
      z-index: 5;
      width: 7rem;
      height: 1.2rem;
      background-color: #434343;
      border-radius: 1.2rem;
      .trangle_bottom {
        //回复框下的小三角
        position: absolute;
        bottom: -95%;
        left: 10%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        // border-left: 0.4rem solid transparent;
        border-right: 0.4rem solid transparent;
        border-top: 1.5rem solid #434343;
      }
      .show_message_choose {
        display: flex;
        justify-content: left;
        div {
          box-sizing: border-box;
          line-height: 1.2rem;
          width: 33%;
          text-align: center;
          border-right: 1px solid #fff;
          color: #fff;
          font-size: 0.5rem;
          &:nth-child(3) {
            border-right: none;
          }
        }
      }
    }
    .comment_box {
      position: relative;
      // margin-top: 0.5rem;
      padding-top: 0.5rem;
      .comment_userinfo {
        position: relative;
        height: 2rem;
        width: 100%;
        overflow: hidden;
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
            font-size: 0.35rem;
            color: #ccc;
          }
        }
        .zan {
          position: absolute;
          bottom: 0;
          right: 0;
          color: #d4c4c4;
          font-size: 0.5rem;
          .dianzan {
            font-size: 0.65rem;
          }
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
</style>