<template>
  <transition name="vue_body">
    <router-view/>
  </transition>
<!--  <down-music-card/>-->
  <TabBar></TabBar>
</template>

<script setup>

import TabBar from "./components/common/TabBar.vue";
import DownMusicCard from "./components/common/downMusicCard.vue";


</script>

<style scoped>

</style>
