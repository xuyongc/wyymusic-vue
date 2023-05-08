<template>


  <common-card-slot span="23" class="common-card-slot-style">
    <template #content>
      <music-list-grid-long-slot :src="`http://localhost:8081/api/image/${music.showImgUrl}`"
                                 :intro="music.musicTitle"
                                 class="music-list-grid-long-slot-style" v-for="music in musicList">
        <template #default>
          <van-icon name="wap-nav" @click="userUseTools(music.showImgUrl,music.musicTitle,music.musicId)"/>
        </template>
      </music-list-grid-long-slot>
    </template>
  </common-card-slot>


  <van-popup
      v-model:show="showBottom"
      position="bottom"
      :style="{ height: '40%' }"
  >
    <van-cell-group>

      <common-card-slot span="23" class="common-card-slot-style" style="margin-top: 5%;">
        <template #content>
          <music-list-grid-long-slot :src="`${common.BASE_IMAGE_PREFIX}${music[0]}`"
                                     :intro="music[1]"
                                     class="music-list-grid-long-slot-style">
          </music-list-grid-long-slot>
        </template>
      </common-card-slot>

      <van-cell title="播放" icon="music-o"/>
      <van-cell title="添加到我喜欢的音乐" icon="like-o" @click="favoriteMusic(music[2])"/>
      <van-cell title="添加到歌单" icon="add-o" @click=""/>
      <van-cell title="评论" icon="comment-circle-o" @click="toComment(music[2])"/>
    </van-cell-group>
  </van-popup>
</template>

<script setup>
import CommonCardSlot from "../common-slot/commonCardSlot.vue";
import MusicListGridLongSlot from "../common-slot/musicListGridLongSlot.vue";
import axios from "axios";
import {useRouter} from "vue-router";
import common from "../constant/common.js";
import {ref} from "vue";

const router = useRouter();
const music = ref([]);
const showBottom = ref(false);
const props = defineProps({
  musicList: [],
  musicListId: Number
})

const favoriteMusic = (musicId) => {
  axios.get('music/set/favorite', {
    params: {
      musicId: musicId
    }
  }).then(function (res) {
    if (res.data.code === 200) {
      showBottom.value = false;
    }
  })
}

const userUseTools = (showImgUrl, musicTitle, musicId) => {
  showBottom.value = true;
  music.value = []
  music.value.push(showImgUrl, musicTitle, musicId)
}

const toComment = (musicId) => {
  router.push({
    path: '/comment',
    query: {
      musicId
    }
  });
}
</script>

<style scoped>

</style>
