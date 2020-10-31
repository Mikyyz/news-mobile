<template>
  <div class="edit-city">
    <van-picker show-toolbar title="选择地区" :columns="columns" @change="onChange" @confirm="onConfirm"/>
  </div>
</template>

<script>
import axios from 'axios';
import store from 'store';
export default {
  data() {
    return {
      columns: store.get('city') || [], //存放三级城市数据
      city: [] //选择的地区
    };
  },
  created () {
      if(store.get('city')) return;
      this.loadCitydata();
  },
  methods: {
      async loadCitydata() {
          try {
              const { data } = await axios.get('/city.json');
              store.set('city', data.data)
          } catch (err) {
              console.log(err);
          }
      },
      onChange(picker, value, index) {
          this.city = value;
      },
      onConfirm() {
          
      }
  },
};
</script>

<style lang="less" scoped>
</style>