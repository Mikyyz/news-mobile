<template>
    <div class="login-question">
        <van-nav-bar
            title="登录遇到问题"
            left-arrow
            @left-click="$router.back({name: 'login'})"
        />
        <van-cell-group class="login-question_cell" :border=false>
            <van-cell center title="手机号登录遇到问题"  is-link label="手机号已停用/收不到验证码等" />
            <van-cell center title="第三方账号登录遇到问题" is-link label="微信/QQ/天翼/Apple登录遇到问题" />
            <van-cell center title="怀疑账号被盗" is-link label="手机号被换绑或密码被篡改,无法登录" />
            <van-cell center title="找回账号" is-link label="忘记登录的方式,无法找到想要的账号" />
        </van-cell-group>
        <div class="other-question_fixed">
            <div class="other-question">
                <span>还有其他问题？</span>
                <router-link to="" class="fedback">提交反馈</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            beforeRouteLeave(to, from, next) {
                if(to.name === 'login') {
                    next(false)
                } else {
                    next()
                }
            }
        },
    }
</script>

<style lang="less" scoped>

.login-question_cell {
    margin: 10px;
}
.other-question_fixed {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
}
.other-question {
    font-size: 13px;
    span {
        color: #969799;
    }
    .fedback {
        color: #1989fa;
    }
}
</style>