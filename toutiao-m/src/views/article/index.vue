<template>
    <div class="article-container">
        <van-nav-bar
            left-arrow
            fixed
            title="文章详情"
            @click-left="$router.back()"
        />
        <h1 class="article-title">{{article.title}}</h1>
        <van-cell center class="user-info" :border="false">
            <van-image 
                slot="icon"
                round
                class="avatar"
                :src="article.aut_photo" 
            />
            <span slot="title" class="user-name">{{article.aut_name}}</span>
            <span slot="label" class="pubdate">
                {{article.pubdate | relativeTime}}
            </span>
            <van-button v-if="article.is_followed" plain round size="small"  class="follow">已关注</van-button>
            <van-button v-else type="info" round size="small" icon="plus" class="follow">关注</van-button>
            
        </van-cell>
        <div class="markdown-body" ref="article-content" v-html="article.content"></div>
    </div>
</template>

<script>
import { ImagePreview } from 'vant';
import './markdown.css';
import dayjs from '@/api/day';
import { getArticleDeatail } from '@/api/article';

    export default {
        data() {
            return {
                article: {}
            }
        },
        props: {
            articleId: {
                type: Number,
                required: true
            },
        },
        created () {
            this.loadArticleDetail();
        },
        methods: {
            async loadArticleDetail() {
                const { data } = await getArticleDeatail(this.articleId);
                this.article = data.data;
                document.title = this.article.title;//动态修改页面的title
                this.$nextTick(() => {
                    this.handleImagePreview();
                })
            },
            handleImagePreview() {
                //获取到文章的DOM容器
                const articleContent = this.$refs['article-content'];
                const imgs = articleContent.querySelectorAll('img');
                //获取所有img的src组成的数组
                const imgPaths = Array.from(imgs).map(img => img.src);
                imgs.forEach((img, index) => {
                    img.onclick = function() {
                        ImagePreview({
                            images: imgPaths,
                            startPosition: index,//起始位置
                            loop: false //是否开启循环播放
                        })
                    }
                })
            }
        },
    }
</script>

<style lang="less" scoped>
.article-container {
    .article-title {
        font-size: 20px;
        color: #3a3a3a;
        padding:14px;
        margin-top: 46px;
    }
    .user-info {
        .avatar {
            width: 35px;
            height: 35px;
            margin-right: 8px;
        }
        .user-name {
            font-size: 14px;
            color: #333;
        }
        .van-cell__label {
            font-size: 10px;
            color: #b4b4b4;
            margin-top: -1px;
        }
        .follow {
            width: 85px;
            height: 32px;
        }
    }
    .markdown-body {
        padding: 14px;
    }
}
</style>