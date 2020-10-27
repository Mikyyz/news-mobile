<template>
    <div class="comment-item">
        <van-cell :border="false">
            <van-image 
                class="avatar"
                slot="icon"
                fit="cover" 
                round
                :src="comment.aut_photo" 
            />
            <div slot="title">
                <div class="title-wrap">
                    <div class="name">
                        {{ comment.aut_name }}
                        <van-tag 
                            v-show="commentType === 'reply-comment'" 
                            color="#E3F2FD" 
                            text-color="#1E88E5"
                            >
                                楼主
                            </van-tag>
                    </div>
                    <div class="like-wrap" @click="onCommentLike" v-if="commentType == 'article-comment'">
                        <van-icon 
                            :color="comment.is_liking ? 'red' : ''"
                            :name="comment.is_liking ? 'good-job' : 'good-job-o'" 
                        />
                        <span>{{comment.like_count > 0 ? comment.like_count : '赞'}}</span>
                    </div>
                    <div v-else class="follow">关注</div>
                </div>
                <div class="content-wrap">
                    <div class="content">
                        {{ comment.content }}
                    </div>
                </div>
                <div>
                    <span class="pubdate">{{comment.pubdate | datetime('YYYY-MM-DD HH:mm')}}</span>
                    <van-button round size="mini" class="reply-btn" @click="$emit('on-reply', comment)" v-if="commentType == 'article-comment'">
                        {{ comment.reply_count > 0 ? comment.reply_count : null }} 回复
                    </van-button>
                </div>
                <div v-if="commentType !== 'article-comment'" class="reply-like-wrap">
                    <span>{{comment.like_count}}人赞过</span>
                    <div class="like-wrap" @click="onCommentLike">
                        <van-icon 
                            :color="comment.is_liking ? 'red' : ''"
                            :name="comment.is_liking ? 'good-job' : 'good-job-o'" 
                        />
                        <span>{{comment.like_count > 0 ? comment.like_count : '赞'}}</span>
                    </div>
                </div>
            </div>
        </van-cell>
    </div>
</template>

<script>
import {addCommentLike, cancelCommentLike} from '@/api/comment'
    export default {
        data() {
            return {
                showAll: false
            }
        },
        props: {
            comment: {
                type: Object,
                require: true 
            },
            commentType: {
                type: String,
                default: 'article-comment',
                require: true
            }
        },
        methods: {
            async onCommentLike() {
                const commentId = this.comment.com_id.toString();
                
                if(this.comment.is_liking) {
                    //如果已经点赞，则取消点在
                    await cancelCommentLike(commentId)
                    this.comment.like_count -= 1;
                } else {
                    //如果没有点赞则增加点赞
                    await addCommentLike(commentId)
                    this.comment.like_count += 1;
                }
                this.comment.is_liking = !this.comment.is_liking;
                
            },
            onReplyPopupShow() {

            }
        },
    }
</script>

<style lang="less" scoped>
.comment-item {
    .avatar {
        width: 36px;
        height: 36px;
        margin-right: 13px;
    }
    .title-wrap {
        display: flex;
        justify-content: space-between;
        .follow {
            color:#ff1744;
        }
    }
    .content-wrap {
        position: relative;
    }
    .show-all-wrap {
        position: absolute;
        right: 4px;
        bottom: 0;
        background-color: #fff;
    }
    .show-all {
        color:  #406599;
        font-weight: 600;
    }
    .name {
        font-size: 14px;
        color: #406599;
    }
    .content {
        font-size: 16px;
        color: #222;
        line-height: 1.5;
    }
    .pubdate {
        font-size: 10px;
        margin-right: 13px;
    }
    .reply-btn {
        padding: 4px 10px;
    }
    .like-wrap {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .reply-like-wrap {
        display: flex;
        justify-content: space-between;
    }
}
</style>