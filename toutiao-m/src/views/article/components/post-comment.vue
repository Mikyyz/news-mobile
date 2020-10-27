<template>
    <div class="post-comment">
        <van-field
            class="comment-field"
            v-model.trim="postContent"
            autosize
            type="textarea"
            maxlength="50"
            placeholder="友善是交流的起点"
            show-word-limit
            border
            @input="handleInput"
        />
        <div 
            :class="showRed ? 'post-submit red-text'  : 'post-submit'" 
            @click="onPost"
        >
            发布
        </div>
    </div>
</template>

<script>
import { addComment } from '@/api/comment';
    export default {
        data() {
            return {
                postContent: '',
                showRed: false
            }
        },
        props: {
            target: {
                type: [Number, String, Object],
                required: true 
            },
            articleId: {
                type: [Number, String, Object],
                default: null
            }
        },
        methods: {
            handleInput() {
                this.postContent ? this.showRed = true : this.showRed = false;
            },
            async onPost() {
                if(this.postContent){
                    const { data } = await addComment({
                        target: this.target.toString(),        //评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
                        content: this.postContent,  //评论内容
                        art_id: this.articleId ? this.articleId.toString() : null     //文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
                    });
                    const { new_obj } = data.data;
                    this.$emit('post-success', new_obj)
                    //清空输入框
                    this.postContent = ''
                }
            }
        },
    }
</script>

<style lang="less" scoped>
.post-comment {
    display: flex;
    justify-content: center;
    align-items: center;
    .comment-field {
        margin: 10px;
        background-color: #F5F5F5;
    }
    .post-submit {
        width: 50px;
        cursor: pointer;
        font-size: 14px;
        &.red-text {
            color: red;
        }
    }
}
</style>