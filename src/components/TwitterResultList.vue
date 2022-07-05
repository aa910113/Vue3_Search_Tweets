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
import {
  onBeforeMount, onMounted, ref, reactive, watch,
} from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';
import TwitterCard from './TweetCard.vue';

export default {
  name: 'TwitterResultList',
  components: {
    TwitterCard,
  },
  setup() {
    const store = useStore();
    const getApi = ref(false);
    const scrollHeight = ref(0);
    const clientHeight = ref(0);
    const scrollTop = ref(0);
    const data = reactive({ list: [] });
    const params = reactive({
      query: store.state.keyword,
      next_token: '',
      expansions: 'author_id',
      'tweet.fields': 'created_at',
      'user.fields': 'username,profile_image_url',
    });
    async function getTweets() {
      try {
        if (!params.next_token) {
          delete params.next_token;
        }
        const res = await axios.get('/2/tweets/search/recent', {
          params,
          headers: { Authorization: `Bearer ${process.env.VUE_APP_TOKEN}` },
        });
        params.next_token = res.data.meta.next_token;
        res.data.data.forEach((tweet) => {
          const newTweet = tweet;
          const result = res.data.includes.users.filter(
            (user) => tweet.author_id === user.id,
          );
          newTweet.name = result[0].name;
          newTweet.profile_image_url = result[0].profile_image_url;
          newTweet.username = result[0].username;
          data.list.push(newTweet);
          getApi.value = false;
          scrollHeight.value = document.documentElement.scrollHeight;
        });
      } catch (error) {
        alert(error);
      }
    }

    watch(getApi, (newValue) => {
      if (newValue) {
        getTweets();
      }
    });

    onMounted(() => {
      window.addEventListener('scroll', () => {
        clientHeight.value = document.documentElement.clientHeight; // 當前可視的頁面高度
        scrollTop.value = document.documentElement.scrollTop; // 滾動條距離頂部的高度
        scrollHeight.value = document.documentElement.scrollHeight; // 當前頁面的總高度
        if (
          scrollTop.value + clientHeight.value >= scrollHeight.value - 200
          && !getApi.value
        ) {
          getApi.value = true;
        }
      });
    });

    onBeforeMount(() => {
      getTweets();
    });
    return { data };
  },
};
</script>
