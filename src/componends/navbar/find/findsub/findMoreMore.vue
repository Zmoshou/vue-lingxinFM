<template>
  <div class="findMoreMore-container">
    <header>
      <span class="set-box">
        <a href="#" class="iconfont icon-jiantou-px-" @click.prevent="toHome"></a>
      </span>
      <div class="nvabar">发现电台</div>
      <span class="serch-box">
        <a href="#" class="serch iconfont icon-icon-test12" @click.prevent="toSearch"></a>
      </span>
    </header>
    <!-- <div class="findMoreMore-box"> -->
    <ul>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        loading-text="加载中"
        @load="onLoad"
      >
        <li
          class="item"
          v-for="item in speakerList"
          :key="item.id"
          @click="toSpeakerDetial(item.id)"
        >
          <div class="photo">
            <img :src="item.cover" alt />
          </div>
          <div class="content">
            <p class="p_name">{{ item.title }}</p>
            <p class="first_radio">
              <span class="iconfont icon-icon-test19"></span>
              &nbsp;&nbsp;{{item.content}}
            </p>
          </div>
          <div class="goto iconfont icon-icon-test61"></div>
        </li>
      </van-list>
    </ul>
    <!-- </div> -->
  </div>
</template>

<script>
export default {
  name: "findMoreMore",
  data() {
    return {
      limit: 10,
      speakerList: [],
      speakerFirstRadioList: [],
      loading: false,
      finished: false,
      listAll: 0
    };
  },
  created() {
    this.getSpeakerList();
  },
  methods: {
    getSpeakerList() {
      this.$axios
        .get("fm/diantai-new-list.json", {
          params: {
            offset: 0,
            limit: this.limit,
            key: this.$store.key
          }
        })
        .then(res => {
          if (res.data.code === 0) {
            this.speakerList = res.data.data;
            // this.speakerList.push(this.speakerList);
          }
        });
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        this.limit += 10;
        this.getSpeakerList();
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.speakerList.length >= 343) {
          this.finished = true;
        }
      }, 800);
    },
    toSpeakerDetial(id) {
      this.$router.push({
        name: "RadioSpeakerDeyial",
        params: { id }
      });
    },
    toHome() {
      this.$router.push({
        name: "home"
      });
    },
    // toSearch() {
    //   this.$router.push("/fm/find/search");
    // }
    toSearch() {
      this.$router.push({
        name: "search"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.findMoreMore-container {
  padding: 2.2rem 0;
  position: relative;
  background-color: #fff;
  height: 100%;
  z-index: 15;
  box-sizing: border-box;
  overflow-y: auto;

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

    .nvabar-my,
    .nvabar-xinli_fm,
    .nvabar-find {
      color: #000;
    }

    .router-link-active {
      color: red;
      font-size: 0.875rem;
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

      .serch {
        position: absolute;
        right: 0.3125rem;
      }
    }
  }

  .item {
    height: 3.125rem;
    margin: 0;
    padding: 0;
    .photo {
      float: left;
      width: 3.125rem;
      height: 3.125rem;
      line-height: 3.125rem;
      text-align: center;
      img {
        width: 70%;
        border-radius: 50%;
      }
    }
    .content {
      float: left;
      padding-left: 0.125rem;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .p_name {
        font-size: 0.625rem;
      }
      .first_radio {
        margin-top: 0.25rem;
        font-size: 0.5rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 10rem;
        color: rgb(172, 164, 164);
      }
    }
    .goto {
      float: right;
      margin-right: 0.5rem;
      line-height: 3.125rem;
      color: rgb(172, 164, 164);
      font-size: 0.7rem;
    }
  }
}
</style>