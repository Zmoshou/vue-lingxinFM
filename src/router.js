import VueRouter from 'vue-router'

import appCover from './componends/navbar/appCover.vue';
import login from './componends/navbar/login.vue';

import HomeContainer from './componends/navbar/home/home.vue'

import findMoreMore from './componends/navbar/find/findsub/findMoreMore.vue' //电台主播列表
import radioSpeakerDeyial from './componends/navbar/find/findsub/radioSpeakerDetial.vue' //电台主播详情页面

import category from './componends/navbar/xinliFM/category.vue' //节目分类页面
import categoryChange from './componends/navbar/xinliFM/categoryList.vue'
import communicationPart from './componends/navbar/xinliFM/communicationPart.vue' //交流社区页面
import communicationDetails from './componends/navbar/xinliFM/communicationDetails.vue' //交流社区页面
import communicationCompile from './componends/navbar/xinliFM/communicationCompile.vue' //交流社区发布页面

import comment from './componends/navbar/xinliFM/playerPageComment.vue'

import search from './componends/navbar/xinliFM/search.vue'
import bodanContent from './componends/navbar/find/findsub/boDanContent.vue'
import bodanList from './componends/navbar/find/findsub/boDanList.vue'

//-------------------------这里是自己写的一个功能测试部分tabbarSwiper
import test from './componends/my_plugin/myTabbarSwiper.vue'

// const appCover =  () => import('./componends/navbar/appCover.vue')
// 路由懒加载

const router = new VueRouter({
  routes: [{
    path: '/',
    component: appCover,
  },
  {
    path: '/home',
    name: "home",
    component: HomeContainer,
    meta: {
      keepAlive: true //需要被缓存的组件
    },
  },
  {
    path: '/find/findmore',
    name: "findMoreMore",
    component: findMoreMore
  },
  {
    path: '/find/radiospeakerdeyial/:id',
    component: radioSpeakerDeyial,
    name: "RadioSpeakerDeyial"
  },
  {
    path: '/fm/category:id',
    component: category,
    name: "category", //带有参数的重定向
    redirect: '/fm/categorylist/:id',
    children: [{
      path: '/fm/categorylist/:id',
      component: categoryChange,
      name: "categoryChange",
    }]
  },
  {
    path: '/fm/category/playerpage/comment/:id',
    component: comment,
    name: "comment"
  },
  {
    path: '/fm/find/search',
    component: search,
    name: "search"
  },
  {
    path: '/fm/communicationPart',
    component: communicationPart,
    name: "communicationPart"
  },
  {
    path: '/fm/communicationPart/communicationCompile',
    component: communicationCompile,
    name: "communicationCompile"
  },
  {
    path: '/fm/communicationPart/communicationDetails/:id',
    component: communicationDetails,
    name: "communicationDetails"
  },
  {
    path: '/login',
    component: login,
    name: "login"
  },
  {
    path: '/find/bodanlist',
    component: bodanList,
    name: "bodanList"
  },
  {
    path: '/find/bodanlist/bodancontent',
    component: bodanContent,
    name: "bodanContent"
  },
  //-------------------------这里是自己写的一个功能测试部分tabbarSwiper
  // import test from './componends/my_plugin/myTabbarSwiper.vue'
  {
    path: '/test',
    component: test,
    name: 'test'
  }
  ],
})


export default router;