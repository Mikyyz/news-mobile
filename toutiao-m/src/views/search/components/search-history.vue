<template>
    <div class="search-history">
        <van-cell>
            <div slot="title">
                <span class="left-title">历史记录</span>
                <van-icon 
                    name="arrow-down" 
                    :class="{'arrow-rotate': isRotate}" 
                    @click="handleArrowRotate(searchHistories.length)"/>
            </div>
            <div class="right-title" v-if="deleteAction">
                <span>全部删除</span>
                <span class="finished">完成</span>
            </div>
            <van-icon name="delete" v-else @click="deleteAction = true" />
        </van-cell>
        <van-cell v-for="(history, index) in searchHistories" :key="index">
            <div slot="title" v-if="index <= searchHistoryLength">
                {{ history }}
            </div>
            <van-icon name="cross" v-if="deleteAction &&  index <= searchHistoryLength"/>
        </van-cell>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isRotate: false, //是否旋转箭头
                deleteAction: false,
                searchHistoryLength: 1 //默认显示2条搜索历史
            }
        },
        props: {
            searchHistories: {
                type: Array,
                required: true
            },
        },
        methods: {
            handleArrowRotate(len) {
                this.isRotate = !this.isRotate;
                this.searchHistoryLength = this.searchHistoryLength === 1 ? len : 1;
            }
        },
        computed: {
            
        }, 
              
    }
</script>

<style lang="less" scoped>
.search-history {
    .left-title {
        color: #9E9E9E;
        margin-right: 2px;
    }
    .right-title {
        color: #757575;
        .finished {
            margin-left: 4px;
        }
    }
    .van-icon-arrow-down {
            transition: .2s;
            transform: rotate(0);
        &.arrow-rotate {
            transition: .2s;
            transform: rotate(180deg)
        }
    }
}
</style>