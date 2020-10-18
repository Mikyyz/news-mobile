/**
 * 用户登录权限控制
 */
// import store from 'store'
// import router from './router';
// import NProgress from 'nprogress'; // Progress 进度条
// import 'nprogress/nprogress.css';  // Progress 进度条样式


// const USER_TOKEN = 'toutiao-user';

// router.beforeEach((to, from, next) => {
//     NProgress.start(); // 开启Progress
//     if (store.get(USER_TOKEN)) {
//         next();
//     } else {
//         if (to.path === "/login") {
//             next();
//         } else {
//             next('/login');
//         }
//         NProgress.done();
//     }
//     router.afterEach(() => {
//         NProgress.done();
//     })
// })