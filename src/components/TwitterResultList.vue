<template>
  <ul class="resultList">
    <li class="resultList-item" v-for="tweets in data.list" :key="tweets.id">
      <TwitterCard :info="tweets"/>
    </li>
  </ul>
</template>
<script>
import { onBeforeMount, reactive } from 'vue';
import axios from 'axios';
import TwitterCard from './TweetCard.vue';

export default {
  name: 'TwitterResultList',
  components: {
    TwitterCard,
  },
  setup() {
    const data = reactive({ list: [] });
    onBeforeMount(async () => {
      try {
        const res = await axios.get('/2/tweets/search/recent', {
          params: {
            query: '台灣',
          },
          headers: { Authorization: `Bearer ${process.env.VUE_APP_TOKEN}` },
        });
        data.list = res.data.data;
      } catch (error) {
        console.log(error);
      }
    });
    return { data };
  },
};
</script>
