<template>
<main class="container main">
  <aside class="aside">
    <TwitterSearchBox />
  </aside>
  <article class="article"></article>
</main>
</template>

<script>
import TwitterSearchBox from './components/TwitterSearchBox.vue';

export default {
  name: 'App',
  components: {
    TwitterSearchBox,
  },
};
</script>

<style lang="scss">
@import './assets/scss/all';
</style>
