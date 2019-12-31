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
            <p class="name">亲子家庭</p>
          </a>
        </li>
        <li class="category_item" @click="toCategory(7)">
          <a href="#">
            <p class="icon iconfont icon-ziyuan1"></p>
            <p class="name">心理科普</p>
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
    <listTitle :title="'精选播单'" to="/find/bodanlist"></listTitle>
    <findbodan :bodanList="choicenessBodanList"></findbodan>
    <listTitle :title="'心理学专区'" to="/find/bodanlist"></listTitle>
    <findbodan :bodanList="psychologyBodanList"></findbodan>
    <listTitle :title="'晚安时刻'" to="/find/bodanlist"></listTitle>
    <findbodan :bodanList="goodnightBodanList"></findbodan>
  </div>
</template>

<script>
// import appheader from "../../subcomponends/header.vue"
import listTitle from "../../subcomponends/listTitle.vue";
import findmore from "../../subcomponends/findMore.vue";
import findbodan from "../../subcomponends/findBodan.vue";

export default {
  data() {
    return {
      //接口不够手动来凑
      choicenessBodanList: [
        {
          name: "纱朵",
          title: "纱朵,动听的声音和动人的故事",
          num: "3038.5万",
          cover:
            "https://ossimg.xinli001.com/20180103/a50eb2deae36ae4e60e5961cfa4695a0.jpg!120x120"
        },
        {
          name: "读书",
          title: "今天你读书了吗？",
          num: "55.6万",
          cover: "http://image.xinli001.com/20160423/131113y4tjvd628icvn3c0.jpg"
        },
        {
          name: "短诗集",
          title: "短诗集，心灵诗篇",
          num: "16万",
          cover:
            "http://ossimg.xinli001.com/20161002/597fb8826edf91949046867e4af7d62d.png"
        },
        {
          name: "朋友圈",
          title: "朋友圈，不一样的生活之地",
          num: "76.4万",
          cover:
            "https://ossimg.xinli001.com/20191021/3872208a3ccd843b8d4c6729001b4983.png"
        },
        {
          name: "我不喜欢这世界，我只喜欢你",
          title: "我不喜欢这世界，我只喜欢你",
          num: "33.6万",
          cover: "http://image.xinli001.com/20160727/080755re5oale7pnl6so7p.jpg"
        },
        {
          name: "自然",
          title: "放飞自我，用新体会",
          num: "12.9万",
          cover:
            "http://ossimg.xinli001.com/20171023/7e636f3982aabd6f3701ee05cd0ff3ea.jpg"
        },
        {
          name: "吃苦",
          title: "苦与甜，心的体验",
          num: "10.7万",
          cover:
            "https://image.xinli001.com/20160711/152538oooqr8tmrsk6crud.jpg"
        },
        {
          name: "自由",
          title: "所追求的自由",
          num: "40.2万",
          cover: "http://image.xinli001.com/20150703/16504515ad9cc2359dc401.jpg"
        }
      ],
      goodnightBodanList: [
        {
          name: "睡不着",
          title: "睡不着,听听fm",
          num: "16.3万",
          cover: "http://image.xinli001.com/20150322/194353ac3111b7cf31c668.jpg"
        },
        {
          name: "晚安情书",
          title: "晚安情书,只读给你听",
          num: "52.1万",
          cover: "http://image.xinli001.com/20150612/1828341febfbdc67a8049d.jpg"
        },
        {
          name: "晚安诗集",
          title: "晚安诗集,诗与梦同在",
          num: "29.5万",
          cover: "http://image.xinli001.com/20141108/14273638fe3d7117955690.jpg"
        },
        {
          name: "睡前故事の小王子",
          title: "睡前故事の小王子",
          num: "51.5万",
          cover: "http://image.xinli001.com/20140118/1457450a5e2bf8011bef99.jpg"
        },
        {
          name: "哄你入睡",
          title: "哄你入睡",
          num: "17.7万",
          cover:
            "http://ossimg.xinli001.com/20161123/5c056ee3e4ea55519b6e7e1148d039d1.jpg"
        },
        {
          name: "失眠",
          title: "消除深夜里的一丝不安",
          num: "39.6万",
          cover: "http://image.xinli001.com/20131121/170225c78a3452c9a57351.png"
        },
        {
          name: "睡眠",
          title: "和我一起，让睡眠轻松",
          num: "39.6万",
          cover:
            "https://ossimg.xinli001.com/visioncn/600x600/VCG41545583080.jpg"
        },
        {
          name: "深夜",
          title: "深夜中的聆心",
          num: "39.6万",
          cover:
            "https://ossimg.xinli001.com/20191025/1e7d1cf991ca1bbd38a403ade1575be6.jpg"
        }
      ],
      psychologyBodanList: [
        {
          name: "认知疗法",
          title: "认知疗法，放松心情",
          num: "15.2万",
          cover: "http://image.xinli001.com/20160222/113621ixyl0a80mvu8mv1i.jpg"
        },
        {
          name: "精神分析入门",
          title: "精神分析入门,学习心理知识",
          num: "9.3万",
          cover: "http://image.xinli001.com/20160129/091443a2dn2t03dclm21lg.jpg"
        },
        {
          name: "心理沙发客",
          title: "心理沙发客,心理与生活",
          num: "8.9万",
          cover: "http://image.xinli001.com/20140709/1210468f0222deee83fbaa.jpg"
        },
        {
          name: "心理大爆炸",
          title: "心理大爆炸，分享你的心理小故事",
          num: "11万",
          cover: "http://image.xinli001.com/20140407/205621a9efb8824bf38b13.jpg"
        },
        {
          name: "3分钟心理",
          title: "3分钟心理学，每天一个心理知识",
          num: "23.4万",
          cover:
            "https://ossimg.xinli001.com/20180511/bf92f7a76865a9b0b9dd1f0aecd66041.jpg"
        },
        {
          name: "走出抑郁",
          title: "走出抑郁，迎接生活",
          num: "20.1万",
          cover:
            "https://ossimg.xinli001.com/20190521/2c987ab0803513e2446618b8b721a95f.jpg"
        },
        {
          name: "心事博物馆",
          title: "心事博物馆，分享心里点滴",
          num: "20.1万",
          cover:
            "https://ossimg.xinli001.com/20190411/05fdb28519e8bf226d70bd5f7a053455.jpg"
        },
        {
          name: "精神分析治疗指南",
          title: "精神分析治疗指南",
          num: "12.6万",
          cover: "http://image.xinli001.com/20160129/091205oz53ehwev9ps0r8a.jpg"
        }
      ]
    };
  },
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
    }
  }
};
</script>

<style lang="scss" scoped>
.find-container {
  height: 100%;
  padding-bottom: 2.2rem;
  overflow: auto;
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