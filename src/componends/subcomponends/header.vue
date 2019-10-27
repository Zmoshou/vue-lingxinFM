<template>
  <div class="header-container">
    <header>
      <span class="set-box">
        <a href="#" class="iconfont icon-shezhi2"></a>
      </span>
      <div class="nvabar" ref="navbarBox">
        <router-link to="/my" class="nvabar-my">
          <span class="my">我的</span>
        </router-link>
        <router-link to="/fm" class="nvabar-xinli_fm">
          <span class="fm">聆心FM</span>
        </router-link>
        <router-link to="/find" class="nvabar-find">
          <span class="find">发现</span>
        </router-link>
        <span class="undweline"></span>
      </div>
      <span class="serch-box">
        <a href="#" class="serch iconfont icon-icon-test12" @click.prevent="toSearch"></a>
      </span>
    </header>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    toSearch() {
      this.$router.push({
        name: "search"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
header {
  // position: absolute;
  position: fixed;
  z-index: 20;
  width: 100%;
  top: 0;
  left: 0;
  height: 2.2rem;

  background-color: #f8f8f8;
  display: flex;
  // z-index: 10;
  justify-content: space-between;

  .nvabar {
    position: relative;
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.75rem;
  }

  .nvabar-my,
  .nvabar-xinli_fm,
  .nvabar-find {
    color: #000;
  }

  .router-link-active {
    color: #fa7963;
    font-size: 0.875rem;
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

    .serch {
      position: absolute;
      right: 0.3125rem;
    }
  }
}
</style>