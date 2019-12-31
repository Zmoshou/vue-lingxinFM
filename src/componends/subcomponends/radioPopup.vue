<template>
  <div>
    <van-popup v-model="radioPopupShow" round position="bottom" :style="{ height: '50%' }">
      <div class="radioPopup-container">
        <div class="item_box">
          <p>节目：{{radioObj.title}}</p>
        </div>
        <div class="item_box" @click="nextPlay(radioObj)">
          <span class="iconfont icon-icon-test19"></span>下一首播放
        </div>
        <div class="item_box">
          <span class="iconfont icon-xinaixin1"></span>收藏节目
          <!-- <span class="iconfont icon-xinaixin">icon</span>收藏节目 -->
        </div>
        <div class="item_box">
          <span class="iconfont icon-xiazai"></span>下载
        </div>
        <div class="item_box">
          <span class="iconfont icon-fenxiang"></span>分享
        </div>
        <!-- 这里是解决接口数据的一个坑 -->
        <div
          class="item_box"
          v-if="$route.name ==='home'||$route.name ==='categoryChange' "
          @click="toSpeakerDetial(radioObj.diantai.id)"
        >
          <span class="iconfont icon-diantai_changgui"></span>
          电台：{{radioObj.speak}}
        </div>
        <div class="item_box" v-else @click="toSpeakerDetial()">
          <span class="iconfont icon-diantai_changgui"></span>
          电台：{{radioObj.speak}}
        </div>
        <div class="popup_close" @click.stop="radioPopupShow = false">取消</div>
      </div>
    </van-popup>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  computed: {
    radioPopupShow: {
      get() {
        return this.$store.state.radioPopupShow;
      },
      set(val) {
        this.$store.commit("setRadioPopupShow", val);
      }
    },
    radioObj: function() {
      return this.$store.state.radioObj;
    }
  },
  methods: {
    toSpeakerDetial(id) {
      this.$store.commit("setRadioPopupShow", false);
      console.log(this.$route);
      if (arguments.length !== 0) {
        this.$router.push({
          name: "RadioSpeakerDeyial",
          params: { id }
        });
      } else {
        return this.$toast("接口数据的问题，跳不动啊");
      }
    },
    nextPlay(raido) {
      this.$toast.success({
        message: "添加成功",
        duration: 1500
      });
      this.$store.commit("setRadioPopupShow", false);
      //如果播放列表不为空
      if (this.$store.state.playerList.length > 0) {
        //先找到当前正在播放元素的位置
        let index = this.$store.state.playerList.findIndex(ele => {
          return ele.id == this.$store.state.mediaUrlId;
        });
        // 再在列表中找下一个将要播放的元素 没有就返回-1
        let radioIndex = this.$store.state.playerList.findIndex(ele => {
          return ele.id == raido.id;
        });
        //先判断下一个比分的元素在不在列表中
        if (radioIndex !== -1) {
          //如果在列表中 再判断下一个播放的元素是不是位于下一个播放的位置
          if (radioIndex - index === 1) {
            //如果已经位于下一个位置 return
            console.log(-1);
            return;
          } else {
            console.log("在列表中，将这个元素放到到下一个位置");
            //否则 将这个元素放到到下一个位置
            //先删除 再添加
            this.$store.state.playerList.splice(radioIndex, 1);
            let nextIndex = radioIndex > index ? index + 1 : index;
            this.$store.state.playerList.splice(nextIndex, 0, raido);
            //重新设置当前高亮索引
            let lightIndex = this.$store.state.playerList.findIndex(ele => {
              return ele.id == this.$store.state.mediaUrlId;
            });
            this.$store.commit("setSelectIndex", lightIndex);
          }
        } else {
          //如果不在列表中 就加入列表中
          console.log("不在列表中 ");
          this.$store.state.playerList.splice(index + 1, 0, raido);
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.radioPopup-container {
  padding: 0.35rem;
  box-sizing: border-box;
  height: 100%;
  display: flex;
  flex-direction: column;
  .item_box {
    flex: 1;
    border-top: 1px solid #f2f2f2;
    display: flex;
    align-items: center;
    color: #000;
    font-size: 0.5rem;
    &:nth-child(1) {
      flex: 0.8;
      border-top: none;
      color: #666;
      width: 100%;
      p {
        line-height: 1.2;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 0.5rem;
      }
    }
    span {
      font-size: 0.65rem;
      color: #fa7963;
      margin-right: 0.5rem;
    }
    &:nth-child(3),
    &:nth-child(4) {
      span {
        font-size: 0.55rem;
      }
    }
  }
  .popup_close {
    display: flex;
    height: 15%;
    justify-content: center;
    align-items: center;
    font-size: 0.65rem;
    color: #666;
    border-top: 1px solid #f2f2f2;
  }
}
</style>