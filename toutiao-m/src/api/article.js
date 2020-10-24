import request from '@/utils/request';

//文章列表

// 请求文章列表
export const getArticles = params => {
    return request({
        method: 'GET',
        url: '/app/v1_1/articles',
        params
    })
}

//获取文章详情
export const getArticleDeatail = articleId => {
    return request({
        url: `/app/v1_0/articles/${articleId}`
    })
}

/**
 * 收藏文章
 */
export const articleCollection = articleId => {
    return request({
        url: '/app/v1_0/article/collections',
        method: 'POST',
        data: {
            target: articleId
        }
    })
}

/**
 * 取消收藏文章
 */
export const cancelArticleCollection = articleId => {
    return request({
        url: `/app/v1_0/article/collections/${articleId}`,
        method: 'DELETE'
    })
}

/**
 * 点赞文章
 */

export const likeArticle = articleId => {
    return request({
        url: '/app/v1_0/article/likings',
        method: 'POST',
        data: {
            target: articleId
        }
    })
}


/**
 * 取消点在文章
 */

export const dislikeArticle = articleId => {
    return request({
        url: `/app/v1_0/article/likings/${articleId}`,
        method: 'DELETE'
    })
}