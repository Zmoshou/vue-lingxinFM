<template>
  <div class="my-container">
    <div class="user_info">
      <div class="name_box">
        <div class="user_img">
          <img
            src="https://ossimg.xinli001.com/20180821/d4c1d4e2c60633961eb50c3d2b5e0b3f.jpeg!120x120"
          />
        </div>
        <div class="info">
          <p class="u_name">
            <span>默兽</span>
            <span class="iconfont icon-icon-test61"></span>
          </p>
          <p class="sign_in">已签到8天</p>
        </div>
      </div>
      <div class="message_box">
        <span class="iconfont icon-xiaoxi"></span>
      </div>
    </div>
    <div class="my_related">
      <div class="focus_radio">
        <p>
          <span class="iconfont icon-diantai_changgui"></span>我关注的电台
        </p>
        <span class="iconfont icon-icon-test61"></span>
      </div>
      <div class="focus_list">
        <p>
          <span class="iconfont icon-wodeshoucang"></span>我关注的播单
        </p>
        <span class="iconfont icon-icon-test61"></span>
      </div>
    </div>
    <div class="program_operation">
      <div class="select_operation">
        <div class="show">
          <span>收藏节目</span>
          <span>下载节目</span>
          <span>最近播放</span>
        </div>
      </div>
      <div class="all_song">
        <span class="all_song_num">共30首</span>
        <p>
          <span class=" iconfont icon-icon-test39"></span>
          <span>多选</span>
        </p>
      </div>
    </div>
    <div class="next">
      
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.my-container {
  position: relative;
  background-color: #f8f8f8;
  height: 20rem;
  .user_info {
    box-sizing: border-box;
    padding: 0 0.5rem;
    height: 3.5rem;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .name_box {
      width: 90%;
      height: 2.5rem;
      display: flex;
      .user_img {
        height: 2.5rem;
        width: 2.5rem;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .info {
        margin-left: 0.2rem;
        width: 78%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .u_name {
          font-size: 0.6rem;
          font-weight: 600;
          color: #000;
          line-height: 0.75rem;
          span {
            display: inline-block;
            margin-right: 0.3rem;
            max-width: 8.8rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 0.6rem;
          }
        }
        .sign_in {
          margin-top: 0.375rem;
          font-size: 0.5rem;
          color: #ccc;
        }
      }
    }
    .message_box {
      position: relative;
      width: 1.2rem;
      height: 2.5rem;
      span {
        width: 1.2rem;
        position: absolute;
        right: 0;
        bottom: 5%;
        font-size: 0.875rem;
        font-weight: 600;
        color: #000;
      }
    }
  }
  .my_related {
    margin: 0.6125rem 0;
    background-color: #fff;
    .focus_radio {
      height: 2rem;
      border-bottom: 1px solid #f8f8f8;
    }
    .focus_list {
      height: 2rem;
    }
    div {
      margin: 0 0.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.75rem;
      p {
        color: #000;
        font-size: 0.7rem;
        span {
          margin-right: 0.3125rem;
          font-size: 0.7rem;
        }
      }
    }
  }
  .program_operation {
    .select_operation {
      height: 2rem;
      background-color: #fff;
      .show {
        margin: 0 auto;
        height: 100%;
        width: 85%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          font-size: 0.625rem;
          color: #666;
        }
      }
    }
    .all_song {
      line-height: 1.2rem;
      padding: 0 0.5rem;
      display: flex;
      justify-content: space-between;
      color: #666;
      .all_song_num {
        font-size: 0.5rem;
      }
    }
  }
  .next {
    height: 8rem;
    background-color: #fff;
  }
}
</style>

