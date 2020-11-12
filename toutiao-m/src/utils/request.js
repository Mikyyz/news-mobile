//请求模块

import axios from 'axios';
import { Toast } from 'vant'

import store from '@/store';
import JSONbig from 'json-bigint';
import router from '../router';


const BASE_URL = ' http://ttapi.research.itcast.cn/';

//刷新用户token请求函数
const refreshTokenReq = axios.create({
    baseURL: 'http://ttapi.research.itcast.cn/'
})

const request = axios.create({
    baseURL: BASE_URL,
    method: 'GET',
    transformResponse: [function (data) {
        try {
            return JSONbig.parse(data);
        } catch (err) {   
            return data;
        }
    }]
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
request.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
}, async function (error) {
    //请求响应失败进入这里
    //超过2xx的都会进到这里
        const status = error.response.status;
        if (status === 400) {
            //客户端请求参数错误
            Toast.fail('客户端请求参数错误')
        } else if (status === 401) {
            //token无效
            //如果没有user或者user.token直接去登录
            const { user } = store.state;
            if (!user || !user.token) {
                //直接跳转到登录页面
                return redirectLogin();
            }

            //使用refresh_token请求获取新的token
            try {
                const { data } = await refreshTokenReq({
                    method: 'PUT',
                    url: '/app/v1_0/authorizations',
                    headers: {
                        Authorization: `Bearer ${user.refresh_token}`
                    }
                })

                //拿到新的token后把它更新到容器中
                user.token = data.data.token;
                store.commit('setUser', user)
                //把失败的请求发出去,error.config是本次请求的相关配置信息对象
                return request(error.config)
            } catch (error) {
                //刷新token都失败了就直接跳转到登录页
                redirectLogin()
            }
        } else if (status === 403) {
            //没有权限操作
            Toast.fail('没有权限操作')
        } else if (status >= 500) {
            //服务端异常
            Toast.fail('服务端异常')
        }
    return Promise.reject(error);
});

//跳转到登录页
function redirectLogin() {
    router.replace({
        name: 'login',
        query: {
            //数据名是自己起的,router.currentRoute和我们在组件中使用this.$router是一个东西
            redirect: router.currentRoute.fullPath
        }
    });
}
export default request;

const a = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MDUwNzI4NjMsInVzZXJfaWQiOjEzMTE2ODgyNjQxMDQ1NDIyMDgsInJlZnJlc2giOmZhbHNlfQ.Ub3DsD9okhMqTAK4TFfbVxL4JZ3fRJEEPXf5QuTP4yA'