<template>


  <van-row v-if="isLoading" class="is-loading-style" justify="center">
    <van-col span="1">
      <van-loading type="spinner" color="#c20c0c" size="24px"></van-loading>
    </van-col>
  </van-row>


  <div v-else>
    <search-top/>
    <!--    轮播-->
    <van-row justify="center">
      <van-col span="23">
        <van-swipe class="top-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="value in 6" v-if="!indexImg">
            <van-image src=""/>
          </van-swipe-item>
          <van-swipe-item v-for="img in indexImg" v-else>
            <van-image :src="`http://localhost:8081/api${img}`"/>
          </van-swipe-item>
        </van-swipe>
      </van-col>
    </van-row>


    <van-grid :border="false" :column-num="9">
      <van-grid-item v-for="icon in showList" :text="icon[1]">
        <template #icon v-if="icon[0] != null">
          <van-image :src="icon[0]"/>
        </template>
      </van-grid-item>
    </van-grid>


    <!--    推荐歌单部分-->
    <van-row justify="center">
      <van-col span="23" style="font-size: 50%">
        推荐歌单
        <van-icon name="arrow"/>
      </van-col>
    </van-row>
    <van-swipe class="popular-music-swipe index-van-swipe" :loop="false" :width="133">
      <van-swipe-item v-for="musicList in musicLists"
                      @click="toMusicList(musicList.musicListId,musicList.musicLikeNumber,musicList.musicFavoriteNumber)">
        <music-list-grid-square-slot :src="`http://localhost:8081/api/image/${musicList.showImgUrl}`"
                                     :text="musicList.musicListInfo"/>
      </van-swipe-item>
      <template #indicator></template>
    </van-swipe>

    <!--    虚线部分-->
    <space-hr/>

    <!--    猜你喜欢部分-->
    <van-row justify="center">
      <van-col span="23" style="font-size: 50%">
        猜你喜欢
        <van-icon name="arrow"/>
      </van-col>
    </van-row>
    <van-swipe :loop="false" class="you-like-swipe index-van-swipe">
      <van-swipe-item v-for="i in 3">
        <music-list-grid-long v-for="i in 3"/>
      </van-swipe-item>
      <template #indicator></template>
    </van-swipe>

    <space-hr/>

    <!--    排行榜部分-->
    <van-row justify="center">
      <van-col span="23" style="font-size: 50%">
        排行榜
        <van-icon name="arrow"/>
      </van-col>
    </van-row>

    <van-swipe :loop="false" class="list-swipe index-van-swipe">
      <van-swipe-item v-for="i in  3">
        <music-list-card/>
      </van-swipe-item>
      <template #indicator></template>
    </van-swipe>

    <space-hr/>

    <!--    数字专辑部分-->
    <van-row justify="center">
      <van-col span="23" style="font-size: 50%">
        新歌新碟 \ 数字专辑
        <van-icon name="arrow"/>
      </van-col>
    </van-row>
    <van-swipe :loop="false" class="you-like-swipe index-van-swipe">
      <van-swipe-item v-for="i in 3">
        <music-list-grid-long v-for="i in 3"/>
      </van-swipe-item>
      <template #indicator></template>
    </van-swipe>
  </div>


</template>

<script setup>

import {onMounted, ref} from "vue";
import MusicListGridLong from "../../common/musicListGridLong.vue";
import SpaceHr from "../../common/spaceHr.vue";
import MusicListCard from "../../common/musicListCard.vue";
import axios from "axios";
import {showFailToast} from "vant";
import MusicListGridSquareSlot from "../../common-slot/musicListGridSquareSlot.vue";
import {useRouter} from "vue-router";
import {getHotMusicList, getIndexImage} from "../../util/CommonUtils.js";

const router = useRouter();
const isLoading = ref(false);
const showList = [
  ['src/assets/list-list.png', '排行'],
  [],
  ['src/assets/list-calendar.png', '推荐'],
  [],
  ['src/assets/list-album.png', '专辑'],
  [],
  ['src/assets/list-playlist.png', '歌单'],
  [],
  ['src/assets/list-radio.png', 'fm'],
];
const musicLists = ref();
const indexImg = ref();
const hotMusic = ref();


onMounted(async () => {
  //获取主页图片

  indexImg.value =  await getIndexImage;
  // axios.get('/index/get/img', {}).then(function (res) {
  //   indexImg.value = res.data.data;
  // })

  //获取歌单
  musicLists.value = await getHotMusicList;
  // axios.get('/music/list/get/hot', {}).then(function (res) {
  //   musicLists.value = res.data.data
  // })

  axios.get('/music/hot', {}).then(function (res) {
    hotMusic.value = res.data.data
  })
})

const toMusicList = (musicListId, likeNum, favoriteNum) => {
  router.push({
    path: '/musicList',
    query: {
      musicListId, likeNum, favoriteNum
    }
  });
}


</script>

<style scoped>
.top-swipe {
  color: #fff;
  font-size: 20px;
  background-color: #39a9ed;
  border-radius: 10px;
}


.index-van-swipe {
  margin: 4% 0 1% 0;
}


/*推荐歌单  猜你喜欢  排行榜*/
.popular-music-item .you-like-swipe .list-swipe {
  font-size: 20px;
}

.is-loading-style {
  margin-top: 40%;
}

</style>
