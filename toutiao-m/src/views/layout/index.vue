<template>
    <div class="layout">
        <router-view />
        <van-tabbar v-model="active" route>
            <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
            <van-tabbar-item icon="comment-o" to="/qa">问答</van-tabbar-item>
            <van-tabbar-item icon="video-o" to="/video">视频</van-tabbar-item>
            <van-tabbar-item icon="user-o" to="/my">{{user ? "我的" : "未登录"}}</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
import { mapState } from 'vuex'
    export default {
        name: 'layout',
        data() {
            return {
                active: 0
            }
        },
        mounted () {
            //在layout组件挂在之后缓存组件
            this.$store.commit('addCachePages', 'layout')
        },
        computed: {
           ...mapState(['user'])
        },
    }
</script>

<style lang="scss" scoped>

</style>