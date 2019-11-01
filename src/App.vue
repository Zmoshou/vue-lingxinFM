<template>
  <div class="app-container">
    <transition :name="direction" mode="out-in">
      <keep-alive include="findMoreMore">
        <router-view class="appView"></router-view>
      </keep-alive>
    </transition>
    <footerplayer></footerplayer>
  </div>
</template>

<script>
import footerplayer from "./componends/subcomponends/footer-player.vue";
export default {
  name: "App",
  data: () => ({
    direction: "slide-right",
    appOverflow: true
  }),
  components: {
    footerplayer
  },
  watch: {
    $route(to, from) {
      if (to.name == "comment") {
        this.direction = "comment";
        return;
      }
      const toDepth = to.path.split("/").length;
      const fromDepth = from.path.split("/").length;
      if (to.path == "/") {
        this.direction = "slide-right";
      } else if (from.path == "/") {
        this.direction = "slide-left";
      } else {
        this.direction = toDepth < fromDepth ? "slide-right" : "slide-left";
      }
    }
  }
};
</script>
<style lang="scss" scoped>
body html {
  height: 100%;
}

.appView {
  &::-webkit-scrollbar {
    display: none;
    width: 0;
  }
  height: 100%;
  width: 100%;
  transition: all 0.5s ease-out;
}
.slide-left-enter {
  transform: translate(0%, 0);
}
.slide-left-leave-active {
  transform: translate(-100%, 0);
}
.slide-right-enter {
  transform: translate(-0%, 0);
}
.slide-right-leave-active {
  // transform: translate(100%, 0);
  transform: translate(100%, 0);
}
.comment-enter {
  transform: translate(100%, 0);
}
.app-container {
  height: 100%;
  // overflow: hidden;
}
</style>