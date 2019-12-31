<template>
  <div class="communication-container">
    <header>
      <span class="set-box">
        <a href="#" class="iconfont icon-jiantou-px-" @click.prevent="$router.go(-1)"></a>
      </span>
      <div class="nvabar">心理社区</div>
      <span class="serch-box"></span>
    </header>
    <div class="mian-content">
      <div class="tabbar">
        <div class="send_box">
          <span class="icon_send iconfont icon-fabu1"></span>
          <span class="send_content" @click="$router.push({name:'communicationCompile'})">发布</span>
          <p></p>
        </div>
        <div
          :class="['tabbar_item',{'select_color':idx == index}]"
          v-for="(item, idx) in list"
          :key="idx"
          @click="tabbarMove(idx)"
          ref="tabbar"
        >{{item}}</div>
        <span
          :class="['tabbar_line',{'transiziton':tranFlag}]"
          :style="{transform:`translateX(${index * tabbarMoveX - tabAddLength}px)`,width:`${width}px`}"
        ></span>
      </div>
      <div class="swiper" ref="swiper">
        <ul
          :class="['swiper_ul',{'transiziton':tranFlag}]"
          :style="{transform:`translateX(${- swiperMoveX}px)`,width:`${list.length}00%`}"
        >
          <li
            @touchstart="start($event)"
            @touchmove="move($event)"
            @touchend="end($event)"
            class="swiper_item"
          >
            <communicationItem :type="0"></communicationItem>
          </li>
          <li
            @touchstart="start($event)"
            @touchmove="move($event)"
            @touchend="end($event)"
            class="swiper_item"
          >
            <communicationItem :type="1"></communicationItem>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import communicationItem from "../../subcomponends/communicationPart-item.vue";
export default {
  data() {
    // 这个东西的代码超级级级级级级级 乱！！！！！ 以后再整理！！！
    return {
      list: ["精华", "热门"],
      index: 0,
      tabbarMoveX: 0,
      width: "",
      swiperWidth: "",
      swiperMoveX: "",
      startX: "", //手指初始坐标X
      moveX: "", //手指的距离X
      tranFlag: true, //控制是否轮播滚动添加动画
      moveFlag: false,
      moveFlagX: true, // 横向滚动时禁止竖向滚动
      moveFlagY: true, // 竖向滚动时禁止横向滚动
      startY: "", //手指初始坐标Y
      moveY: "", //手指的距离Y
      tabAddLength: 0 // 下划线增加的移动长度
    };
  },
  mounted() {
    this.width = this.$refs.tabbar[0].offsetWidth;
    this.swiperWidth = this.$refs.swiper.offsetWidth;
    this.swiperMoveX = this.swiperWidth * this.index;
    this.tabbarMoveX =
      this.$refs.tabbar[1].offsetLeft - this.$refs.tabbar[0].offsetLeft;
    // console.log(this.tabbarMoveX);
  },
  methods: {
    tabbarMove(idx) {
      this.index = idx;
      this.swiperMoveX = this.swiperWidth * this.index;
    },
    start(e) {
      this.moveX = "";
      //两件事，1按下时记录坐标，2按下时记录时间
      this.startX = e.targetTouches[0].pageX;
      this.startY = e.targetTouches[0].pageY;
    },
    move(e) {
      //记录x和y上的移动的距离
      this.moveX = e.targetTouches[0].pageX - this.startX;
      this.moveY = e.targetTouches[0].pageY - this.startY;

      if (this.moveFlagX) {
        if (this.moveY > 10 || this.moveY < -10) {
          //当竖向移动距离大于10时  静止横向移动
          this.moveFlagY = false;
        }
      }
      //当横向移动距离大于12时 页面才跟随移动
      if (this.moveFlagY) {
        if (this.moveX > 12 || this.moveX < -12) {
          this.moveFlagX = false; // 当横向移动距离大于12时  静止竖向移动
          this.tranFlag = false; // 手指移动时候不给做动画
          this.moveFlag = true; //只有移动节流阀改变
          //----------------------
          //
          if (this.index === 0 && this.moveX > 0) {
            return;
          }
          if (this.index === this.list.length - 1 && this.moveX < 0) {
            return;
          }
          //----------------------------
          this.tabAddLength =
            this.tabbarMoveX * (this.moveX / this.swiperWidth);
          this.swiperMoveX = this.swiperWidth * this.index - this.moveX;
          e.preventDefault();
        }
      }
    },
    end(e) {
      this.moveFlagY = true;
      this.moveFlagX = true;
      if (this.moveFlag === false) {
        return;
      }
      if (this.moveX > 70) {
        this.index--;
        this.tranFlag = true;
        this.index = this.index < 0 ? 0 : this.index;
        this.swiperMoveX = this.swiperWidth * this.index;
        this.tabAddLength = 0;
        return;
      }
      if (this.moveX < -70) {
        this.index++;
        this.tranFlag = true;
        this.index =
          this.index > this.list.length - 1 ? this.list.length - 1 : this.index;
        this.swiperMoveX = this.swiperWidth * this.index;
        this.tabAddLength = 0;
        return;
      }
      this.tranFlag = true;
      this.tabAddLength = 0;
      this.swiperMoveX = this.swiperWidth * this.index;
      this.moveFlag = false;
    }
  },
  components: {
    communicationItem
  }
};
</script>

<style lang="scss" scoped>
.communication-container {
  // z-index: 105;
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
  .send_box {
    color: #fa7963;
    position: absolute;
    right: 0;
    height: 100%;
    width: 1.8rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .icon_send {
      color: #fa7963;
      font-size: 0.75rem;
    }
    .send_content {
      color: #fa7963;
      font-size: 0.35rem;
    }
  }

  .mian-content {
    height: 100%;
    .tabbar {
      position: relative;
      width: 90%;
      margin: 0 auto;
      height: 1.5rem;
      display: flex;
      // justify-content: space-between;
      justify-content: start;
      align-items: center;
      .select_color {
        color: #fa7963;
        font-weight: 550;
      }
    }
    .tabbar_item {
      margin-right: 1.2rem;
      font-size: 0.55rem;
      padding: 0 5px;
    }
    .tabbar_line {
      position: absolute;
      left: 0;
      bottom: 0;
      height: 3px;
      background-color: #fa7963;
      border-radius: 8px;
    }
  }
  .swiper {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
  }
  .swiper_ul {
    height: 100%;
    width: 300%;
    // height: 300px;
    overflow: hidden;
    display: flex;
    .swiper_item {
      height: 95%;
      overflow: auto;
      flex: 1;
      width: 20%;
      &::-webkit-scrollbar {
        display: none; /*隐藏滚动条*/
      }
    }
  }
  .transiziton {
    transition: all 0.5s;
  }
}
</style>