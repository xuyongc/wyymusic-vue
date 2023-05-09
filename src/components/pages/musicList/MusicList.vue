<template>

  <search-top-slot title="歌单"/>


  <van-row justify="center" style="margin: 5% 0">
    <van-col span="8">
      <van-button type="primary" round class="button" @click="setLike(musicList.musicListId)">
        <van-icon name="good-job-o"/>
        点赞
      </van-button>
    </van-col>
    <van-col span="8">
      <van-button type="primary" round class="button" @click="toComment(musicList.musicListId)">
        <van-icon name="chat-o"/>
        评论
      </van-button>
    </van-col>
    <van-col span="8">
      <van-button type="primary" round class="button" @click="setFavorite(musicList.musicListId)">
        <van-icon name="add-o"/>
        收藏
      </van-button>
    </van-col>
  </van-row>


  <show-music :music-list="musics"/>
<!--  <common-card-slot span="23" class="common-card-slot-style">-->
<!--    <template #content>-->
<!--      <music-list-grid-long-slot :src="`http://localhost:8081/api/image/${music.showImgUrl}`"-->
<!--                                 :intro="music.musicTitle"-->
<!--                                 class="music-list-grid-long-slot-style" v-for="music in musics">-->
<!--        <template #default>-->
<!--          <van-icon name="wap-nav" @click="userUseTools(music.showImgUrl,music.musicTitle,music.musicId)"/>-->
<!--        </template>-->
<!--      </music-list-grid-long-slot>-->
<!--    </template>-->
<!--  </common-card-slot>-->

<!--  <van-popup-->
<!--      v-model:show="showBottom"-->
<!--      position="bottom"-->
<!--      :style="{ height: '40%' }"-->
<!--  >-->
<!--    <van-cell-group>-->

<!--      <common-card-slot span="23" class="common-card-slot-style" style="margin-top: 5%;">-->
<!--        <template #content>-->
<!--          <music-list-grid-long-slot :src="`${common.BASE_IMAGE_PREFIX}${music[0]}`"-->
<!--                                     :intro="music[1]"-->
<!--                                     class="music-list-grid-long-slot-style">-->
<!--          </music-list-grid-long-slot>-->
<!--        </template>-->
<!--      </common-card-slot>-->

<!--      <van-cell title="播放" icon="music-o"/>-->
<!--      <van-cell title="添加到我喜欢的音乐" icon="like-o" @click="favoriteMusic(music[2])"/>-->
<!--      <van-cell title="添加到歌单" icon="add-o" @click=""/>-->
<!--      <van-cell title="评论" icon="comment-circle-o" @click="toComment(music[2])"/>-->
<!--    </van-cell-group>-->
<!--  </van-popup>-->
</template>

<script setup>
import CommonCardSlot from "../../common-slot/commonCardSlot.vue";
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import axios from "axios";
import MusicListGridLongSlot from "../../common-slot/musicListGridLongSlot.vue";
import common from "../../constant/common.js";
import ShowMusic from "../../common-show/ShowMusic.vue";

const router = useRouter();
const music = ref([]);
const showBottom = ref(false);
const route = useRoute();
const musics = ref();
const musicList = ref({
  musicListId: route.query.musicListId,
  likeNum: route.query.likeNum,
  favoriteNum: route.query.favoriteNum
});

onMounted(() => {
  axios.get('/music/list/get/music', {
    params: {musicListId: musicList.value.musicListId}
  }).then(function (res) {
    musics.value = res.data.data
  })
})

const userUseTools = (showImgUrl, musicTitle, musicId) => {
  showBottom.value = true;
  music.value = []
  music.value.push(showImgUrl, musicTitle, musicId)
}

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

const setLike = (id) => {
  axios.get('/music/list/like', {
    params: {
      musicListId: id
    }
  }).then(function (res) {

  })
}

const setFavorite = (id) => {
  axios.get('/music/list/set/favorite', {
    params: {
      musicListId: id
    }
  }).then(function (res) {

  })
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
.button {
  width: 120px;
}
</style>
