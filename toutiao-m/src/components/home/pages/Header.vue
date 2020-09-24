<template>
    <div class="home-search">
        <van-row type="flex" align="center">
            <van-col span="2" class="arrow-left">
                <van-icon name="arrow-left" color="#fff" />
            </van-col>
            <van-col span="20">
                <van-search
                    background="#17c0c8"
                    v-model="value" 
                    placeholder="请输入搜索关键词"
                />
            </van-col>
            <van-col span="3" class="location">
                <van-icon name="location" class="location-icon" />
                <span>北京</span>
            </van-col>
        </van-row>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                value: '',
            }
        },
    }
</script>

<style lang="less" scoped>
.home-search {
    height: 55px;
    background-color: @bgColor;
}
.arrow-left {
    text-align: center;
    margin-top: 6px;
    font-size: 24px;
}
.location {
    font-size: 15px;
    margin-left: -6px;
    color: @textColor;
    display: flex;
    flex-direction: row;
    align-items: center;
}
</style>