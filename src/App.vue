<template>
  <div class="app-container">
    <transition :name="direction" mode="out-in">
      <router-view class="appView"></router-view>
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
// .app-container {

// }
.appView {
  &::-webkit-scrollbar {
    display: none;
    width: 0;
  }
  transition: all 0.35s ease-out;
}
.slide-left-enter {
  // transform: translate(0%, 0);
  transform: translate(50%, 0);
}
.slide-left-leave-active {
  transform: translate(-100%, 0);
  // transform: translate(0%, 0);
}
.slide-right-enter {
  // transform: translate(0%, 0);
  transform: translate(-50%, 0);
}
.slide-right-leave-active {
  transform: translate(100%, 0);
  // transform: translate(100%, 0);
}
.comment-enter {
  transform: translate(100%, 0);
}
.app-container {
  height: 100%;
  overflow: auto;
}
</style>
