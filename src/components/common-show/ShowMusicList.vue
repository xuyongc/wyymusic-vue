<template>
  <common-card-slot span="23" class="common-card-slot-style">
    <template #content>
      <music-list-grid-long-slot :src="`http://localhost:8081/api/image/${musics.showImgUrl}`"
                                 :intro="musics.musicListInfo" text="0首"
                                 class="music-list-grid-long-slot-style"
                                 v-for="musics in props.musicList">
        <template #default>
          <van-icon name="wap-nav" @click="showMusicListTools(musics.musicListId)"/>
        </template>
      </music-list-grid-long-slot>
    </template>
  </common-card-slot>

  <van-popup
      v-model:show="musicListToolsPopup"
      position="bottom"
      :style="{ height: '7%' }"
  >

    <van-cell title="删除" icon="delete-o" @click="deleteML"/>
  </van-popup>
</template>

<script setup>
import axios from "axios";
import {useRouter} from "vue-router";
import {ref} from "vue";

const router = useRouter();
const musicListToolsPopup = ref(false);
const musicListId = ref();

const props = defineProps({
  musicList: [],
  userId: Number
})

const deleteML = () => {
  axios.get('/music/list/removeList', {
    params: {
      musicListId: musicListId.value
    }
  }).then(function (res) {
    location.reload()
  })
}

const showMusicListTools = (Id) => {
  musicListToolsPopup.value = true
  musicListId.value = Id
}

</script>

<style scoped>
.music-list-grid-long-slot-style {
  padding: 3% 0
}

.common-card-slot-style {
  margin: 4% 0;
}
</style>
