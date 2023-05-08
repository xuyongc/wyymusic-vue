<template>
  <van-nav-bar
      :left-text="props.title"
      left-arrow
      @click-left="back"
  />

</template>

<script setup>
import {useRouter} from "vue-router";

const router = useRouter();


const props = defineProps({
  title:String
})

const back = () =>{
  router.back();
}

</script>

<style scoped>

</style>
