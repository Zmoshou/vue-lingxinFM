<template>
  <div class="fm-container">
    <swiper></swiper>
    <div class="main-box">
      <div class="classfiy-box">
        <div class="middle_classify">
          <div class="classify_item" @click="getRondomList">
            <p class="classify_item_icon iconfont icon-xinaixin"></p>
            <p class="item_name">随心聆听</p>
          </div>
          <div class="classify_item" @click="toCategory(1)">
            <p class="classify_item_icon iconfont icon-icon_type"></p>
            <p class="item_name">分类节目</p>
          </div>
          <div class="classify_item" @click="toCommunicationPart">
            <p class="classify_item_icon iconfont icon-remenqingganwenda"></p>
            <p class="item_name">即时倾诉</p>
          </div>
          <div class="classify_item" @click="toFindMore">
            <p class="classify_item_icon iconfont icon-weibiaoti-"></p>
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
              <img v-lazy="ele.cover" />
              <span class="play iconfont icon-Album-Play"></span>
            </div>
            <div class="content">
              <h4 class="title">{{ ele.title }}</h4>
              <p class="p_name">{{ ele.speak }}</p>
            </div>
            <div class="control">
              <van-icon name="ellipsis" class="control_icon" @click.stop="radioOperate(ele)" />
            </div>
          </div>
        </div>
        <div class="change" @click="rotateChageIcon()">
          <span
            :style="{'transform':`translateY(-50%) rotate(${rotate}deg)`}"
            class="rotate_class changeicon iconfont icon-icon_refresh"
            ref="changeOne"
          ></span>
          <span class="change_text">换一换</span>
        </div>
      </div>
      <listTitle :title="'推荐播单'" :iconame="'icon-tuijian4'" to="/find/bodanlist"></listTitle>
      <findbodan :bodanList="recommendBodanList"></findbodan>
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
              <van-icon name="ellipsis" class="control_icon" @click.stop="radioOperate(item)" />
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
      rotate: 0,
      rotateFlag: false,
      newSelectList: [],
      HotRadioList: [],
      loading: false,
      finished: false,
      limit: 20,
      offset: 0,
      recommendBodanList: [
        {
          name: "解忧杂货铺",
          title: "解忧杂货铺",
          num: "32.2万",
          cover: "http://image.xinli001.com/20150707/14130647beae354a278dbf.jpg"
        },
        {
          name: "失恋",
          title: "失恋专辑,失恋治愈节目",
          num: "45.5万",
          cover: "http://image.xinli001.com/20141117/1738460ae93e8ba100e462.jpg"
        },
        {
          name: "旅行",
          title: "十一特辑：旅行",
          num: "12.5万",
          cover: "http://image.xinli001.com/20140930/1631005b0ad44c3934c5d1.jpg"
        },
        {
          name: "北京不仅是一座城",
          title: "北京不仅是一座城",
          num: "19.6万",
          cover:
            "http://ossimg.xinli001.com/20170522/1a45164c2eba7ad4aac9642aa59fff47.png"
        },
        {
          name: "治愈系音乐",
          title: "来自大自然的治愈系声音",
          num: "45.9万",
          cover: "http://image.xinli001.com/20140107/1522130ff36fd23a4b2e6b.jpg"
        },
        {
          name: "听言集",
          title: "听言集",
          num: "9.8万",
          cover: "http://image.xinli001.com/20150407/10285377b6ae1536003283.jpg"
        },
        {
          name: "夏天",
          title: "遇见夏天",
          num: "49.8万",
          cover: "http://image.xinli001.com/20150417/152606ac2648abe9fc9509.jpg"
        },
        {
          name: "三颗小豆子奇遇记",
          title: "三颗小豆子奇遇记",
          num: "6.8万",
          cover: "http://image.xinli001.com/20150616/1439464197f778e7716ae5.jpg"
        }
      ]
    };
  },
  created() {
    this.getHotRadioList();
  },
  methods: {
    getRondomList() {
      let random = Math.floor(Math.random() * 990);
      this.$axios
        .get("fm/newfm-list.json", {
          params: {
            offset: random,
            limit: 30,
            key: this.$store.state.key
          }
        })
        .then(res => {
          if (res.data.code === 0) {
            let data = res.data.data;
            console.log(data);
            this.$store.commit("setPlayerList", data);
            this.$store.commit("setFullScreen", true);
            this.$store.commit("setMediaUrlId", data[0].id);
            this.$toast({
              message: "随机选取" + data.length + "首播放",
              position: "bottom"
            });
          }
        });
    },
    getHotRadioList() {
      let random = Math.floor(Math.random() * 990);
      this.$axios
        .get("fm/newfm-list.json", {
          params: {
            offset: random,
            limit: 30,
            key: this.$store.state.key
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
            key: this.$store.state.key
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
      }, 800);
    },
    radioOperate(radio) {
      this.$store.commit("setRadioPopupShow", true);
      this.$store.commit("setRadioObj", radio);
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
      let list = [...this.HotRadioList, ...this.newSelectList];
      let newlist = JSON.parse(JSON.stringify(list)); //利用json转换深拷贝
      this.$store.commit("setPlayerList", newlist);
    },
    toFindMore() {
      this.$router.push({
        name: "findMoreMore"
      });
    },
    toCommunicationPart() {
      this.$router.push({
        name: "communicationPart"
      });
    },
    rotateChageIcon() {
      if (this.rotateFlag == false) {
        this.rotateFlag = true;
        this.rotate += 720;
        // this.$refs.changeOne.style.transform = `translateY(-50%) rotate(0${+1080}deg)`;
        // console.log(this.$refs.changeOne.style.transform);
        this.getHotRadioList();
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
  // transform: rotate(1080deg);
  transition: transform 0.5s;
}

.fm-container {
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
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
          line-height: 1.25;
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
      position: relative;
      margin: 0 auto 0.8rem;
      text-align: center;
      width: 3.125rem;
      height: 1rem;
      line-height: 1rem;
      border: 1px solid rgb(218, 201, 201);
      border-radius: 0.375rem;
      font-size: 0.5rem;
      .changeicon {
        transition: all 1s;
        font-size: 0.5rem;
        position: absolute;
        left: 10%;
        top: 50%;
      }
      .change_text {
        position: absolute;
        right: 10%;
        top: 50%;
        transform: translateY(-50%);
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


