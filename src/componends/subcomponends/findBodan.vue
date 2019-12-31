<template>
  <div class="findbodan-container">
    <div class="findbodan-box">
      <div class="card_box" @touchmove.stop>
        <ul class="card_box-ul">
          <li
            class="card_box_item"
            v-for="(item, index) in bodanList"
            :key="index"
            @click="toBodanContent(item)"
          >
            <img :src="item.cover" />
            <span class="bofang iconfont icon-icon-test19"></span>
            <span class="bofang_num">{{ item.num }}</span>
            <p class="title">{{ item.title }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
// 精选播单等下的图片组件
export default {
  methods: {
    toBodanContent(obj) {
      this.$router.push({
        name: "bodanContent"
      });
      this.$store.commit("setBodanConfig", obj);
    }
  },
  props: ["bodanList"]
};
</script>

<style lang="scss" scoped>
.findbodan-container {
  .findbodan-box {
    margin-bottom: 0.9375rem;
    .card_box {
      .card_box-ul {
        margin-top: 0.5rem;
        white-space: nowrap;
        // overflow: auto;
        overflow-x: auto;
        overflow-y: hidden;
        &::-webkit-scrollbar {
          display: none;
        }
        .card_box_item {
          position: relative;
          overflow: hidden;
          display: inline-block;
          margin: 0 0.25rem;
          width: 5.625rem;
          height: 7rem;
          img {
            width: 100%;
            height: 78%;
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
            font-size: 0.6rem;
            color: #fff;
          }
          .title {
            line-height: 1.2;
            width: 100%;
            height: 20%;
            font-size: 0.5rem;
            white-space: pre-wrap;
            word-wrap: break-word;
            word-break: break-all;
            overflow: hidden;
          }
        }
      }
    }
  }
}
</style>