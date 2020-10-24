/**
 * 用户请求相关模块
 */

import request from '@/utils/request';


/**
 * 登录注册
 */

export const login = data => {
    return request({
        method: 'POST',
        url: '/app/v1_0/authorizations',
        data
     })
}
 
/**
 * 发送短信验证码
 */

export const sendSms = mobile => {
    return request({
        method: 'GET',
        url: `/app/v1_0/sms/codes/${mobile}`
    })
}

/**
 * 获取登录用户信息
 */
export const getCurrentUser = () => {
    return request({
        method: 'GET',
        url: `/app/v1_0/user`
    })
}

/**
 * 获取用户频道列表
 */

export const getUserChannerls = () => {
    return request({
        method: 'GET',
        url: `/app/v1_0/user/channels`
    })
}

/**
 * 关注用户
 */
export const followUser = userId => {
    return request({
        url: '/app/v1_0/user/followings',
        method: 'POST',
        data: {
            target: userId
        }
    })
}

/**
 * 取消关注用户
 */
export const unfollowUser = userId => {
    return request({
        url: `/app/v1_0/user/followings/${userId}`,
        method: 'DELETE'
    })
}

