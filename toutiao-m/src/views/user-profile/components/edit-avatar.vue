<template>
  <div class="edit-avatar">
    <div class="preview-container">
      <img :src="image" class="preview-image" />
    </div>
    <van-nav-bar
      class="toolbar"
      left-text="取消"
      right-text="确认"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    />
  </div>
</template>

<script>
import { editUserAvatar } from "@/api/user";
export default {
  data() {
    return {
      image: window.URL.createObjectURL(this.file),
    };
  },
  props: {
    file: {
      // type: String,
      required: true,
    },
  },
  methods: {
    async onConfirm() {
      //如果要求Content-Type multipart/form-data,
      //则一定要提交FormData类型的数据对象,专门用户上传文件的,不能传{}
      const fd = new FormData();
      fd.append("photo", this.file);

      await editUserAvatar(fd);

      this.$toast("保存成功");
      // //更新父组件中的用户头像
      this.$emit("edit-avatar", this.image);
      //关闭弹出层
      this.$emit("close");
    },
  },
};
</script>

<style lang="less" scoped>
.edit-avatar {
  .preview-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .preview-image {
    width: 100%;
  }
  .toolbar {
    background-color: #0c0c0c;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    /deep/.van-nav-bar__text {
      color: #fff;
    }
  }
}
</style>