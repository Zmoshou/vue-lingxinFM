<template>
  <div class="categoryList-container">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <ul>
          <li
            class="item"
            v-for="(item, index) in categoryListContent"
            :key="index"
            @click="toPlayerPage(item.id)"
          >
            <div class="cover_box">
              <img :src="item.cover" alt />
            </div>
            <div class="content_box">
              <p class="title">{{ item.title }}</p>
              <p class="p_name">{{ item.speak }}</p>
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
      categoryListContent: [],
      id: this.$route.params.id,
      loading: false,
      finished: false,
      isLoading: false,
      limit: 20,
      offset: 0
    };
  },
  created() {},
  methods: {
    getCategoryListContent() {
      this.$axios
        .get("fm/category-jiemu-list.json", {
          params: {
            category_id: this.id,
            offset: this.offset,
            limit: this.limit,
            key: this.$store.state.key
          }
        })
        .then(res => {
          if (res.data.code === 0) {
            let Data = res.data.data;
            this.categoryListContent = [...this.categoryListContent, ...Data];
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
      //异步更新数据
      setTimeout(() => {
        // 异步更新数据
        this.getCategoryListContent();
      },800);
    },
    onRefresh() {
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
        this.getCategoryListContent();
      }, 800);
    },
    radioOperate(radio) {
      this.$store.commit("setRadioPopupShow", true);
      this.$store.commit("setRadioObj", radio);
    },
    toPlayerPage(id) {
      this.$store.commit("setFullScreen", true);
      this.$store.commit("setMediaUrlId", id);
      let newlist = JSON.parse(JSON.stringify(this.categoryListContent)); //利用json转换深拷贝
      this.$store.commit("setPlayerList", newlist);
    }
  }
};
</script>

<style lang="scss" scoped>
.categoryList-container {
  padding-bottom: 2.5rem;
  ul {
    overflow: auto;
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
        line-height: 1.2;
        word-wrap: break-word;
        word-break: break-all;
        overflow: hidden;
        font-size: 0.55rem;
      }
      .p_name {
        margin-top: 0.5rem;
        font-size: 0.325rem;
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
}
</style>