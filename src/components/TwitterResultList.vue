<template>
  <ul class="resultList">
    <li
      class="resultList-item"
      v-for="tweets in data.list"
      :key="tweets.id"
    >
      <TwitterCard :info="tweets" />
    </li>
  </ul>
</template>
<script>
import { onBeforeMount, ref, reactive } from 'vue';
import axios from 'axios';
import TwitterCard from './TweetCard.vue';

export default {
  name: 'TwitterResultList',
  components: {
    TwitterCard,
  },
  setup() {
    const nextToken = ref('');
    const data = reactive({ list: [] });
    async function getTweets() {
      try {
        const res = await axios.get('/2/tweets/search/recent', {
          params: {
            query: '台灣',
            expansions: 'author_id',
            'user.fields': 'username,profile_image_url',
          },
          headers: { Authorization: `Bearer ${process.env.VUE_APP_TOKEN}` },
        });
        nextToken.value = res.data.meta.next_token;
        res.data.data.forEach((tweet) => {
          const newTweet = tweet;
          const result = res.data.includes.users.filter((user) => tweet.author_id === user.id);
          newTweet.name = result[0].name;
          newTweet.profile_image_url = result[0].profile_image_url;
          newTweet.username = result[0].username;
        });
        data.list = res.data.data;
      } catch (error) {
        console.log(error);
      }
    }
    onBeforeMount(() => {
      getTweets();
    });
    return { data };
  },
};
</script>
