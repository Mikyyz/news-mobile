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
    <input
      type="file"
      hidden
      ref="file"
      accept="image/*"
      @change="onFileChange"
    />
    <van-cell
      title="头像"
      is-link
      center
      @click="$refs.file.click()"
      class="avatar-cell"
    >
      <van-image round class="user-avatar" fit="cover" :src="user.photo" />
    </van-cell>
    <van-cell
      title="用户名"
      is-link
      :value="user.name"
      @click="isEditUsernamePopupShow = true"
    />
    <van-cell title="简介" is-link @click="isUserDescriptionPopupShow = true">
      <div class="van-ellipsis">{{ userDescription }}</div>
    </van-cell>
    <van-cell
      title="性别"
      is-link
      :value="user.gender === 0 ? '男' : '女'"
      @click="isEditGenderPopupShow = true"
    />
    <van-cell
      title="生日"
      is-link
      :value="user.birthday"
      @click="isEditBirthdayPopupShow = true"
    />
    <van-cell
      title="地区"
      is-link
      :value="userCity"
      @click="isEditCityPopupShow = true"
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
        @close="isEditUsernamePopupShow = false"
      />
    </van-popup>
    <!-- 修改性别弹出层 -->
    <van-popup v-model="isEditGenderPopupShow" position="bottom">
      <edit-gender
        v-if="isEditGenderPopupShow"
        v-model="user.gender"
        @close="isEditGenderPopupShow = false"
      />
    </van-popup>
    <!-- 修改生日 -->
    <van-popup v-model="isEditBirthdayPopupShow" position="bottom">
      <edit-birthday
        v-if="isEditBirthdayPopupShow"
        v-model="user.birthday"
        @close="isEditBirthdayPopupShow = false"
      />
    </van-popup>
    <!-- 修改用户简介 -->
    <van-popup
      v-model="isUserDescriptionPopupShow"
      position="bottom"
      :style="{ height: '60%' }"
      class="userDescription-popup"
    >
      <edit-description
        v-if="isUserDescriptionPopupShow"
        v-model="userDescription"
        @close="isUserDescriptionPopupShow = false"
      />
    </van-popup>
    <!-- 修改省市区 -->
    <van-popup v-model="isEditCityPopupShow" position="bottom">
      <edit-city
        v-if="isEditCityPopupShow"
        v-model="userCity"
        @close="isEditCityPopupShow = false"
      />
    </van-popup>
    <!-- 修改图像 -->
    <van-popup
      class="edit-avatar_popup"
      v-model="isEditAvatarPopupShow"
      style="height: 100%"
      position="bottom"
    >
      <edit-avatar
        :file="previewImg"
        @close="isEditAvatarPopupShow = false"
        @edit-avatar="user.photo = $event"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from "@/api/user";
import EditUsername from "./components/edit-username";
import EditGender from "./components/edit-gender";
import EditBirthday from "./components/edit-birthday";
import EditDescription from "./components/edit-description";
import EditCity from "./components/edit-city";
import EditAvatar from "./components/edit-avatar";
import store from "store";
export default {
  data() {
    return {
      user: {},
      userDescription:
        store.get("userDescription") || "这个人很懒，什么都没留下", //个人简介
      userCity: "" || "未知", //所在省市区
      isEditUsernamePopupShow: false, //编辑用户名弹出层
      isEditGenderPopupShow: false, //修改性别弹出层
      isEditBirthdayPopupShow: false, //修改生日弹出层
      isUserDescriptionPopupShow: false, //修改用户简介弹出层
      isEditCityPopupShow: false, //修改省市
      isEditAvatarPopupShow: false, //修改头像
      previewImg: null, //预览图片地址
    };
  },
  components: {
    EditUsername,
    EditGender,
    EditBirthday,
    EditDescription,
    EditCity,
    EditAvatar,
  },
  created() {
    this.loadUserProfile();
  },
  methods: {
    onClickRight() {
      console.log("保存");
    },
    async loadUserProfile() {
      const { data } = await getUserProfile();
      this.user = data.data;
    },
    // 选择图片
    onFileChange() {
      // 显示图片预览层
      this.isEditAvatarPopupShow = true;
      //根据选择的图片名，然后转换成图片url
      const imageUrl = this.$refs.file.files[0];
      this.previewImg = imageUrl;
      //每次选择玩图片后清空
      this.$refs.file.value = "";
    },
  },
};
</script>

<style lang="less" scoped>
.user-profile {
  .avatar {
    width: 30px;
    height: 40px;
  }
  .avatar-cell {
    height: 48.55px;
    overflow: hidden;
  }
  .user-avatar {
    /deep/.van-image__img {
      width: 30px;
      height: 30px;
    }
  }
  .username-popup {
    background-color: #f5f5f5;
  }
  .userDescription-popup {
    background-color: #f5f5f5;
  }
  .edit-avatar_popup {
    background-color: #0c0c0c;
  }
}
</style>