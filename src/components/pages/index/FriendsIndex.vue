<template>
  <van-nav-bar  @click-left="showLeftUserPage" @click-right="toAddCommunityPage">
    <template #left>
      <van-icon name="wap-nav"/>
    </template>
    <template #right>
      <van-icon name="add" color="#ff3a3a" size="18"/>
    </template>
  </van-nav-bar>

  <LeftPopup ref="leftPopup"></LeftPopup>

  <van-row justify="center">
    <van-col span="23" style="font-size: 50%">
      我的关注
    </van-col>
  </van-row>

  <common-card-slot span="23" v-if="commLateList.length <= 0">
    <template #content>
      <div style="height: 50px;font-size: 50%;padding: 3% 20%">
        最近还没有人发动态，请稍后在试 (～￣▽￣)～
      </div>
    </template>
  </common-card-slot>

    <div v-for="comm in commLateList" v-else>
      <music-list-grid-long-slot src="src/assets/kunkun.jpg" intro="我不是小黑子" text="鸡你太美" radius="50px" span-image-left="3">
        <template #textBottom>
          <span style="line-height: 170%;font-size: 20%;">{{ comm.textContent }}</span>
          <van-row gutter="10">
            <van-col span="8" v-if="comm.imgList" v-for="img in comm.imgList">
              <van-image :src="`http://localhost:8081/api/image/${img}`" radius="10"/>
            </van-col>
            <common-card-slot span="24" v-if="comm.musicId">
              <template #content>
                <music-list-grid-long-slot src="src/assets/kunkun.jpg" intro="食不食油饼" text="cxk"
                                           style="background-color: #e9e9e9;border-radius: 10px"/>
              </template>
            </common-card-slot>

            <van-row style="font-size: 20%;width: 100%">
              <van-col span="6">
                <van-icon name="comment-o"/>
                <span>10w+</span></van-col>
            </van-row>
          </van-row>
        </template>
        <template #default>
          <van-icon name="wap-nav" v-if="comm.userId === user.userId" @click="showMusicListTools(comm.communityId)"/>
        </template>
      </music-list-grid-long-slot>

      <space-hr/>
    </div>

  <van-row justify="center">
    <van-col span="23" style="font-size: 50%">
      我的关注
    </van-col>
  </van-row>

  <space-hr/>

  <!--        卤出鸡脚了吧！树枝666，小黑子 苏珊，食不食油饼？耗丸吗？再黑紫砂吧！4年前的梗你们还在玩，4年前的剩饭你们怎么不吃？臻果粉！我看你们都馍蒸了！蒸梅油酥汁！你们犯法了知道吗？你们再这样我就煲胫了！香精煎鱼是吗？香翅捞饭是吗？真没有荚饺，荔枝？你要我怎么荔枝！？-->

  <common-card-slot span="23" v-if="commList.length <= 0">
    <template #content>
      <div style="height: 50px;font-size: 50%;padding: 3% 20%">
        你还没有关注的人，请稍后在试(/≧▽≦)/
      </div>
    </template>
  </common-card-slot>

  <div v-for="comm in commList" v-else>
    <music-list-grid-long-slot src="src/assets/kunkun.jpg" intro="我不是小黑子" text="鸡你太美" radius="50px" span-image-left="3">
      <template #textBottom>
        <span style="line-height: 170%;font-size: 20%;">{{ comm.textContent }}</span>
        <van-row gutter="10">
          <van-col span="8" v-if="comm.imgList" v-for="img in comm.imgList">
            <van-image :src="`http://localhost:8081/api/image/${img}`" radius="10"/>
          </van-col>
          <common-card-slot span="24" v-if="comm.musicId">
            <template #content>
              <music-list-grid-long-slot src="src/assets/kunkun.jpg" intro="食不食油饼" text="cxk"
                                         style="background-color: #e9e9e9;border-radius: 10px"/>
            </template>
          </common-card-slot>

          <van-row style="font-size: 20%;width: 100%">
            <van-col span="6">
              <van-icon name="comment-o"/>
              <span>10w+</span></van-col>
          </van-row>
        </van-row>
      </template>
      <template #default>
        <van-icon name="wap-nav" v-if="comm.userId === user.userId"/>
      </template>
    </music-list-grid-long-slot>

    <space-hr/>
  </div>

  <space-hr/>

  <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
  >
    <van-cell v-for="item in list" :key="item" :title="item"/>
  </van-list>

  <van-popup
      v-model:show="musicListToolsPopup"
      position="bottom"
      :style="{ height: '7%' }"
  >
    <van-cell title="删除" icon="delete-o" @click="deleteML"/>
  </van-popup>
</template>

<script setup>
import {onMounted, ref} from "vue";
import MusicListGridLongSlot from "../../common-slot/musicListGridLongSlot.vue";
import SpaceHr from "../../common/spaceHr.vue";
import CommonCardSlot from "../../common-slot/commonCardSlot.vue";
import {useRouter} from "vue-router";
import axios from "axios";

const router = useRouter();
const leftPopup = ref(null);
const list = ref([]);
const commList = ref([]);
const commLateList = ref([]);
const loading = ref(false);
const finished = ref(false);
const musicListToolsPopup = ref(false);
const communityId = ref();
const time = ref();
const result = ref();
const user = ref();

onMounted(() => {

  axios.get('/user/current', {}).then(function (res) {
    user.value = res.data.data
  })

  axios.get('/community/get/late',{}).then(function (res) {
    commLateList.value = res.data.data
  })

  getFeed(Date.now(), 0)
})

const onLoad = () => {
  setTimeout(() => {
    if (result.value == null) {
      finished.value = true;
    }
    getFeed(time.value, 1);
  }, 1000)
}

const getFeed = (minTime, offset) => {
  axios.get('/community/get/feed', {
    params: {
      max: minTime,
      offset: offset
    }
  }).then(function (res) {
    result.value = res.data.data;
    if (result.value != null) {
      time.value = result.value.minTime
      for (let i = 0; i < result.value.communityVoList.length; i++) {
        commList.value.push(result.value.communityVoList[i])
      }
      loading.value = false
    }
  })
}

const deleteML = () => {
  axios.get('/community/remove', {
    params: {
      commId: communityId.value
    }
  }).then(function (res) {
    location.reload()
  })
}

const showLeftUserPage = () => {
  leftPopup.value.showLeftPanel()
}

const showMusicListTools = (id) => {
  musicListToolsPopup.value = true
  communityId.value = id
}

const toAddCommunityPage = () => {
  router.push({
    path: '/addCommunity',
  });
}

</script>


<style scoped>

</style>
