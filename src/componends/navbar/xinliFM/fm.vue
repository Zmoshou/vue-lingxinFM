<template>
  <div class="fm-container">
    <swiper></swiper>
    <div class="main-box">
      <div class="classfiy-box">
        <div class="middle_classify">
          <div class="classify_item">
            <p class="classify_item_icon iconfont icon-xinaixin"></p>
            <p class="item_name">随心听</p>
          </div>
          <div class="classify_item" @click="toCategory(1)">
            <p class="classify_item_icon iconfont icon-icon_type"></p>
            <p class="item_name">分类节目</p>
          </div>
          <div class="classify_item">
            <p class="classify_item_icon iconfont icon-remenqingganwenda"></p>
            <p class="item_name">即时倾诉</p>
          </div>
          <div class="classify_item">
            <p class="classify_item_icon iconfont icon-weibiaoti-" @click="toFindMore"></p>
            <p class="item_name">主播电台</p>
          </div>
        </div>
      </div>
      <listTitle :title="'热播节目'" :iconame="'icon-liuhang'"></listTitle>
      <div class="radio_list">
        <div class="list_init">
          <div
            class="radio_item"
            v-for="(ele, index) in HotRadioList"
            :key="index"
            @click="toPlayerPage(ele.id)"
          >
            <div class="cover">
              <img :src="ele.cover" />
              <span class="play iconfont icon-Album-Play"></span>
            </div>
            <div class="content">
              <h4 class="title">{{ ele.title }}</h4>
              <p class="p_name">{{ ele.speak }}</p>
            </div>
            <div class="control">
              <!-- <span class="control_icon iconfont icon-icon-test39"></span> -->
              <van-icon name="ellipsis" class="control_icon" />
            </div>
          </div>
        </div>
        <div class="change" @click="getHotRadioList();rotateChageIcon()">
          <span :class="[{'rotate_class':rotateFlag},'changeicon iconfont icon-icon_refresh']"></span>
          <span class="change_text">换一换</span>
        </div>
      </div>
      <listTitle :title="'推荐播单'" :iconame="'icon-tuijian4'" :more="false"></listTitle>
      <findbodan></findbodan>
      <listTitle :title="'最新精选'" :iconame="'icon-icon-test5'" :more="false"></listTitle>
      <div class="radio_list">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <div
            class="radio_item"
            v-for="(item, index) in newSelectList"
            :key="index"
            @click="toPlayerPage(item.id)"
          >
            <div class="cover">
              <img :src="item.cover" />
              <span class="play iconfont icon-Album-Play"></span>
            </div>
            <div class="content">
              <h4 class="title">{{ item.title }}</h4>
              <p class="p_name">{{ item.speak }}</p>
            </div>
            <div class="control">
              <van-icon name="ellipsis" class="control_icon" />
              <!-- <span class="control_icon iconfont icon-icon-test39"></span> -->
            </div>
          </div>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import listTitle from "../../subcomponends/listTitle.vue";
import swiper from "../../subcomponends/swiper.vue";
import findbodan from "../../subcomponends/findBodan.vue";
export default {
  data() {
    return {
      rotateFlag: false,
      newSelectList: [],
      HotRadioList: [],
      loading: false,
      finished: false,
      limit: 10,
      offset: 0
    };
  },
  created() {
    this.getHotRadioList();
  },
  methods: {
    getHotRadioList() {
      let random = Math.floor(Math.random() * 990);
      this.$axios
        .get("fm/newfm-list.json", {
          params: {
            offset: random,
            limit: 30,
            key: this.$store.key
          }
        })
        .then(res => {
          if (res.data.code === 0) {
            let data = res.data.data;
            let newsData = [];
            for (let i = 0; i < 3; i++) {
              let numRan = Math.floor(Math.random() * (data.length - i)); //随机数
              newsData.push(data[numRan]); //循环3次 每次生产随机数 加入newsData中 并且将data中加入过的数组删除
              data.splice(numRan, 1);
            }
            this.HotRadioList = newsData;
          } else {
            this.$toast("刷新失败");
          }
        });
    },
    getNewSelectList() {
      this.$axios
        .get("fm/newfm-list.json", {
          params: {
            offset: this.offset,
            limit: this.limit,
            key: this.$store.key
          }
        })
        .then(res => {
          if (res.data.code === 0) {
            let Data = res.data.data;
            this.newSelectList = [...this.newSelectList, ...Data];
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
        this.getNewSelectList();
      }, 500);
    },
    toCategory(id) {
      this.$router.push({
        name: "category",
        params: { id }
      });
    },
    toPlayerPage(id) {      
      this.$store.commit("setFullScreen", true);
      this.$store.commit("setMediaUrlId", id);
      this.$store.commit("setPlayerList", this.newSelectList);
    },
    toFindMore() {
      this.$router.push({
        name: "findMoreMore"
      });
    },
    rotateChageIcon() {
      if (this.rotateFlag == false) {
        this.rotateFlag = true;
        setTimeout(() => {
          this.rotateFlag = false;
        }, 1500);
      }
    }
  },
  components: {
    listTitle,
    swiper,
    findbodan
  }
};
</script>

<style lang="scss" scoped>
.rotate_class {
  display: inline-block;
  transform: rotate(1080deg);
}

.fm-container {
  height: 100%;
  overflow: hidden;
  padding-bottom: 2.2rem;
  .main-box {
    // position: absolute;
    width: 100%;
    // height: 9rem;
    // background-color: #666;
  }
  .classfiy-box {
    position: relative;
    width: 100%;
    height: 3.8rem;
    margin-bottom: 0.5rem;
    .middle_classify {
      position: absolute;
      top: -20%;
      left: 50%;
      z-index: 5;
      transform: translate(-50%, 15%);
      height: 3.125rem;
      width: 96%;
      background-color: #fff;
      box-shadow: 0 8px 12px 1px rgb(230, 223, 223);
      border-radius: 0.5rem;
      display: flex;
      justify-content: space-around;
      align-items: center;

      .classify_item {
        box-sizing: border-box;
        height: 2rem;
        width: 2.5rem;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        align-items: center;
        // background-color: yellow;
        .classify_item_icon {
          font-size: 1.2rem;
          color: #fa7963;
        }
        .item_name {
          color: #000;
          font-size: 0.5rem;
        }
      }
    }
  }
  .radio_list {
    margin: 0.5rem 0.5rem 0;
    .list_init {
      min-height: 11rem;
    }
    .radio_item {
      width: 100%;
      height: 3rem;
      // background-color: #ccc;
      margin-bottom: 0.5rem;
      overflow: hidden;
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
          color: #b1b5b8;
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
    .change {
      margin: 0 auto 0.8rem;
      text-align: center;
      width: 3.125rem;
      height: 1rem;
      line-height: 1rem;
      border: 1px solid rgb(218, 201, 201);
      border-radius: 0.375rem;
      font-size: 0.5rem;
      .changeicon {
        transition: all 1.5s;
        font-size: 0.5rem;
      }
      .change_text {
        margin-left: 0.2rem;
        font-size: 0.5rem;
      }
    }
  }
  .data_tody {
    margin: 0.5rem 0.5rem 0;
    height: 0.75rem;
    background-color: #a1a;
  }
}
</style>


