<template>
  <div class="title-box">
    <div class="header">
      <h3 class="title">
        <span :class="['title_icon','iconfont',iconame]"></span>
        {{title}}
      </h3>
      <router-link :to="to">
        <span class="more" v-if="more">更多</span>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  //传递参数 title String类型 表示标题的内容
  //more Boolean类型 表示是否 显示更多这两个字
  //to String类型 表示路由地址
  props: {
    title: String,
    more: {
      type: Boolean,
      default: true
    },
    to: {
      type: String,
      default: "/home"
    },
    iconame:String
  }
};
</script>
<style lang="scss">
.title-box {
  .header {
    position: relative;
    .title {
      text-align: center;
      font-size: 0.8rem;
      line-height: 1.3125rem;
      font-weight: 700;
      .icon-liuhang {
        font-size: 0.75rem;
      }
    }
    .more {
      position: absolute;
      right: 0;
      top: 0.125rem;
      margin-right: 0.625rem;
      color: #888;
      line-height: 1.3125rem;
      font-size: 0.5rem;
    }
  }
}
</style>