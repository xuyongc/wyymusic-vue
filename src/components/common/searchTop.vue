<template>
  <van-nav-bar @click-left="showLeftUserPage" @click-right="toSearch">
    <template #left>
      <van-icon name="wap-nav"/>
    </template>
    <template #right>
      <van-icon name="search" size="18"/>
    </template>
  </van-nav-bar>

  <LeftPopup ref="leftPopup"></LeftPopup>

</template>

<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
const leftPopup = ref(null);

const router = useRouter();

const showLeftUserPage = () => {
  leftPopup.value.showLeftPanel()
}

const toSearch = () =>{
  router.push({
    path:'/search'
  })
}
</script>

<style scoped>

</style>
