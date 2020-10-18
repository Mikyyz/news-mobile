<template>
    <div class="article-container">
        <van-cell class="article-item">
            <div slot="title" class="title van-multi-ellipsis--l3">{{ article.title }}</div>
            <div slot="label">
                <div class="cover-wrap" v-if="article.cover.type === 3">
                    <div class="cover-wrap-item" v-for="(img, index) in article.cover.images" :key="index">
                        <van-image 
                            fit="cover" 
                            :src="img"
                            class="cover-item" 
                            radius="2"
                        />
                    </div>
                </div>
                <div class="label-wrap">
                    <span class='label-item'>{{ article.aut_name }}</span>
                    <span class='label-item'>{{ article.comm_count }}评论</span>
                    <span class='label-item'>{{ article.pubdate | relativeTime }}</span>
                </div>
            </div>
            <van-image 
                v-if="article.cover.type === 1"
                class="right-cover"
                fit="cover" 
                :src="article.cover.images[0]" 
                radius="2"
            />
            <div slot="extra" class="delete-icon">
                <van-icon name="cross" @click="showPopup" />
            </div>
        </van-cell>
        <van-popup 
            round 
            v-model="isShowPopup" 
            :get-container="getContainer"
            class="popup"
        >
            <van-cell-group>
                <van-cell title="不感兴趣" label="减少这类信息" icon="close" center />
                <van-cell title="举报" label="标题夸张，内容质量差等" icon="warning-o" center is-link />
                <van-cell title="拉黑作者" :label="`${article.aut_name}`" icon="manager-o" center />
                <van-cell title="屏蔽"  label="科技" icon="warn-o" center is-link />
            </van-cell-group>
        </van-popup>
    </div>
</template>

<script>
import dayjs from '@/api/day';
    export default {
        data() {
            return {
                isShowPopup: false
            }
        },
        props: {
            article: {
                type: Object,
                required: true 
            },
        },
        methods: {
             getContainer() {
                return document.querySelector('.my-container');
            },
            showPopup() {
                this.isShowPopup = true;
            }
        },
    }
</script>

<style lang="less" scoped>
.article-item {
    .title {
        font-size: 16px;
        color: #3a3a3a;
    }
    .van-cell__value {
        flex: unset;
        width: 116px;
        height: 73px;
        margin-left: 12px;
    }
    .right-cover {
        width: 116px;
        height: 73px;
    }
    .cover-wrap {
        display: flex;
        padding: 15px 0;
        .cover-wrap-item {
            flex: 1;
            height: 73px;
            &:not(:last-child) {
                padding-right: 3px;
            }
            .cover-item {
                width: 100%;
                height: 73px;
                
            }
        }
    }
    .label-wrap {
        font-size: 11px;
        color: #b4b4b4;
        .label-item {
            margin-right: 12px;
        }
    }
    .delete-icon {
        // position: absolute;
        // right: 15px;
        // bottom: 4px;
        color: #b4b4b4;
    }
}
.popup {
    width: 95%;
    
}
.van-popup--center.van-popup--round {
    border-radius: 6px;
}
</style>