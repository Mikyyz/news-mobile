<template>
    <div class="comment-reply">
        <div class="reply">
            <!-- 头部信息 -->
            <van-nav-bar
                :title="comment.reply_count > 0 ? `${comment.reply_count}条回复` : '暂无回复'"
            >
                <van-icon name="cross" slot="left" @click="$emit('close-popup')" />
            </van-nav-bar>
            <comment-item :comment="comment" 
                :comment-type="commentType"
            />
            <comment-list type="c" :source="comment.com_id" :list="commentList" />
        </div>
        <!-- 回复评论按钮 -->
        <div class="reply-bottom">
                <van-button class="comment-btn" round icon="edit" @click="isPostPopupShow = true">
                    <span class="text">写评论...</span>
                </van-button>
                <van-icon
                    :color="comment.is_liking ? 'red' : ''" 
                    :name="comment.is_liking  ? 'good-job' : 'good-job-o'" 
                    @click="handleLikeArticle"
                    class="icon"
                />
                <van-icon name="share-o" class="icon"/>
        </div>
        <!-- 回复评论弹出层 -->
        <van-popup v-model="isPostPopupShow" position="bottom">
            <post-comment :target="articleId" :articleId="articleId" @post-success="onPostSuccess"/>
        </van-popup>
    </div>
</template>

<script>
import { dislikeArticle, likeArticle } from '@/api/article';
import CommentItem from './comment-item';
import CommentList from './comment-list';
import PostComment from './post-comment'

    export default {
        data() {
            return {
                commentType: 'reply-comment',
                isPostPopupShow: false,
                commentList: []
            }
        },
        props: {
            comment: {
                type: Object,
                required: true
            },
            articleId: {
                type: [Number, String],
                required: true
            }
        },
        components: {
            CommentItem,
            CommentList,
            PostComment
        },
        methods: {
            async handleLikeArticle() {
                if(this.article.attitude === 1) {
                    //已经点赞文章，否则取消点赞
                    await dislikeArticle(this.articleId);
                } else {
                    //没有点赞，否则点赞文章
                    await likeArticle(this.articleId)
                }
                this.comment.is_liking = !comment.is_liking;
            },
            onPostSuccess(comment) {
                if(this.isPostPopupShow) {
                    //关闭回复评论层
                    this.isPostPopupShow = false;

                    //将发布的评论添加到评论列表顶部
                    this.commentList.unshift(comment);
                    
                    //更新评论数量
                    this.comment.reply_count++;
                }
            }
        },
    }
</script>

<style lang="less" scoped>
.reply {
    margin-bottom: 40px;
}
.reply-bottom {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color:#FAFAFA;
    position: fixed;
    bottom: 0;
    .icon {
        font-size: 24px;
    }
    .comment-btn {
        width: 70%;
        height: 30px;
        border: none;
        background-color: #EEEEEE;
        .text {
            color: #212121;
            font-size: 13px;
        }
    }
    .van-icon-comment-o {
        margin-top: 4px;
    }
}
</style>