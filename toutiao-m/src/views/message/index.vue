<template>
  <div class="message">
    <!-- 头部 -->
    <van-nav-bar class="chat-header" left-arrow @click-left="$router.back()">
      <van-dropdown-menu active-color="#1989fa" slot="title">
        <van-dropdown-item v-model="defaultValue" :options="dropdownOptions" @change="handleChangedropdown"/>
      </van-dropdown-menu>
    </van-nav-bar>
    <van-empty :description="`暂无${defalutText}`" />
  </div>
</template>

<script>
export default {
  data() {
    return {
        defaultValue: 0,
        defalutText: '全部消息',
        dropdownOptions: [
                { text: "全部消息", value: 0 },
                { text: "系统通知", value: 1 },
                { text: "评论", value: 2 },
                { text: "新增粉丝", value: 3 },
                { text: "点赞", value: 4 },
                { text: "@我", value: 5 },
            ],
        };
    },
    methods: {
        handleChangedropdown(value) {
            switch (value) {
                case 1:
                    this.defalutText="系统通知"
                    break;
                case 2:
                    this.defalutText="评论"
                    break;
                case 3:
                    this.defalutText="新增粉丝"
                    break;
                case 4:
                    this.defalutText="点赞"
                    break;
                case 5:
                    this.defalutText="@我"
                    break;
                default:
                    this.defalutText="全部消息"
            }
        }
    },
};
</script>

<style lang="less" scoped>
</style>