import Vue from 'vue'
import Vuex from 'vuex'
import store from 'store';

Vue.use(Vuex);

const USER_TOKEN = 'toutiao-user'

export default new Vuex.Store({
  state: {
    user: store.get(USER_TOKEN) //当前登录用户的状态（token等数据）
  },
  mutations: {
    setUser(state, data) {
      state.user = data;
      //将数据持久化存储在本地
      store.set(USER_TOKEN, state.user);
    }
  },
  actions: {},
  modules: {}
})