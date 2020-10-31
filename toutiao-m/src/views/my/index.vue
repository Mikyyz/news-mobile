<template>
    <div class="my-container">
        <van-cell-group class="my-info-box" v-if="user">
            <van-cell title="单元格" value="内容" center :border="false" class="base-info">
                <van-image 
                    slot="icon"
                    fit="cover" 
                    round
                    class="avatar"
                    src="currentUser.photo" 
                />
                <div slot="title" class="username">{{ currentUser.name }}</div>
                <van-button size="mini" class="edit-btn" round to="/user/profile">
                    编辑资料
                </van-button>
            </van-cell>
            <van-grid :border="false" class="data-info">
                <van-grid-item class="data-info-item">
                    <div slot="text" class="text-wrap">
                        <span class="count">{{ currentUser.art_count }}</span>
                        <span class="text">头条</span>
                    </div>
                </van-grid-item>
                <van-grid-item class="data-info-item">
                    <div slot="text" class="text-wrap">
                        <span class="count">{{ currentUser.follow_count }}</span>
                        <span class="text">关注</span>
                    </div>
                </van-grid-item>
                <van-grid-item class="data-info-item">
                    <div slot="text" class="text-wrap">
                        <span class="count">{{ currentUser.fans_count }}</span>
                        <span class="text">粉丝</span>
                    </div>
                </van-grid-item>
                <van-grid-item class="data-info-item">
                    <div slot="text" class="text-wrap">
                        <span class="count">{{ currentUser.like_count }}</span>
                        <span class="text">获赞</span>
                    </div>
                </van-grid-item>
            </van-grid>
        </van-cell-group>
        <div v-else class="not-login">
            <div class="not-login-wrapper" @click="$router.push('/login')">
                <div class="not-login-img">
                    <van-icon name="graphic" size="55" color="#1989fa" />
                </div>
                <div class="login-text">登录 / 注册</div>
            </div>
        </div>
        <van-grid :border="false" :column-num="2" class="nav-grid">
            <van-grid-item  icon="star-o" text="收藏" class="nav-grid-item" />
            <van-grid-item icon="clock-o" text="历史" class="nav-grid-item" />
        </van-grid>
        <van-cell-group class="cell-box" :border="false">
            <van-cell title="消息通知" is-link to="" />
            <van-cell title="小智同学" is-link to="" />
        </van-cell-group>
        <van-cell class="login-out" v-if="user" @click="onLogout" title="退出登录" />
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { getCurrentUser } from '@/api/user';

    export default {
        data() {
            return {
                currentUser: {}
            }
        },
        computed: {
            ...mapState(['user'])
        },
        created () {
            this.loadCurrentUser();
        },
        methods: {
            async loadCurrentUser() {
                const { data } = await getCurrentUser();
                this.currentUser = data.data;
            },
            onLogout() {
                this.$dialog.confirm({
                        title: '退出确认',
                        message: '退出当前账号，将不能同步收藏,发布评论和云端分享等',
                        width: 250
                    }).then(() => {
                        //点击确认后清除用户登录状态
                        this.$store.commit('setUser', null);
                    }).catch(() => {
                    // on cancel
                });
            }
        },
    }
</script>

<style lang="less" scoped>
body {
    background-color: #FAFAFA;
    color: #333;
}
.my-container {
    .my-info-box {
        background: url('./banner.png') no-repeat;
        background-size: cover;
    }
    .base-info {
        height: 116px;
        box-sizing: border-box;
        background-color: unset;
        padding-top: 38px;
        padding-left: 16px;
        padding-bottom: 12px;
        .avatar {
            width: 60px;
            height: 60px;
            border: 2px solid #fff;
        }
        .username {
            font-size: 15px;
            color: #fff;
            margin-left: 10px;
        }
        .edit-btn {
            padding: 14px 15px;
            color: #666;
            font-size: 14px;
        }
    }
    .data-info {
        .data-info-item {
            height: 65px;
            .text-wrap {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                color: #fff;
                .count {
                    font-size: 18px;
                }
                .text {
                    font-size: 12px;
                }
            }
        }
    }
    .nav-grid {
        .nav-grid-item {
            height: 70px;
            background-color: #fff;
            /deep/.van-icon-star-o{
                font-size: 26px;
                color: #eb5253;
            }
            /deep/.van-icon-clock-o {
                font-size: 26px;
                color: #ff9d1d;
            }
        }
    }
    /deep/ .van-grid-item__content {
        background-color: unset;
    }
    .cell-box {
        margin: 6px 0;
    }
    .login-out {
        height: 47px;
        text-align: center;
        color: #db6262;
        margin-bottom: 4px;
    }
    .not-login {
        width: 100%;
        height: 180px;
        background: url('./banner.png') no-repeat;
        background-size: cover;
    }
    .not-login-wrapper {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .not-login-img {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .login-text {
        font-size: 18px;
        color: #fff;
    }
}

</style>