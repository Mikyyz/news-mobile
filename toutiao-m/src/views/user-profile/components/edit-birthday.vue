<template>
    <div class="edit-birthday">
        <van-datetime-picker
            v-model="currentDate"
            type="date"
            title="选择年月日"
            :min-date="minDate"
            :max-date="maxDate"
            @cancel="$emit('close')"
            @confirm="onConfirm"
        />
    </div>
</template>

<script>
import { editUserProfile } from '@/api/user';
import dayjs from 'dayjs';
    export default {
        data() {
            return {
                minDate: new Date(1970, 0, 1),
                maxDate: new Date(),
                currentDate: new Date(this.value), 
            }
        },
        props: {
            value: {
                type: String,
                required: true 
            },
        },
        methods: {
            async onConfirm() {
                const date = dayjs(this.currentDate).format('YYYY-MM-DD');
                await editUserProfile({
                    birthday: date
                });

                //日期真正修改后触发
                if(this.value !== date) {
                    this.$emit('input', date);
                    this.$emit('close');
                    this.$notify({
                                type: 'success',
                                message: '生日修改成功'
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