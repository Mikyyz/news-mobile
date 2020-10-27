/**
 * 评论相关模块 
 */

import request from '@/utils/request';

// 获取评论列表

export const getCommentList = params => {
    return request({
        url: '/app/v1_0/comments',
        params
    })
}
//对评论或评论回复点赞

export const addCommentLike = target => {
    return request({
        url: '/app/v1_0/comment/likings',
        method: 'POST',
        data: {
            target
        }
    })
}

//取消对评论或评论回复点赞

export const cancelCommentLike = commentId => {
    return request({
        url: `/app/v1_0/comment/likings/${commentId}`,
        method: 'DELETE'
    })
}

//添加评论或评论回复

export const addComment = data => {
    return request({
        url: '/app/v1_0/comments',
        method: 'POST',
        data
    })
}