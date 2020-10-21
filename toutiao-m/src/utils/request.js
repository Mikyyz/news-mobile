//请求模块

import axios from 'axios';

import store from '@/store';

const BASE_URL = ' http://ttapi.research.itcast.cn/';

const request = axios.create({
    baseURL: BASE_URL,
    method: 'GET'
});

// 添加请求拦截器
request.interceptors.request.use(function (config) {
    const { user } = store.state;
    if (user) {
        config.headers.Authorization = `Bearer ${user.token}`
    }
    //处理完成后一定要返回config,否则请求就会停留在这里
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});


// 响应拦截器
export default request;