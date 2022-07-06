import { createStore } from 'vuex';

export default createStore({
  state: {
    keyword: '台灣',
  },
  getters: {},
  mutations: {
    isSearch(state, keyword) {
      state.keyword = keyword;
    },
  },
  actions: {},
  modules: {},
});
