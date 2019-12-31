//入口文件
import Vue from 'vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter);

import Vuex from 'vuex'
Vue.use(Vuex)

//导入vant组件
import 'vant/lib/index.css';
import Vant from 'vant';
import { Lazyload, ImagePreview } from 'vant';
Vue.use(Lazyload, ImagePreview);
Vue.use(Vant);

//swiper插件
import VueAwesomeSwiper from 'vue-awesome-swiper'
// require styles
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)

//使用axios
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.prototype.$axios = axios //全局注册，使用方法为:this.$axios
// Vue.prototype.$qs = qs
// axios.defaults.timeout = 8000; //响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'; //配置请求头
axios.defaults.baseURL = 'http://yiapi.xinli001.com'; //配置接口地址http://yiapi.xinli001.com  /api
Vue.use(VueAxios, axios);

import app from './App.vue'
import cssinit from './css/reset.css'; //初始化样式
//import rem from './css/common.css'; // 媒体查询适配
import alifontscc from './lib/ali-font-icon/iconfont.css' //阿里字体
import './js/rem.js';//媒体查询适配

// 路由文件加载
import router from './router.js'

//vuex加载store
import vuestore from './store.js'

//注册全局过滤器
import * as filters from './filters.js'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

const vm = new Vue({
  el: '#app',
  data() {
    return {}
  },
  methods: {},
  render(h) {
    return h(app)
  },
  router: router, //挂载路由对象
  store: vuestore //状态管理对象
})