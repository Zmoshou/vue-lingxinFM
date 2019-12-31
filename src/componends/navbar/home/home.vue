<template>
  <div class="home-container">
    <appheader ref="appheader"></appheader>
    <van-swipe
      @change="onChange"
      ref="vanSwiper"
      :loop="false"
      :initial-swipe="$store.state.swiperInitial"
      :show-indicators="false"
    >
      <van-swipe-item>
        <my-container></my-container>
      </van-swipe-item>
      <van-swipe-item>
        <xinLiFM-container></xinLiFM-container>
      </van-swipe-item>
      <van-swipe-item>
        <find-container></find-container>
      </van-swipe-item>
    </van-swipe>
    <!-- <keep-alive>
      <router-view></router-view>
    </keep-alive>-->
  </div>
</template>

<script>
import appheader from "../../subcomponends/header.vue";

import myContainer from "../my/my.vue";
import findContainer from "../find/find.vue";
import xinLiFMContainer from "../xinliFM/fm.vue";

export default {
  data() {
    return {
      timer: {}
    };
  },
  methods: {
    onChange(index) {
      this.$refs.appheader.select = index;
    }
  },
  components: {
    appheader,
    myContainer,
    findContainer,
    xinLiFMContainer
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    // setSwiperInitial(state, num) {
    //   state.swiperInitial = num;
    // },
    this.$store.commit("setSwiperInitial", this.$refs.appheader.select);
    next();
  }
};
</script>

<style lang="scss" scoped>
.home-container {
  height: 100%;
  overflow: auto;
  padding: 2.2rem 0;
  box-sizing: border-box;
}
.van-swipe {
  height: 100%;
}
</style>