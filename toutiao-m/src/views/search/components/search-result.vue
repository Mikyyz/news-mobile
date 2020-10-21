<template>
    <div class="search-result">
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
        >
            <van-cell v-for="(item, index) in list" :key="index" >
                <div slot="title" v-html="handleHighlight(item.title, searchText)" />
            </van-cell>
        </van-list>
    </div>
</template>

<script>
import { getSearchResults } from '@/api/search';
import highlight from '@/utils/highlight'
    export default {
        data() {
            return {
                list: [],
                loading: false,
                finished: false,
                page: 1,
                per_page: 10
            }
        },
        props: {
            searchText: {
                type: String,
                required: true
            }
        },
        methods: {
            //处理高亮
            handleHighlight(str, replaceStr) {
                return highlight(str, replaceStr)
            },
            async onLoad() {
                //1.请求获取数据
                const { data } = await getSearchResults({
                    page: this.page,
                    per_page: this.per_page,
                    q: this.searchText
                })
                //2.将数据放到数据列表中
                const { results } = data.data;
                this.list.push(...results);
                //3.关闭本次的loading
                this.loading = false;
                //4.判断是否还有数据
                if(results.length) {
                    //如果有，则更新获取下一页数据的页面
                    this.page++;
                } else {
                    //如果没有，则把finished设置为true
                    this.finished = true;
                }
            },
        },
    }
</script>

<style lang="less" scoped>
.search-result {
    position: fixed;
    left: 0;
    right: 0;
    top: 54px;
    bottom: 0;
    overflow-y: auto;
}
</style>