<template>
  <div class="app-container">
    <transition :name="direction" mode="out-in">
      <keep-alive include="findMoreMore">
        <router-view class="appView"></router-view>
      </keep-alive>
    </transition>
    <footerplayer></footerplayer>
    <!-- <footer>123</footer> -->
  </div>
</template>

<script>
import footerplayer from "./componends/subcomponends/footer-player.vue";
export default {
  name: "App",
  data: () => ({
    direction: "slide-right"
  }),
  components :{
    footerplayer
  },
  watch: {
    $route(to, from) {
      console.log();
      if (to.name == "comment") {
        this.direction = "slide-left";
        return;
      }

      if (from.name == "comment") {
        this.direction = "slide-right";
        return;
      }

      if (to.name == "playerPage") {
        this.direction = "playerPageShow";
        return;
      }
      if (from.name == "playerPage") {
        this.direction = "playerPagehide";
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
.appView {
  position: absolute;
  top: 0;
  width: 100%;
  transition: all 0.3s ease-out;
}
.slide-left-enter {
  transform: translate(0%, 0);
}
.slide-left-leave-active {
  transform: translate(-100%, 0);
}
.slide-right-enter {
  // transform: translate(-50%, 0);
  transform: translate(-50%, 0);
}
.slide-right-leave-active {
  // transform: translate(100%, 0);
  transform: translate(100%, 0);
}

// 播发页面的进出动画
.playerPageShow-enter {
  transform: translate(0, 100%) scale(0.5);
}
.playerPageShow-leave-active {
  transform: translate(0, 0%) scale(1);
}
.playerPagehide-enter {
  transform: translate(0, 0%) scale(1);
}
.playerPagehide-leave-active {
  transform: translate(0, 100%) scale(0.5);
}

.app-container {
  overflow: hidden;
  // padding: 2.2rem 0;

  footer {
    // position: absolute;;
    position: fixed;
    z-index: 20;
    bottom: 0;
    left: 0;
    // right: 0;
    height: 2.2rem;
    width: 100%;
    background-color: #f8f8f8;
    // background-color: #333;
  }
}
</style>