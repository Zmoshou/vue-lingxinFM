<template>
  <div class="findmore-container">
    <div class="findmore-box">
      <div class="card_box">
        <ul class="card_box-ul">
          <li
            class="card_box_item"
            v-for="item in radioSpeakerList"
            :key="item.id"
            @click="getSpeakerDetial(item.id)"
            @touchmove.stop
          >
            <img class="photo" :src="item.cover" />
            <p class="nick_name">{{item.title}}</p>
            <p class="describe">{{item.user.nickname}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
// 发现电台下的电台主播的列表
export default {
  data() {
    return {
      radioSpeakerList: []
    };
  },
  created() {
    this.getFindmoreList();
  },
  methods: {
    getinfo() {
      console.log(123);
    },
    getFindmoreList() {
      this.$axios
        .get("fm/diantai-new-list.json", {
          params: {
            offset: 1,
            limit: 10,
            key: this.$store.key
          }
        })
        .then(res => {
          if (res.data.code === 0) {
            this.radioSpeakerList = res.data.data;
          }
        });
    },
    getSpeakerDetial(id) {
      this.$router.push({
        name: "RadioSpeakerDeyial",
        params: { id }
      });
    }
  }
};
</script>

<style lang="scss">
.findmore-container {
  .findmore-box {
    margin: 0 0 0.3125rem;
    height: 5.95rem;
    .card_box {
      height: 100%;
      .card_box-ul {
        margin-top: 0.5rem;
        white-space: nowrap;
        // min-height: 5.9375rem;
        height: 100%;
        // overflow: scroll;
        overflow-x: auto;
        overflow-y: hidden;
        &::-webkit-scrollbar {
          display: none;
        }
        .card_box_item {
          box-sizing: border-box;
          overflow: hidden;
          display: inline-block;
          margin-left: 0.5rem;
          width: 4.3rem;
          height: 100%;
          border: 1px solid #f8f8f8;
          border-radius: 0.3125rem;
          box-shadow: 0 0 0.1875rem #ccc;
          text-align: center;
          .photo {
            margin-top: 0.875rem;
            width: 2.1875rem;
            height: 2.1875rem;
            border-radius: 50%;
          }
          .nick_name {
            margin: 0.5rem 0;
            font-weight: 600;
            font-size: 0.5rem;
          }
          .describe {
            font-size: 0.4rem;
            color: #666;
          }
        }
      }
    }
  }
}
</style>