<template>
    <div class="user-profile">
        <!-- 导航栏 -->
        <van-nav-bar
            title="编辑资料"
            right-text="保存"
            left-arrow
            @click-left="$router.back()"
            @click-right="onClickRight"
        />
        <van-cell title="头像" is-link center>
            <van-image  
                round
                fit="cover"
                :src="user.photo"   
            />
        </van-cell>
        <van-cell 
            title="用户名" 
            is-link 
            :value="user.name"
            @click="isEditUsernamePopupShow=true" 
        />
        <van-cell 
            title="简介" 
            is-link 
            value="这个人很懒，什么都没" 
        />
        <van-cell 
            title="性别" 
            is-link 
            :value="user.gender === 0 ? '男' : '女'" 
            @click="isEditGenderPopupShow=true"
        />
        <van-cell 
            title="生日" 
            is-link 
            :value="user.birthday" 
            @click="isEditBirthdayPopupShow=true"
        />
        <van-cell 
            title="地区" 
            is-link 
            value="贵州省贵阳市" 
        />
        <!-- 编辑用户名弹出层 -->
        <van-popup 
            v-model="isEditUsernamePopupShow"
            position="bottom" 
            :style="{ height: '60%' }"
            class="username-popup"
        >
            <edit-username 
                v-if="isEditUsernamePopupShow" 
                v-model="user.name"
                @close="isEditUsernamePopupShow=false"
            />
        </van-popup>
        <!-- 修改性别弹出层 -->
        <van-popup 
            v-model="isEditGenderPopupShow"
            position="bottom"
        >
            <edit-gender 
                v-if="isEditGenderPopupShow" 
                v-model="user.gender"
                @close="isEditGenderPopupShow=false"
            />
        </van-popup>
        <!-- 修改生日 -->
        <van-popup 
            v-model="isEditBirthdayPopupShow"
            position="bottom"
        >
            <edit-birthday 
                v-if="isEditBirthdayPopupShow" 
                v-model="user.birthday"
                @close="isEditBirthdayPopupShow=false"
            />
        </van-popup>
    </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import EditUsername from './components/edit-username'
import EditGender from './components/edit-gender'
import EditBirthday from './components/edit-birthday'
    export default {
        data() {
            return {
                user: {},
                isEditUsernamePopupShow: false, //编辑用户名弹出层
                isEditGenderPopupShow: false,    //修改性别弹出层
                isEditBirthdayPopupShow: false    //修改生日弹出层
            }
        },
        components: {
            EditUsername,
            EditGender,
            EditBirthday
        },
        created () {
            this.loadUserProfile()
        },
        methods: {
            onClickRight() {
                console.log('保存')
            },
            async loadUserProfile() {
                const { data } = await getUserProfile();
                this.user = data.data;
            }
        },
    }
</script>

<style lang="less" scoped>
.user-profile {
    .avatar {
        width: 30px;
        height: 40px;
    }
    .username-popup {
        background-color: #F5F5F5;
    }
}
</style>