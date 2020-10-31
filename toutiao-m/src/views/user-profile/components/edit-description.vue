<template>
    <div class="edit-description">
        <van-field
            v-model="userDescription"
            rows="2"
            autosize
            type="textarea"
            maxlength="30"
            show-word-limit
            ref="userDescriptionField"
        />
        <div class="field-footer">
            <span class="text">10-30个字</span>
            <van-button type="info" size="mini" class="btn" @click="onConfirm">确定</van-button>
        </div>
    </div>
</template>

<script>
import store from 'store';
    export default {
        data() {
            return {
                userDescription: this.value
            }
        },
        props: {
            value: {
                type: String,
                required: true 
            },
        },
        mounted () {
            this.$refs.userDescriptionField.focus();
        },
        methods: {
            onConfirm() {
                if(this.userDescription.length < 10) {
                    this.$notify({
                            type: 'danger',
                            message: '简介不少于10个文字'
                        });
                } else if(this.value === this.userDescription) {
                    console.log('close')
                    this.$emit('close');//通知父组件关闭弹出层
                } else if(this.userDescription.length >= 10 && this.userDescription.length <= 30) {
                    store.set('userDescription', this.userDescription)
                    this.$emit('close');//通知父组件关闭弹出层
                    this.$emit('input', this.userDescription); //通知父组件更新简介
                    this.$notify({
                        type: 'success',
                        message: '简介修改成功'
                    });
                }
            }
        },
    }
</script>

<style lang="less" scoped>
.edit-description {
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