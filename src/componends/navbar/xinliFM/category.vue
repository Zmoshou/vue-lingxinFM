<template>
  <div class="category-contaniner">
    <header>
      <span class="set-box">
        <a href="javascript:;" class="iconfont icon-jiantou-px-" @click.prevent="back" style="width:2rem"></a>
      </span>
      <div class="nvabar">分类话题</div>
      <span class="serch-box"></span>
    </header>
    <div class="mian-content">
      <van-tabs
        @change="tocategoryChange(num)"
        swipeable
        background="#f2f6f9"
        line-width="2.4rem"
        title-active-color="#fa7963"
        color="#fa7963"
        v-model="num"
        animated
      >
        <van-tab v-for="(item,index) in categoryList" :key="index" :title="item.name">
          <div class="item">
            <router-view></router-view>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categoryList: [],
      categoryContentList: [],
      num: this.$route.params.id - 1
    };
  },
  created() {
    this.getCategoryList();
  },
  methods: {
    getCategoryList() {
      this.$axios
        .get("fm/home-list.json", {
          params: {
            key: this.$store.state.key
          }
        })
        .then(res => {
          if (res.data.code === 0) {
            this.categoryList = res.data.data.category;
          }
        });
    },
    tocategoryChange(num) {
      this.$router.push({
        name: "categoryChange",
        params: { id: num + 1 }
      });
    },
    back() {
      this.$router.push("/home");
    }
  }
};
</script>

<style lang="scss" scoped>
.category-contaniner {
  box-sizing: border-box;
  padding: 2.2rem 0;
  position: relative;
  height: 100%;
  overflow: hidden;
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
    }

    .nvabar-my,
    .nvabar-xinli_fm,
    .nvabar-find {
      color: #000;
    }

    .router-link-active {
      color: red;
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
  .mian-content {
    .van-list {
      padding-bottom: 2.2rem;
    }
  }
}
.item {
  overflow-y: auto;
  height: 25rem;
}
</style>

<style lang="scss">
// 修改vant样式
.van-tabs--line .van-tabs__wrap {
  //tab栏 外面最大盒子
  height: 1.8rem;
}
.van-tab {
  //tab栏的子元素
  line-height: 1.8rem;
  font-size: 0.625rem;
}
.van-tabs__line {
  height: 0.18rem;
}
</style>
