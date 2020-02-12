<template>
  <div class="app-container">
    <transition :name="direction" mode="out-in">
      <router-view class="appView"></router-view>
    </transition>
    <footerplayer v-show="hideshow"></footerplayer>
  </div>
</template>

<script>
import footerplayer from "./componends/subcomponends/footer-player.vue";
export default {
  name: "App",
  data: () => ({
    direction: "slide-right",
    appOverflow: true,
    docmHeight: document.documentElement.clientHeight, //默认屏幕高度
    showHeight: document.documentElement.clientHeight, //实时屏幕高度
    hideshow: true //显示或者隐藏footer
  }),

  mounted() {
    // window.onresize监听页面高度的变化
    window.onresize = () => {
      return (() => {
        this.showHeight = document.body.clientHeight;
      })();
    };
  },

  components: {
    footerplayer
  },
  watch: {
    showHeight: function() {
      if (this.docmHeight > this.showHeight) {
        this.hideshow = false;
      } else {
        this.hideshow = true;
      }
    },

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
  transition: all 0.35s ease;
}

// .slide-left-enter,
// .slide-right-leave-active {
//   -webkit-transform: translate(100%, 0);
//   transform: translate(100%, 0);
//    /*当左滑进入右滑进入过渡动画*/
// }

// .slide-left-leave-active,
// .slide-right-enter {
//   -webkit-transform: translate(-100%, 0);
//   transform: translate(-100%, 0);
// }

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
  transform: translate(100%, 0);
}

.comment-enter {
  transform: translate(100%, 0);
}
.app-container {
  height: 100%;
  overflow: auto;
}
</style>
