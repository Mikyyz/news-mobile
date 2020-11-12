import Vue from 'vue'
import Vuex from 'vuex'
import store from 'store';

Vue.use(Vuex);

const USER_TOKEN = 'user-token'

export default new Vuex.Store({
  state: {
    user: store.get(USER_TOKEN), //当前登录用户的状态（token等数据）
    pageName: ['layout'] //动态添加缓存页面
  },
  mutations: {
    setUser(state, data) {
      state.user = data;
      //将数据持久化存储在本地
      store.set(USER_TOKEN, state.user);
    },
    //添加缓存页面
    addCachePages(state, pageName) {
      const isPageNameExist = state.pageName.includes(pageName)
      if (!isPageNameExist) {
        state.pageName.push(pageName)
      }
    },
    //移除缓存页面
    removeCachePages(state, pageName) {
      const index = state.pageName.indexOf(pageName);
      if (index !== -1) {
        state.pageName.splice(index, 1);
      }
    }
  },
  actions: {},
  modules: {}
})