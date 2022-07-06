<template>
  <main class="container main">
    <aside class="aside">
      <TwitterSearchBox />
    </aside>
    <article class="article">
      <TwitterResultList />
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </article>
  </main>
</template>

<script>
import TwitterSearchBox from './components/TwitterSearchBox.vue';
import TwitterResultList from './components/TwitterResultList.vue';

export default {
  name: 'App',
  components: {
    TwitterSearchBox,
    TwitterResultList,
  },
};
</script>

<style lang="scss">
@import './assets/scss/all';
</style>
