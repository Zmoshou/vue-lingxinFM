<template>
  <div class="boDanList-container">
    <header>
      <span class="set-box">
        <a href="#" class="iconfont icon-jiantou-px-" @click.prevent="back"></a>
      </span>
      <div class="nvabar">播单列表</div>
      <span class="serch-box"></span>
    </header>
    <ul class="list_ul">
      <li
        class="list_item"
        v-for="(item, index) in boDaList"
        :key="index"
        @click="toBodanContent(item)"
      >
        <div class="cover_box">
          <img :src="item.cover" />
        </div>
        <span class="bofang iconfont icon-icon-test19"></span>
        <span class="bofang_num">{{ item.num }}</span>
        <p class="title">{{ item.title }}</p>
      </li>
    </ul>
  </div>
</template>
<script>
//json文件手写的数据
import boDan from "../../../../static/jsonDB/boDan.json";
export default {
  data() {
    return {
      boDaList: []
    };
  },
  created() {
    this.boDaList = boDan;
  },
  methods: {
    toBodanContent(obj) {
      this.$router.push({
        name: "bodanContent"
      });
      this.$store.commit("setBodanConfig", obj);
    },
    back() {
      this.$router.push("/home");
    }
  }
};
</script>

<style lang="scss" scoped>
.boDanList-container {
  height: 100%;
  overflow: auto;
  padding: 2.2rem 0;
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
  .list_ul {
    padding: 0 0.75rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .list_item {
      position: relative;
      margin-top: 0.5rem;
      width: 6.75rem;
      height: 7.5rem;
      .cover_box {
        width: 100%;
        height: 80%;
      }
      img {
        width: 100%;
        height: 100%;
      }
      .bofang {
        // z-index: 9;
        position: absolute;
        left: 5%;
        bottom: 25%;
        font-size: 0.75rem;
        color: #fff;
      }
      .bofang_num {
        position: absolute;
        left: 25%;
        bottom: 25%;
        font-size: 0.65rem;
        color: #fff;
      }
      .title {
        line-height: 1.2;
        width: 100%;
        height: 20%;
        font-size: 0.55rem;
        white-space: pre-wrap;
        word-wrap: break-word;
        word-break: break-all;
        overflow: hidden;
      }
    }
  }
}
</style>