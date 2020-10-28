import Vue from 'vue'
import VueRouter from 'vue-router';

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login'),
    meta: {
      title: '登录'
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
          title: '首页'
        }
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa'),
        meta: {
          title: '问答'
        }
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video'),
        meta: {
          title: '视频'
        }
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my'),
        meta: {
          title: '我的'
        }
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search')
  },
  {
    path: '/user_agreement',
    name: 'user_agreement',
    component: () => import('@/views/login/userAgreement')
  },
  {
    path: '/privacy_protection',
    name: 'privacy_protection',
    component: () => import('@/views/login/privacyProtection')
  },
  {
    path: '/login-question',
    name: 'login-question',
    component: () => import('@/views/login/loginQuestion')
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article'),
    props: true, //动态路由的参数映射到组件的props
  },
  {
    path: '/user/profile',
    name: 'user-profile',
    component: () => import('@/views/user-profile')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
})

export default router
