<template>
    <div class="edit-gender">
        <van-picker
            show-toolbar
            :columns="columns"
            :default-index="defaultIndex"
            @confirm="onConfirm"
            @cancel="$emit('close')"
            @change="onGenderChange"
        />
    </div>
</template>

<script>
import { editUserProfile } from '@/api/user';
    export default {
        data() {
            return {
                columns: ['男', '女'],
                defaultIndex: this.value //默认的选中项目
            }
        },
        props: {
            value: {
                type: Number,
                required: true
            },
        },
        methods: {
            onGenderChange(picker, value, index){
                this.defaultIndex = index;
            },
            async onConfirm() {
                await editUserProfile({
                    gender: this.defaultIndex
                });
                if(this.value !== this.defaultIndex) {
                    this.$emit('input', this.defaultIndex);
                    this.$emit('close');
                    this.$notify({
                            type: 'success',
                            message: '性别修改成功'
                        });
                } else {
                    this.$emit('close');
                }
                
            }
        },
    }
</script>

<style lang="less" scoped>

</style>