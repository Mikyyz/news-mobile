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
                <span @click="onDeleteAll">全部删除</span>
                <span class="finished" @click="deleteAction = false">完成</span>
            </div>
            <van-icon name="delete" v-else @click="deleteAction = true" />
        </van-cell>
        <van-cell v-for="(history, index) in searchHistories" :key="index">
            <div slot="title" v-if="index <= searchHistoryLength" @click="handleSearch(history)">
                {{ history }}
            </div>
            <van-icon name="cross" @click="onDeleteOne(index)" v-if="deleteAction &&  index <= searchHistoryLength"/>
        </van-cell>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import store from 'store';
import { deleteAllHistories } from '@/api/search';
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
            },
            onDeleteOne(index) {
                //未登录且删除状态，执行删除操作
                if(this.deleteAction && !this.user){
                    this.searchHistories.splice(index, 1);
                    store.set('search-history', this.searchHistories)
                } 
            },
            //删除全部
             onDeleteAll() {
                 this.$dialog.confirm({
                    message: '是否清空历史记录',
                    width: '200px'
                }).then(async () => {
                    //确认删除
                    if(this.user) {
                        //如果是已经登录
                        await deleteAllHistories();
                        location.reload();
                    } else {
                        //如果没有登录
                        store.set('search-history', []);
                        location.reload();
                    }
                }).catch(() => {
                    //捕获错误，什么都不做
                });
            },
            handleSearch(history) {
                this.$emit('search', history);
            }
        },
        computed: {
            ...mapState(['user'])
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