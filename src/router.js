import VueRouter from 'vue-router'

import appCover from './componends/navbar/appCover.vue';

import HomeContainer from './componends/navbar/home/home.vue'
import MyContainer from './componends/navbar/my/my.vue'
import FindContainer from './componends/navbar/find/find.vue'
import XinLiFMContainer from './componends/navbar/xinliFM/fm.vue'

import findMoreMore from './componends/navbar/find/findsub/findMoreMore.vue' //电台主播列表
import radioSpeakerDeyial from './componends/navbar/find/findsub/radioSpeakerDetial.vue' //电台主播详情页面

import category from './componends/navbar/xinliFM/category.vue' //节目分类页面
import categoryChange from './componends/navbar/xinliFM/categoryList.vue'

import playerPage from './componends/navbar/xinliFM/playerPage.vue'
import comment from './componends/navbar/xinliFM/playerPageComment.vue'

import search from './componends/navbar/xinliFM/search.vue'

const router = new VueRouter({
  routes: [{
      path: '/',
      component: appCover,
    },
    {
      path: '/home',
      component: HomeContainer,
      children: [{
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: '/my',
          component: MyContainer
        },
        {
          path: '/find',
          component: FindContainer
        },
        {
          path: '/fm',
          component: XinLiFMContainer
        }
      ]
    },
    {
      path: '/my',
      component: MyContainer
    },
    {
      path: '/find',
      component: FindContainer
    },
    //find页面下的路由
    {
      path: '/find/findmore',
      name: "findMoreMore",
      component: findMoreMore,
      meta: {
        keepAlive: true //需要被缓存的组件
      },
      // beforeEnter: (radioSpeakerDeyial, findMoreMore, next) => {
      //   // ...
      //   window.scroll(10, 0);
      // }
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
      path: '/fm/category/playerpage/:id',
      component: playerPage,
      name: "playerPage"
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
    }
  ],
  linkActiveClass: 'router-link-active'
})
// 全局路由守卫
// router.beforeEach((to, from, next) => {
//   // to: Route: 即将要进入的目标 路由对象
//   // from: Route: 当前导航正要离开的路由
//   // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
//   // A跳转到B，B页面停留在A页面的滚动位置；解决方法：将scrollTop设置为0
//   window.scroll(0, 0);
//   // nextRoute: 设置需要路由守卫的路由集合
//   const nextRoute = ['home', 'good-list', 'good-detail', 'cart', 'profile'];
//   let isLogin = global.isLogin;  // 是否登录
//   // 未登录状态；当路由到nextRoute指定页时，跳转至login
//   if (nextRoute.indexOf(to.name) >= 0) {  
//     if (!isLogin) {
//       console.log('what fuck');
//       router.push({ name: 'login' })
//     }
//   }
//   // 已登录状态；当路由到login时，跳转至home 
//   if (to.name === 'login') {
//     if (isLogin) {
//       router.push({ name: 'home' });
//     }
//   }
//   next();
// });


export default router;