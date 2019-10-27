<template>
  <div class="home-container">
    <appheader></appheader>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import appheader from "../../subcomponends/header.vue";

export default {
  components: {
    appheader
  }
};
</script>

<style lang="scss" scoped>
.home-container {
  padding: 2.2rem 0;
}
</style>