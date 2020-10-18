<template>
    <div class="article-list">
        <van-pull-refresh v-model="isRefreshLoading" success-duration="1000" @refresh="onRefresh">
            <template #success>
                <van-tag 
                    round 
                    type="primary"
                    color="#F5F5F5"
                    text-color="#212121" 
                    size="large">
                    今日头条推荐引擎有{{refreshCount}}条更新
                </van-tag>
            </template>
            <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
                >
                <article-item 
                    v-for="(article, index) in articles" 
                    :key="index" 
                    :title="article.title" 
                    :article="article"
                />
            </van-list>
        </van-pull-refresh>
    </div>
</template>

<script>

import { getArticles } from '@/api/article';
import ArticleItem from '@/components/article-item';

    export default {
        data() {
            return {
                articles: [],
                loading: false,
                finished: false,
                timestamp: null,
                isRefreshLoading: false,
                refreshCount: ''
            }
        },
        components: {
            ArticleItem
        },
        props: {
            channel: {
                type: Object,
                required: true
            },
        },
        methods: {
            async onLoad() {
                //获取请求数据
                const { data } = await getArticles({
                    channel_id: this.channel.id,
                    timestamp: this.timestamp || Date.now(),
                    with_top: 1
                })
                //把数据放到articles中
                const { results, pre_timestamp } = data.data;
                this.articles.push(...results);
                //设置本次加载状态，他可以判断是否需要加载下一次，否则永远的停在这里
                this.loading = false;
                //数据全部加载完成
                if(results.length) {
                    //更新获取下一页数据的页码
                    this.timestamp = pre_timestamp;
                } else {
                    //数据加载完了设置finished
                    this.finished = true;
                }
            },
            async onRefresh() {
                //下拉刷新组件自己会显示loading状态
                //获取请求数据
                const { data } = await getArticles({
                    channel_id: this.channel.id,
                    timestamp: Date.now(),
                    with_top: 1
                });
                //把数据放到数据列表中（往顶部不追加）
                const { results } = data.data;
                this.articles.unshift(...results);
                //关闭刷新的状态loading
                this.isRefreshLoading = false;
                //显示更新多少条数据
                this.refreshCount = results.length;
            }
        },
    }
</script>

<style lang="less" scoped>
.article-list {
    position: fixed;
    left: 0;
    right: 0;
    top: 90px;
    bottom: 50px;
    overflow-y: scroll;
}
</style>