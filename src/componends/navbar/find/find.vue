<template>
  <div class="find-container">
    <div class="category">
      <ul class="category_box">
        <li class="category_item" @click="toCategory(1)">
          <a href="#">
            <p class="icon iconfont icon-icon_dingtalk_line"></p>
            <p class="name">自我成长</p>
          </a>
        </li>
        <li class="category_item" @click="toCategory(2)">
          <a href="#">
            <p class="icon iconfont icon-qingxuqinggan"></p>
            <p class="name">情绪管理</p>
          </a>
        </li>
        <li class="category_item" @click="toCategory(3)">
          <a href="#">
            <p class="icon iconfont icon-renjiguanxi"></p>
            <p class="name">人际沟通</p>
          </a>
        </li>
        <li class="category_item" @click="toCategory(4)">
          <a href="#">
            <p class="icon iconfont icon-hunyinzhuangkuang"></p>
            <p class="name">恋爱婚姻</p>
          </a>
        </li>
        <li class="category_item" @click="toCategory(5)">
          <a href="#">
            <p class="icon iconfont icon-zhichang1"></p>
            <p class="name">职场管理</p>
          </a>
        </li>
        <li class="category_item" @click="toCategory(6)">
          <a href="#">
            <p class="icon iconfont icon-qinzi"></p>
            <p class="name">亲自家庭</p>
          </a>
        </li>
        <li class="category_item" @click="toCategory(7)">
          <a href="#">
            <p class="icon iconfont icon-ziyuan1"></p>
            <p class="name">心里科普</p>
          </a>
        </li>
        <li class="category_item" @click="toCategory(8)">
          <a href="#">
            <p class="icon iconfont icon-jiangzuo"></p>
            <p class="name">课程讲座</p>
          </a>
        </li>
      </ul>
    </div>
    <listTitle :title="'发现电台'" to="/find/findmore"></listTitle>
    <findmore></findmore>
    <listTitle :title="'精选播单'"></listTitle>
    <findbodan></findbodan>
    <listTitle :title="'心理学专区'"></listTitle>
    <findbodan></findbodan>
    <listTitle :title="'晚安时刻'"></listTitle>
    <findbodan></findbodan>
  </div>
</template>

<script>
// import appheader from "../../subcomponends/header.vue"
import listTitle from "../../subcomponends/listTitle.vue";
import findmore from "../../subcomponends/findMore.vue";
import findbodan from "../../subcomponends/findBodan.vue";
export default {
  components: {
    findmore,
    listTitle,
    findbodan
  },
  methods: {
    toCategory(id) {
      this.$router.push({
        name: "category",
        params: { id }
      });
    },
    // getJingXuanBoDan(){
    //   this.$axios.get("fm2/hot_tag_list.json", {
    //     params: {
    //       flag: 4,
    //       offset:1,
    //       rows:0,
    //       key:this.$store.state.key,
    //       key:this.$store.state.key,
    //     }
    //   })
    //   .then(res => {
    //     console.log(res.data.data);
    //   })
    // }
  }
};
</script>

<style lang="scss" scoped>
.find-container {
  .category {
    margin: 0.5rem;
  }
  .category_box {
    // margin: 0.03125rem 0 ;
    height: 6.875rem;
    border: 1px solid #f8f8f8;
    border-radius: 0.3125rem;
    box-shadow: 0 0 0.1875rem #ccc;
    display: flex;
    flex-wrap: wrap;
    .category_item {
      flex: 25%;
      display: flex;
      justify-content: center;
      align-items: center;

      .icon {
        color: #000;
        text-align: center;
        font-size: 1rem;
      }

      .name {
        margin-top: 0.5rem;
        font-size: 0.5rem;
        color: #000;
      }
    }
  }
}
</style>