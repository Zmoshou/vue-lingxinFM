<!-- The ref attr used to find the swiper instance -->
<template>
  <div class="weapper">
    <swiper v-if="swiperList.length > 1" :options="swiperOption" ref="mySwiper">
      <!-- slides -->
      <swiper-slide v-for="(item, index) in swiperList" :key="index">
        <div class="item">
          <img :src="item.cover" />
        </div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
      <!-- Optional controls -->
      <!-- 左右箭头 -->
      <!-- <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>-->
      <!-- <div class="swiper-scrollbar" slot="scrollbar"></div> -->
    </swiper>
  </div>
</template>

<script>
export default {
  name: "carrousel",
  data() {
    return {
      swiperList: [],
      swiperOption: {
        // 参数选项,显示小点
        pagination: {
          el: ".swiper-pagination"
        },
        autoplay: {
          disableOnInteraction: false,
          delay: 3000
        },
        //循环
        loop: true,
        //每张播放时长4秒，自动播放
        // autoplay: 4000,
        //滑动速度
        speed: 1000
        // delay:1000
      }
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  mounted() {
    this.swiperList = [
      {
        cover: "http://image.xinli001.com/20150322/194353ac3111b7cf31c668.jpg"
      },
      {
        cover: "http://image.xinli001.com/20141231/1555041443c25ce0d98dba.jpg"
      },
      {
        cover: "http://image.xinli001.com/20150612/1828341febfbdc67a8049d.jpg"
      },
      {
        cover:
          "https://ossimg.xinli001.com/20190729/853d9d224f48d10f9f50824ecfe5dc0a.jpg"
      },
      {
        cover:
          "http://image.xinli001.com/20150831/15315204fce39214a2b368.jpg"
      }
    ];
    // current swiper instance
    // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    // console.log("this is current swiper instance object", this.swiper);
    // this.swiper.slideTo(1, 1000, false);
  },
  created() {
    // this.getSwiperList();
  },
  methods: {
  }
};
</script>

<style lang='scss' scoped>
.weapper {
  position: relative;
  .item {
    height: 6rem;
    background-color: hotpink;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.bulletClass {
  background-color: #000;
}
.bulletActiveClass {
  background-color: #fff;
  width: 0.3125rem;
  height: 0.3125rem;
}
// 样式穿透
.weapper /deep/ .swiper-pagination-bullet {
  width: 0.4rem;
  height: 0.4rem;
  // text-align: center;
  // line-height: 20px;
  // font-size: 0.3125rem;
  border: 1px solid #fff;
  background-color: none;
}
.weapper /deep/ .swiper-pagination-bullet-active {
  color: #fff;
  background: #fff;
}
// .weapper /deep/.swiper-container {
// }
</style>