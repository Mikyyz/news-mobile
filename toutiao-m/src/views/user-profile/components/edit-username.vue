<template>
    <div class="edit-username">
        <van-field
            v-model="user_name"
            rows="2"
            autosize
            type="textarea"
            maxlength="20"
            show-word-limit
            ref="usernameField"
        />
        <div class="field-footer">
            <span class="text">支持中英文、数字</span>
            <van-button type="info" size="mini" class="btn" @click="onConfirm">确定</van-button>
        </div>
    </div>
</template>

<script>
import { editUserProfile } from '@/api/user';
    export default {
        data() {
            return {
                user_name: this.value
            }
        },
        props: {
            value: {
                type: String,
                required: true 
            }
        },
        mounted () {
            this.$refs.usernameField.focus();
        },
        methods: {
            async onConfirm() {
                try {
                    await editUserProfile({
                        name: this.user_name
                    });
                    this.$emit('close');//通知父组件关闭弹出层
                    this.$emit('input', this.user_name); //通知父组件更新昵称
                    this.$notify({
                        type: 'success',
                        message: '昵称修改成功'
                    });
                } catch (err) {
                    //返回状态码为409表示用户名已经存在
                    if(err && err.response && err.response.status === 409) {
                        this.$notify({
                            type: 'danger',
                            message: '昵称已被占用'
                        });
                    }
                }
            }
        },
    }
</script>

<style lang="less" scoped>
.edit-username {
    padding: 15px;
    .field-footer {
        display: flex;
        height: 50px;
        justify-content: space-between;
        align-items: center;
        .text {
            font-size: 13px;
            color: #BDBDBD;
        }
        .btn {
            padding: 8px 10px;
        }
    }
}
</style>