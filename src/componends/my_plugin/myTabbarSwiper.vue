<template>
  <div class="swiper-container">
    <div class="tabbar">
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
        :style="{transform:`translateX(${- swiperMoveX}px)`}"
      >
        <li
          @touchstart="start($event)"
          @touchmove="move($event)"
          @touchend="end($event)"
          class="swiper_item"
        >
          <div class="divclass">1</div>
        </li>
        <li
          @touchstart="start($event)"
          @touchmove="move($event)"
          @touchend="end($event)"
          class="swiper_item"
        >
          <div class="divclass">2</div>
        </li>
        <li
          @touchstart="start($event)"
          @touchmove="move($event)"
          @touchend="end($event)"
          class="swiper_item"
        >
          <div class="divclass">3</div>
        </li>
        <li
          @touchstart="start($event)"
          @touchmove="move($event)"
          @touchend="end($event)"
          class="swiper_item"
        >
          <div class="divclass">4</div>
        </li>
        <li
          @touchstart="start($event)"
          @touchmove="move($event)"
          @touchend="end($event)"
          class="swiper_item"
        >
          <div class="divclass">5</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    // 这个东西的代码超级级级级级级级 乱！！！！！ 以后再整理！！！
    return {
      list: ["内地", "港台", "欧美", "韩国", "日本"],
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
    console.log(this.tabbarMoveX);
  },
  methods: {
    tabbarMove(idx) {
      this.index = idx;
      this.swiperMoveX = this.swiperWidth * this.index;
    },
    start(e) {
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
  components: {}
};
</script>

<style lang="scss" scoped>
.divclass {
  margin: 0.5rem;
  font-size: 0.6rem;
  background-color: skyblue;
  height: 300px;
}

.swiper-container {
  height: 100%;
  .tabbar {
    position: relative;
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-between;
    // justify-content: space-around;
    align-items: center;
    .select_color {
      color: red;
      font-weight: 550;
    }
  }
  .tabbar_item {
    font-size: 0.6rem;
    padding: 0 5px;
  }
  .tabbar_line {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 3px;
    background-color: red;
    border-radius: 5px;
  }
}
.swiper {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}
.swiper_ul {
  height: 100%;
  width: 500%;
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
</style>