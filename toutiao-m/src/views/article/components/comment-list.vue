<template>
    <div class="comment-list">
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
        >
            <van-cell title="全部评论" />
            <van-cell 
                v-for="(comment, index) in list" 
                :key="index"
            >
                <comment-item 
                    :comment="comment"
                    @on-reply="$emit('on-reply', $event)"
                /> 
            </van-cell>
        </van-list>
    </div>
</template>

<script>
import { getCommentList } from '@/api/comment';
import CommentItem from './comment-item';
    export default {
        data() {
            return {
                loading: false,
                finished: false,
                offset: null, //获取评论数据的偏移量，用于判断是否有下一页
                limit: 10 //每页评论数据个数
            }
        },
        components: {
            CommentItem,
        },
        props: {
            source: {
                type: [Number, String, Object],
                required: true 
            },
            type: {
                type: String,
                default: 'a' //评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
            },
            //父组件传递的评论列表数据
            list: {
                type: Array,
                default: () => []
            },
        },
        methods: {
            async onLoad() {
                //1.发送请求
                const { data } = await getCommentList({
                    type: this.type, //评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
                    source: this.source.toString(), //源id，文章id或评论id
                    offset: this.offset,//获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
                    limit: this.limit //获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
                })
                //2.把数据放到列表中
                const { results, last_id } = data.data;
                this.list.push(...results)
                //3.将本次的loading关闭
                this.loading = false;
                //4.判断是否还有数据 如果有更新获取下一页数据的页码
                if(results.length) {
                    this.offset = last_id;
                } else {
                    //如果没有将finished设置为true，不再触发加载更多
                    this.finished = true;
                }
                
            },
        },
    }
</script>

<style lang="less" scoped>

</style>