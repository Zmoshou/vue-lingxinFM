<template>
  <div class="communicationCompile-container">
    <header>
      <span class="set-box">
        <a href="#" class="iconfont icon-jiantou-px-" @click.prevent="$router.go(-1)"></a>
      </span>
      <div class="nvabar">发布心事</div>
      <span class="serch-box"></span>
    </header>
    <div class="Compile_box">
      <!-- <form ref="form"> -->
      <div class="title_box">
        <span class="icont iconfont icon-biaoti"></span>
        <input v-model="title" placeholder="标题" class="title" type="text" />
      </div>
      <div class="content_box">
        <span class="iconc iconfont icon-fabu1"></span>
        <textarea v-model="content" placeholder="此刻的想法" class="text_area"></textarea>
      </div>
      <div class="img_box">
        <van-uploader
          :before-read="beforeRead"
          :after-read="onRead"
          v-model="fileList"
          :max-count="6"
          multiple
          preview-size="4.2rem"
        />
      </div>
      <button class="send" @click="postForumThread">发布</button>
      <!-- </form> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: [],
      imgList: [],
      title: "",
      content: "",
      formData: new FormData()
    };
  },
  created() {},
  methods: {
    beforeRead(file) {
      console.log(file.type);
      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        this.$toast("请上传正确格式图片");
        return false;
      }
      return true;
    },
    onRead(file) {
      console.log(file);
      // this.imgList.push(file.file);
      this.formData.append("images[]", file.file);
    },
    postForumThread() {
      if (this.title && this.content) {
        this.formData.append("flag", 0);
        this.formData.append("title", this.title);
        this.formData.append("key", this.$store.state.key);
        this.formData.append("content", this.content);
        this.formData.append("token", this.$store.state.token);
        // this.formData.append("images[]", this.imgList);

        let header = {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        };
        this.$axios
          .post("fm/post-forum-thread.json", this.formData, header)
          .then(res => {
            console.log(res.data);
            if (res.data.code === 0) {
              this.$toast({
                message: "发布成功"
              });
              this.title = this.content = "";
              this.$router.go(-1);
            } else if (res.data.code === 40002) {
              this.$toast({
                message: "发表话题有点频繁哦"
              });
            }
          });
      } else {
        this.$toast({
          message: "请填写内容"
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.communicationCompile-container {
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
  .Compile_box {
    padding: 0.25rem 0.25rem 0;
    box-sizing: border-box;
    width: 100%;
    // height: 65%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .icon {
      width: 1.5rem;
    }
    .title_box {
      height: 1.5rem;
      display: flex;
      margin-bottom: 0.75rem;
      .icont {
        font-size: 0.75rem;
        color: #fa7963;
        margin: 0.35rem 0.5rem 0 0;
      }
      .title {
        border-bottom: 1px solid #f4f4f4;
        flex: 1;
        height: 1.5rem;
        font-size: 0.55rem;
        color: #000;
        &:placeholder {
          color: #ccc;
        }
      }
    }
    .content_box {
      height: 4rem;
      margin: 0.25rem 0;
      display: flex;
      .iconc {
        font-size: 0.75rem;
        color: #fa7963;
        margin-right: 0.5rem;
      }
      .text_area {
        flex: 1;
        height: 4rem;
        font-size: 0.55rem;
        border-bottom: 1px solid #f4f4f4;
        color: #000;
        &:placeholder {
          color: #ccc;
        }
      }
    }
    .img_box {
      box-sizing: border-box;
      padding: 0 0.5rem;
    }
    .send {
      line-height: 1.8rem;
      font-size: 0.65rem;
      color: #fff;
      font-weight: 550;
      width: 100%;
      background-color: #fa7963;
      border-radius: 2px;
    }
  }
}
// .communicationCompile-container /deep/ .van-uploader__wrapper {
//   display: flex;
//   justify-content: space-between;
// }
.communicationCompile-container /deep/ .van-uploader__preview {
  margin: 0 0.325rem 0.325rem 0;
}
.communicationCompile-container /deep/ .van-uploader__preview-delete {
  font-size: 0.5rem;
}
</style>

<style lang="scss">
</style>