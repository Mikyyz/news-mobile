<template>
    <div class="lenovo-word">
        <van-cell 
            v-for="(suggestion, index) in suggestions" 
            :key="index"
            icon="search"
            @click="$emit('search', suggestion)"
        >
            <div slot="title" v-html="handleHighlight(suggestion, searchText)" />
        </van-cell>
    </div>
</template>

<script>
import { debounce } from 'lodash'
import { getSearchSuggestions } from '@/api/search';
import highlight from '@/utils/highlight'
    export default {
        name: 'lenovoWord',
        data() {
            return {
                suggestions: []
            }
        },
        props: {
            searchText: {
                type: String,
                required: true
            },
        },
        watch: {
            searchText: {
                //当数据发生变化后执行handler处理函数
                handler: debounce(async function() {
                    const { data } = await getSearchSuggestions(this.searchText);
                    this.suggestions = data.data.options
                }, 200),
                immediate: true //该回调将会在侦听开始之后被立即调用
            }
        },
        methods: {
           handleHighlight(str, replaceStr) {
                return highlight(str, replaceStr)
            },
        },
    }
</script>

<style lang="less" scoped>

</style>