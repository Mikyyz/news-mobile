/**
 * 频道模块
 */

/**
 * 
 * 获取搜索频道请求模块
 */
import request from '@/utils/request';

export const getAllChannels = () => {
    return request({
        url: '/app/v1_0/channels'
    })
}

// 添加用户频道
export const addUserChannel = data => {
    return request({
        method: 'PATCH',
        url: '/app/v1_0/user/channels',
        data
    })
}

//删除用户指定的频道
export const deleteUserChannel = channelId => {
    return request({
        method: 'DELETE',
        url: `/app/v1_0/user/channels/${channelId}`
    })
}