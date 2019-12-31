<template>
  <div class="login-container">
    <div class="top_box">
      <!-- <span class="back iconfont icon-jiantou-px-"></span> -->
      <p class="tltle">聆心FM</p>
      <ul class="square">
        <li class="square_item"></li>
        <li class="square_item"></li>
        <li class="square_item"></li>
        <li class="square_item"></li>
        <li class="square_item"></li>
      </ul>
      <ul class="circle">
        <li class="circle_item"></li>
        <li class="circle_item"></li>
        <li class="circle_item"></li>
        <li class="circle_item"></li>
        <li class="circle_item"></li>
      </ul>
    </div>
    <div class="login_message_box">
      <div class="login_message_tltle">
        <span :class="['fast_login',{'font_color':selectIndex == 0}]" @click="changPage(0)">快速注册-登录</span>
        <span :class="['tel_num',{'font_color':selectIndex == 1}]" @click="changPage(1)">输入手机号</span>
        <span :class="['line',{'line_left':selectIndex == 0},{'line_right':selectIndex == 1}] "></span>
      </div>
    </div>
    <div class="main_box">
      <van-swipe @change="onChange" ref="vanSwiper" :loop="false" :show-indicators="false">
        <van-swipe-item>
          <div class="fast_login_content">
            <div class="fast_login_top">
              <div class="tel_input_box">
                <input
                  class="tel_input"
                  type="tel"
                  maxlength="11"
                  placeholder="输入手机号"
                  v-model="registerForm.telnum"
                />
              </div>
              <div class="security_code_box">
                <input
                  class="security_code"
                  type="number"
                  maxlength="4"
                  placeholder="输入验证码"
                  v-model="registerForm.safeCode"
                />
                <button class="resent" @click="getSafeCode" v-if="sendCode">获取验证码</button>
                <button class="resent" style="color:#ccc" v-else disabled="disabled">重新发送({{time}})</button>
              </div>
              <div class="agree_box">
                <input class="agree_checkbox" type="checkbox" v-model="registerForm.agree" />
                <a>同意《聆心FM用户注册》</a>
              </div>
              <button
                :class="['longin_btn',{'longin_btn_true':cnaRegister}]"
                @click="postRegister"
              >快捷注册-登录</button>
            </div>
          </div>
        </van-swipe-item>
        <van-swipe-item>
          <div class="tel_num_content">
            <div class="fast_login_top">
              <div class="tel_input_box">
                <input
                  class="tel_input"
                  type="search"
                  placeholder="输入手机号/邮箱"
                  v-model="loginForm.telnum"
                />
              </div>
              <div class="security_code_box">
                <input
                  class="security_code password"
                  type="password"
                  placeholder="输入密码"
                  v-model="loginForm.password"
                />
              </div>
              <div class="agree_box">
                <input class="agree_checkbox" type="checkbox" v-model="loginForm.agree" />
                <a>同意《聆心FM用户注册》</a>
              </div>
              <button :class="['longin_btn',{'longin_btn_true':canLogin}]" @click="postLogin">登录</button>
            </div>
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectIndex: 0, //注册还是登录页面的索引
      shtylrWidth: "38%", //下划线宽度
      registerForm: {
        telnum: "",
        safeCode: "",
        agree: true
      },
      loginForm: {
        telnum: "",
        password: "",
        agree: true
      },
      cnaRegister: false,
      canLogin: false,
      ranNum: 0,
      sendCode: true,
      time: 60
    };
  },
  watch: {
    loginForm: {
      handler(newVal, oldVal) {
        if (
          newVal.telnum.trim() != "" &&
          newVal.password.trim() != "" &&
          newVal.agree
        ) {
          this.canLogin = true;
        } else {
          this.canLogin = false;
        }
      },
      deep: true
    },
    registerForm: {
      handler(newVal, oldVal) {
        if (
          newVal.telnum.trim() != "" &&
          newVal.safeCode.trim() != "" &&
          newVal.agree
        ) {
          this.cnaRegister = true;
        } else {
          this.cnaRegister = false;
        }
      },
      deep: true
    }
  },
  methods: {
    //获取验证码
    getSafeCode() {
      let pattern = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
      if (pattern.test(this.registerForm.telnum) == false) {
        return this.$toast("请输入正确的手机号");
      }
      this.ranNum = parseInt(Math.random() * (9999 - 1000) + 1000);
      this.$toast("验证码:" + this.ranNum);
      this.sendCode = false;
      let timer = setInterval(() => {
        this.time--;
        if (this.time <= 0) {
          clearInterval(timer);
          this.time = 60;
          this.sendCode = true;
        }
      }, 1000);
    },
    //注册用户 额 接口用不了了啊
    postRegister() {
      if (this.cnaRegister) {
        this.checkTel(this.registerForm.telnum);
        this.checkSafeCode(this.registerForm.safeCode);
        if (this.ranNum == 0) {
          return this.$toast("手机号或验证码不正确");
        }
        if (this.ranNum == this.registerForm.safeCode) {
          this.$router.push("/home");
          this.$store.commit("setFooterShow", true);
          this.$toast("登录成功");
          return;
        } else {
          return this.$toast("手机号或验证码不正确");
        }
      }
    },
    postLogin() {
      //接口不能用 自己模拟了
      //http://bapi.xinli001.com/users/get_token.json/
      // this.$axios
      //   .post("users/get_token.json/", {
      //     password: "fam199609251314",
      //     username: 13275551585,
      //     key: "046b6a2a43dc6ff6e770255f57328f89"
      //   })
      //   .then(res => {
      //     console.log(res);
      //   })
      //   .catch(err => {
      //     console.error(err);
      //   });
      console.log("帐号13275551585");
      console.log("密码123456");
      if (this.canLogin) {
        let pattern = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
        if (pattern.test(this.loginForm.telnum) == false) {
          return this.$toast("请输入正确的手机号");
        }
        if (
          this.loginForm.telnum == "13275551585" &&
          this.loginForm.password == "123456"
        ) {
          this.$router.push("/home");
          this.$store.commit("setFooterShow", true);
          this.$toast("登录成功");
          return;
        } else {
          return this.$toast("手机号或密码不正确");
        }
      }
    },
    //校验电话号
    checkTel(phone) {
      let pattern = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
      if (pattern.test(phone) == false) {
        return this.$toast("手机号格式有误");
      }
    },
    checkSafeCode(safeCode) {
      let pattern = /^[0-9]{6}$/;
      if (pattern.test(safeCode) == false) {
        return this.$toast("验证码有误");
      }
    },
    onChange(index) {
      this.selectIndex = index;
    },
    changPage(num) {
      this.selectIndex = num;
      this.$refs.vanSwiper.swipeTo(num);
    }
  }
};
</script>

<style lang="scss" scoped>
.top_box {
  //这里写一点动画效果
  background: linear-gradient(#fa7963, #e68a88);
  ul li {
    position: absolute;
    border: 1px solid #fff;
    background-color: #fff;
    width: 1rem;
    height: 1rem;
    opacity: 0;
  }
  .square_item {
    top: 5%;
    left: 10%;
    animation: square 8s linear infinite;
    &:nth-child(2) {
      top: 50%;
      left: 45%;
      animation-delay: 1s;
    }
    &:nth-child(3) {
      top: 70%;
      left: 15%;
      animation-delay: 2s;
    }
    &:nth-child(4) {
      top: 60%;
      left: 75%;
      animation-delay: 3s;
    }
    &:nth-child(5) {
      top: 12%;
      left: 80%;
      animation-delay: 4s;
    }
    @keyframes square {
      0% {
        transform: scale(0) rotateY(0deg);
        opacity: 1;
      }
      100% {
        transform: scale(2) rotateY(1000deg);
        border-radius: 10px;
        opacity: 0;
      }
    }
  }
  .circle_item {
    bottom: 0;
    left: 5%;
    animation: circle 10s linear infinite;
    &:nth-child(2) {
      left: 25%;
      animation-delay: 5s;
    }
    &:nth-child(3) {
      left: 45%;
      animation-delay: 1s;
    }
    &:nth-child(4) {
      left: 65%;
      animation-delay: 4.2s;
    }
    &:nth-child(5) {
      left: 85%;
      animation-delay: 2.5s;
    }
    @keyframes circle {
      0% {
        transform: scale(0) rotate(0deg);
        opacity: 1;
        bottom: 0;
        border-radius: 0;
      }

      100% {
        transform: scale(2.5) rotate(1000deg);
        opacity: 0;
        bottom: 90%;
        border-radius: 50%;
      }
    }
  }
}
.login-container {
  height: 100%;
  .top_box {
    height: 27%;
    margin-bottom: 0.5rem;
    position: relative;
    .tltle {
      z-index: 1;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 0.75rem;
      color: #fff;
      letter-spacing: 2px;
    }
    .back {
      position: absolute;
      top: 5%;
      left: 2%;
      width: 1rem;
      height: 1rem;
      font-size: 0.875rem;
      color: black;
    }
  }
  .login_message_box {
    .login_message_tltle {
      height: 1rem;
      width: 70%;
      margin: 0 auto;
      position: relative;
      .fast_login {
        position: absolute;
        left: 0;
        top: 0;
        color: #ccc;
        font-size: 0.65rem;
      }
      .tel_num {
        position: absolute;
        right: 0;
        top: 0;
        color: #ccc;
        font-size: 0.65rem;
      }
      .font_color {
        color: #fa7963;
      }
      .line {
        position: absolute;
        background-color: #fa7963;
        bottom: 0;
        height: 2px;
        // width: 38%;
        transition: all 0.5s;
      }
      .line_left {
        width: 38%;
        left: 0%;
      }
      .line_right {
        width: 35%;
        left: 68%;
        // right: 0%;
      }
    }
  }

  .main_box {
    height: 66%;
    .van-swipe {
      height: 100%;
    }
    .fast_login_content,
    .tel_num_content {
      padding: 0 0.325rem;
      margin-top: 1.5rem;
    }
    .fast_login_content,
    .tel_num_content {
      input {
        padding: 0.55rem 0;
        font-size: 0.5rem;
        color: #000;
        &::-webkit-input-placeholder {
          color: #aab2bd; /* placeholder颜色  */
          font-size: 0.5rem; /* placeholder字体大小  */
        }
      }
      .tel_input_box,
      .security_code_box {
        border-bottom: 1px solid #ccc;
        .resent {
          background-color: #fff;
          display: inline-block;
          line-height: 0.825rem;
          font-size: 0.55rem;
          color: #fa7963;
          padding-left: 0.65rem;
          border-left: 1px solid #ccc;
        }
      }
      .tel_input {
        width: 100%;
      }
      .security_code {
        width: 70%;
      }
      .password {
        width: 100%;
      }
      .agree_box {
        margin-top: 0.75rem;
        .agree_checkbox {
          height: 0.58rem;
          width: 0.58;
          border-radius: 2px;
        }
      }
      .longin_btn {
        margin-top: 1.5rem;
        width: 100%;
        height: 1.75rem;
        background-color: #e68a88;
        // background-color: #fa7963;
        font-size: 0.65rem;
        font-weight: 700;
        color: #fff;
        border-radius: 2px;
        letter-spacing: 2px;
        transition: background-color 0.5s;
      }
      .longin_btn_true {
        background-color: #fa7963;
      }
    }
  }
}
</style>