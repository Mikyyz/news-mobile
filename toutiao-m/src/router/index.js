import Vue from 'vue'
import VueRouter from 'vue-router';
import store from '@/store';
import { Dialog } from 'vant'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login'),
    meta: {
      title: '登录',
      requiresAuth: false
    }
  },
  {
    path: '/',
    component: () => import('@/views/layout'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/home'),
        meta: {
          title: '首页',
          requiresAuth: false
        }
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa'),
        meta: {
          title: '问答',
          requiresAuth: false
        }
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video'),
        meta: {
          title: '视频',
          requiresAuth: false
        }
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my'),
        meta: {
          title: '我的',
          requiresAuth: false
        }
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search'),
    meta: { requiresAuth: false }
  },
  {
    path: '/user_agreement',
    name: 'user_agreement',
    component: () => import('@/views/login/userAgreement'),
    meta: { requiresAuth: false }
  },
  {
    path: '/privacy_protection',
    name: 'privacy_protection',
    component: () => import('@/views/login/privacyProtection'),
    meta: { requiresAuth: false }
  },
  {
    path: '/login-question',
    name: 'login-question',
    component: () => import('@/views/login/loginQuestion'),
    meta: { requiresAuth: false }
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article'),
    props: true, //动态路由的参数映射到组件的props,
    meta: { requiresAuth: false }
  },
  {
    path: '/user/profile',
    name: 'user-profile',
    component: () => import('@/views/user-profile'),
    meta: { requiresAuth: false }
  },
  {
    path: '/user/chat',
    name: 'user-chat',
    component: () => import('@/views/user-chat'),
    meta: { requiresAuth: true }
  },
  {
    path: '/user/message',
    name: 'user-message',
    component: () => import('@/views/message'),
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  //动态设置title
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  //如果需要登录
  if (to.meta.requiresAuth) {
    //如果已经登录
    if (store.state.user) {
      return next();
    }

    Dialog.confirm({
      message: '该页面需要登录才能访问,确认登录吗?',
      width: '250'
    })
      .then(() => {
        router.replace({
          name: 'login',
          query: {
            redirect: router.currentRoute.fullPath
          }
        })
      })
      .catch(() => {
        //取消执行，中断路由导航
        next(false);
      });
  } else {
    //不需要登录的页面直接跳过
    next();
  }
})

export default router
