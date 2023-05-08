<template>
  <van-sticky :offset-bottom="50" position="bottom">
    <common-card-slot span="24">
      <template #content>
        <music-list-grid-long-slot src="src/assets/kunkun.jpg" intro="食不食油饼" span-image-left="3" span-text-right="20"
                                   span-default-in-right="5" span-text-in-left="19">
          <template #default>
            <van-row gutter="20">
              <van-col span="8">
                <div @click="setShowingOrStop">
                  <van-icon v-if="isShowing" name="play" @click="play"/>
                  <van-icon v-else name="pause" @click="pause"/>
                </div>
              </van-col>
              <van-col span="8">
                <van-icon name="bars"/>
              </van-col>
            </van-row>

          </template>
        </music-list-grid-long-slot>
      </template>
    </common-card-slot>
  </van-sticky>
</template>

<script setup>
import CommonCardSlot from "../common-slot/commonCardSlot.vue";
import MusicListGridLongSlot from "../common-slot/musicListGridLongSlot.vue";

import { ref} from "vue";

const url = ref();
const audio = new Audio();
const isShowing = ref(true);
audio.src = 'http://localhost:8081/api/music/202305123_212738468.mp3';

const setShowingOrStop = () => {
  isShowing.value = !isShowing.value
}

const play = () =>{
  audio.play();
}

const pause = () =>{
  audio.pause()
}


</script>

<style scoped>

</style>
