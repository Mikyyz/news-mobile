<template>
    <div class="home">
        <HomeHeader />
        <HomeSwiper />
    </div>
</template>

<script>
import HomeHeader from './pages/Header';
import HomeSwiper from './pages/HomeSwiper';
    export default {
        components: {
            HomeHeader,
            HomeSwiper
        }
    }
</script>

<style lang="less" scoped>

</style>