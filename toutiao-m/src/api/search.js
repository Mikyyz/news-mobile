/**
 * 搜索相关模块 
 */

import request from '@/utils/request';

// 搜索联想建议

export const getSearchSuggestions = q => {
    return request({
        url: '/app/v1_0/suggestion',
        params: {
            q
        }
    })
}

//获取搜索结果
export const getSearchResults = params => {
    return request({
        url: '/app/v1_0/search',
        params
    })
}

//获取用户搜索历史记录
export const getSearchHistories = () => {
    return request({
        url: '/app/v1_0/search/histories'
    })
}