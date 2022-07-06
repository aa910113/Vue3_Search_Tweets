<template>
  <div class="searchBox">
    <label
      for="search"
      class="searchBox-search-label"
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        class="searchBox-search-icon"
      >
        <g>
          <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9
        9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66
        3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135
        3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
        </g>
      </svg>
      <input
        type="search"
        id="search"
        class="searchBox-search-input"
        placeholder="搜尋關鍵字"
        v-model="keyword"
        @keyup.enter="search"
      >
    </label>
    <button class="searchBox-search-button" @click="search">搜尋</button>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'TwitterSearchBox',
  setup() {
    const store = useStore();
    const keyword = ref('');
    keyword.value = store.state.keyword;
    function search() {
      store.commit('isSearch', keyword.value);
    }
    return { store, keyword, search };
  },
};
</script>
