<template>
  <van-search v-model="searchVal" placeholder="请输入搜索关键词" @search="toSearchResultPage(searchVal)"/>
  <van-divider content-position="left">热门搜索</van-divider>

</template>

<script setup>

import {ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();
const searchVal = ref();

const toSearchResultPage = (searchVal) => {
  router.push({
    path: '/searchResult',
    query: {
      searchVal
    }
  });
}
</script>

<style scoped>

</style>
