<template>
  <div
    class="card"
    @click="openThisTweets(info.id)"
    @keydown="openThisTweets(info.id)"
  >
    <div class="card-header">
      <img
        class="card-img"
        :src="info.profile_image_url"
        :alt="info.name"
      >
    </div>
    <div class="card-body">
      <h4 class="card-name">{{ info.name }}</h4>
      <span v-html="info.text"></span>
      <p class="card-date">{{ info.created_at }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TwitterCard',
  props: {
    info: Object,
  },
  setup() {
    function openThisTweets(id) {
      window.open(`https://twitter.com/UIong/status/${id}`);
    }
    return { openThisTweets };
  },
};
</script>
