<template>
  <div class="findbodan-container">
    <div class="findbodan-box">
      <div class="card_box">
        <ul class="card_box-ul">
          <li class="card_box_item">
            <img
              src="https://ossimg.xinli001.com/20191008/d0b726391f0efdc658c73779f7dbf78b.jpg!80"
              alt
            />
            <span class="bofang iconfont icon-icon-test19"></span>
            <span class="bofang_num">1.3w</span>
          </li>
          <li class="card_box_item">
            <img
              src="https://ossimg.xinli001.com/20191008/d0b726391f0efdc658c73779f7dbf78b.jpg!80"
              alt
            />
            <span class="bofang iconfont icon-icon-test19"></span>
            <span class="bofang_num">1.3w</span>
          </li>
          <li class="card_box_item">
            <img
              src="https://ossimg.xinli001.com/20191008/d0b726391f0efdc658c73779f7dbf78b.jpg!80"
              alt
            />
            <span class="bofang iconfont icon-icon-test19"></span>
            <span class="bofang_num">1.3w</span>
          </li>
          <li class="card_box_item">
            <img
              src="https://ossimg.xinli001.com/20191008/d0b726391f0efdc658c73779f7dbf78b.jpg!80"
              alt
            />
            <span class="bofang iconfont icon-icon-test19"></span>
            <span class="bofang_num">1.3w</span>
          </li>
          <li class="card_box_item">
            <img
              src="https://ossimg.xinli001.com/20191008/d0b726391f0efdc658c73779f7dbf78b.jpg!80"
              alt
            />
            <span class="bofang iconfont icon-icon-test19"></span>
            <span class="bofang_num">1.3w</span>
          </li>
          <li class="card_box_item">
            <img
              src="https://ossimg.xinli001.com/20191008/d0b726391f0efdc658c73779f7dbf78b.jpg!80"
              alt
            />
            <span class="bofang iconfont icon-icon-test19"></span>
            <span class="bofang_num">1.3w</span>
          </li>
          <li class="card_box_item">
            <img
              src="https://ossimg.xinli001.com/20191008/d0b726391f0efdc658c73779f7dbf78b.jpg!80"
              alt
            />
            <span class="bofang iconfont icon-icon-test19"></span>
            <span class="bofang_num">1.3w</span>
          </li>
          <li class="card_box_item">
            <img
              src="https://ossimg.xinli001.com/20191008/d0b726391f0efdc658c73779f7dbf78b.jpg!80"
              alt
            />
            <span class="bofang iconfont icon-icon-test19"></span>
            <span class="bofang_num">1.3w</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
// 精选播单等下的图片组件
export default {};
</script>

<style lang="scss" scoped>
.findbodan-container {
  .findbodan-box {
    margin-bottom: .9375rem;
    .card_box {
      .card_box-ul {
        margin-top: 0.5rem;
        white-space: nowrap;
        overflow: auto;
        &::-webkit-scrollbar {
          display: none;
        }
        .card_box_item {
          position: relative;
          overflow: hidden;
          display: inline-block;
          margin-left: 0.5rem;
          width: 5.625rem;
          height: 5.625rem;
          background-color: pink;
          img {
            height: 100%;
            width: 100%;
          }
          .bofang {
            // z-index: 9;
            position: absolute;
            left: 0.3125rem;
            bottom: 0.3125rem;
            font-size: 0.875rem;
            color: #fff;
          }
          .bofang_num {
            position: absolute;
            left: 1.25rem;
            bottom: 0.375rem;
            font-size: 0.75rem;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>