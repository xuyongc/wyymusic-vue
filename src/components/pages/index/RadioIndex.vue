<template>
<!--播客界面-->
  <van-row v-for="i in 10">
    <van-col span="12" v-for="i in 2">
      <van-space direction="vertical" fill :size="0">
        <van-image src="src/assets/kunkun.jpg"/>
        <div style="font-size: 70%;padding: 0 5px;margin-bottom: 10px">
          <van-text-ellipsis :content="text" />
          <span style="color: #777777">C</span>
        </div>
      </van-space>
    </van-col>
  </van-row>
</template>

<script setup>
import {ref} from "vue";
const text = ref('小黑子，必备歌曲，大锦集，100首歌都是经典')

</script>

<style scoped>

</style>
