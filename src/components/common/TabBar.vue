<template>
  <van-tabbar v-model="active" active-color="#c20c0c" v-show="route.meta.isShowTabBar">
    <van-tabbar-item to="/">
      <span>发现</span>
      <template #icon="props">
        <img :src="props.active ? index_icon.active : index_icon.inactive" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item to="/radio">
      <span>播客</span>
      <template #icon="props">
        <img :src="props.active ? radio_icon.active : radio_icon.inactive" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item to="/my">
      <span>我的</span>
      <template #icon="props">
        <img :src="props.active ? my_icon.active : my_icon.inactive" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item to="/friends">
      <span>关注</span>
      <template #icon="props">
        <img :src="props.active ? friends_icon.active : friends_icon.inactive" />
      </template>
    </van-tabbar-item>

  </van-tabbar>
</template>

<script setup>
import {ref} from "vue";
import {useRoute} from "vue-router";
const active = ref(0);


const route = useRoute();
const index_icon = {
  active: 'src/assets/music-index.png',
  inactive: 'src/assets/music-index-update.png'
};

const radio_icon = {
  active: 'src/assets/radio.png',
  inactive: 'src/assets/radio-update.png'
};

const my_icon = {
  active: 'src/assets/my.png',
  inactive: 'src/assets/my-update.png'
};

const friends_icon = {
  active: 'src/assets/friends.png',
  inactive: 'src/assets/friends-update.png'
};
</script>

<style scoped>

</style>
