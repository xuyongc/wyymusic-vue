<template>
  <search-top-slot title="搜索结果"/>
  <common-card-slot span="23" v-if="searchMusicResult.length <= 0 && searchMusicListResult.length <= 0">
    <template #content>
      <div style="height: 50px;font-size: 50%;padding: 3% 15%">
        搜不到(┬┬﹏┬┬)？,要不重新试一下 (/≧▽≦)/ ！
      </div>
    </template>
  </common-card-slot>
  <div v-else>

    <van-row justify="center">
      <van-col span="23" style="font-size: 50%;margin: 5% 0">
        歌曲
        <van-icon name="arrow"/>
      </van-col>
    </van-row>
    <common-card-slot span="23" class="common-card-slot-style">
      <template #content>
        <music-list-grid-long-slot :src="`http://localhost:8081/api/image/${music.showImgUrl}`"
                                   :intro="music.musicTitle"
                                   class="music-list-grid-long-slot-style"
                                   v-for="music in searchMusicResult">
          <template #default>
            <van-icon name="wap-nav" @click="showMusicListTools(music.musicListId)"/>
          </template>
        </music-list-grid-long-slot>
      </template>
    </common-card-slot>

    <van-row justify="center">
      <van-col span="23" style="font-size: 50%;margin: 5% 0">
        歌单
        <van-icon name="arrow"/>
      </van-col>
    </van-row>
    <common-card-slot span="23" class="common-card-slot-style">
      <template #content>
        <music-list-grid-long-slot :src="`http://localhost:8081/api/image/${musicList.showImgUrl}`"
                                   :intro="musicList.musicListInfo" text="0首"
                                   class="music-list-grid-long-slot-style"
                                   v-for="musicList in searchMusicListResult">
          <template #default>
            <van-icon name="wap-nav" @click="showMusicListTools(musicList.musicListId)"/>
          </template>
        </music-list-grid-long-slot>
      </template>
    </common-card-slot>
  </div>

</template>

<script setup>
import CommonCardSlot from "../../common-slot/commonCardSlot.vue";
import MusicListGridLongSlot from "../../common-slot/musicListGridLongSlot.vue";
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import axios from "axios";


const route = useRoute();
const searchMusicResult = ref([])
const searchMusicListResult = ref([])
const searchContext = ref({
  searchVal : route.query.searchVal
});

onMounted(() =>{
  axios.post('/music/search',{
    context: searchContext.value.searchVal,
    pageNumber: 0,
    pageSize: 10
  }).then(function (res) {
    searchMusicResult.value = res.data.data
    console.log(res.data.data)
  })

  axios.post('/music/list/search',{
    context: searchContext.value.searchVal,
    pageNumber: 0,
    pageSize: 10
  }).then(function (res) {
    searchMusicListResult.value = res.data.data
    console.log(res.data)
  })
})
</script>

<style scoped>

</style>
