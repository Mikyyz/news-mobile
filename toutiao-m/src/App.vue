<template>
  <div id="app">
    <keep-alive :include="pageName">
      <router-view/>
    </keep-alive>
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
      computed: {
        ...mapState(['pageName'])
      },
  }
</script>

<style lang="less">

</style>
