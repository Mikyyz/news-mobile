<template>
    <div class="login">
        <van-nav-bar
            right-text="遇到问题"
            left-arrow
            @click-right="$router.push({name: 'login-question'})"
            @click-left="$router.back()"
        />
        <div class="login-header">
             <van-row type="flex" align="center">
                <van-col span="3">
                    <img src="http://sf3-dycdn-tos.pstatp.com/obj/eden-cn/uhbfnupkbps/toutiao_favicon.ico" class="login_img" alt="">
                </van-col>
                <van-col>
                    <span class="login_title">手机登录</span>
                </van-col>
            </van-row>
            <van-row>
                <van-col class="login_contract">
                    登录即表示同意
                    <router-link class="user_agreement" to="/user_agreement">"用户协议"</router-link>
                    和
                    <router-link class="privacy_policy" to="/privacy_protection">"隐私政策"</router-link>
                </van-col>
            </van-row>
        </div>
        <div class="login-form">
            <van-form 
            :show-error="false" 
            :show-error-message="false" 
            validate-first
            ref="login-form"
            @submit="onLogin"
            @failed="onLoginFailed">
                <van-field
                    v-model="user.mobile"
                    placeholder="请输入手机号"
                    :rules="formRules.mobile"
                    name="mobile"
                />
                <van-field
                    v-model="user.code"
                    placeholder="请输入6位验证码"
                    :rules="formRules.code"
                    name="vode"
                >
                    <template #button>
                        <van-count-down v-if="isCountdownShow" :time="time" @finish="countDownFinished" class="count-down" format="ss 秒后重新获取" />
                        <van-button v-else size="small" type="info" :disabled="isButtonDisabled" @click.prevent="onSendSms">发送验证码</van-button>
                    </template>
                </van-field>
                <div class="login-terms login_contract">
                    未注册的手机号验证通过后将自动注册
                </div>
                <div class="login-btn">
                    <van-button type="info" block>登录</van-button>
                </div>
            </van-form>
        </div>
    </div>
</template>

<script>
import { login, sendSms } from '@/api/user';
    export default {
        name: 'login',
        data() {
            return {
                time: 1000 * 60,
                isCountdownShow: false,
                isButtonDisabled: false,
                user: {
                    mobile: '',
                    code: ''
                },
                formRules: {
                    mobile: [
                        { required: true, message: '请输入手机号' },
                        { pattern: /^1[34578]\d{9}$/, message: '手机号格式错误' }
                    ],
                    code: [
                        { required: true, message: '请输入6位验证码' },
                        { pattern: /^\d{6}$/, message: '验证码为6位数字' }
                    ]
                }
            }
        },
        methods: {
           async onLogin() {

               this.$toast.loading({
                   message: '登录中...',
                   forbidClick: true,
                   duration: 0
               })

               try {
                   const { data } = await login(this.user);
                   //console.log(res);
                   this.$toast.success('登录成功')
                   //登录成功之后将后端返回的token存储到VUEX中
                   this.$store.commit('setUser', data.data)
                   
                   //登录成功后跳转到之前的页面
                   this.$router.back();
               } catch (err) {
                   this.$toast.fail('登录失败')
               }
           },
           onLoginFailed (errorInfo) {
               if(errorInfo.errors[0]) {
                   this.$toast({
                       message: errorInfo.errors[0].message,
                       position: 'top'
                   })
               }
           },
           async onSendSms() {
               try {
                   //校验手机号码
                   await this.$refs['login-form'].validate('mobile');
                   //校验通过请求发送验证码
                   this.isButtonDisabled = true;
                   const res = await sendSms(this.user.mobile);
                   console.log(res);
                   //短信发出去了，隐藏发送按钮，显示倒计时
                   if(res.status === 200) {
                       this.isCountdownShow = true;
                   }
               } catch (err) {
                   this.$toast({
                       message: err.message,
                       position: 'top'
                   })
               }
               //无论验证码发送成功还是失败都要设置按钮的disabled属性为false
               this.isButtonDisabled = false;
           },
           countDownFinished() {
               //倒计时完成后隐藏
               this.isCountdownShow = false;
           }
        },
    }
</script>

<style lang="less" scoped>
.login-header, .login-form {
    margin: 40px 30px;
}
.login_img {
    width: 30px;
    height: 30px;
}
.login-terms.login_contract {
    margin: 20px 0;
    font-size: 12px;
}
.login_title {
    font-size: 26px;
    letter-spacing: 2px;
    color: #232323;
}
.login_contract {
    font-size: 14px;
    color: #959595;
}
.user_agreement, .privacy_policy {
    color: #676767;
    cursor: pointer;
}
.count-down {
    color: #676767;
}
</style>