<template>

  <search-top/>
  <van-image
      round
      width="3rem"
      height="3rem"
      src="src/assets/my-image.png"
      class="login_img"
  />

  <common-card-slot span="23" style="margin-bottom: 4%;margin-top: 16%" @click="toLoginChoose">
    <template #content class="music-list-grid-long-slot-style">
      <div class="login_card">
        <div v-if="user" @click="toUpdateUserPage">
          {{ user.nickName }}
        </div>
        <div v-else>
          立即登录 >
        </div>
      </div>
    </template>
  </common-card-slot>

  <common-card-slot span="23">
    <template #content>
      <van-grid icon-size="120%">
        <van-grid-item icon-color="#ff4545" icon="play-circle" text="最近播放"/>
        <van-grid-item icon-color="#ff4545" icon="music" text="本地/下载"/>
        <van-grid-item icon-color="#ff4545" icon="bag" text="已购"/>
        <van-grid-item icon-color="#ff4545" icon="friends" text="我的好友"/>
      </van-grid>
      <van-row justify="center">
        <van-col span="5" style="font-size: 5%;margin: 2% 0;color: #b0b0b0">
          + 更多应用
        </van-col>
      </van-row>
    </template>
  </common-card-slot>

  <common-card-slot span="23" class="common-card-slot-style" @click="showMyMusicPage">
    <template #content>
      <music-list-grid-long-slot src="src/assets/kunkun.jpg" intro="我喜欢的音乐" :text="`${myFavoriteMusic.length}首`"
                                 class="music-list-grid-long-slot-style"/>
    </template>
  </common-card-slot>

  <van-tabs v-model:active="tabIndex" scrollspy sticky color="#fe7373">
    <!--    创建歌单部分-->
    <!--    有显示-->
    <van-tab title="创建歌单">
      <common-card-slot span="23" v-if="myCreateMusicList.length <= 0" style="margin: 5% 0;">
        <template #content>
          <van-cell title="创建歌单" icon="plus" @click="showCreatePopUp"/>
          <div style="height: 50px;font-size: 50%;padding: 3% 35%">
            你还没有创建歌单
          </div>
        </template>
      </common-card-slot>

      <!--    没有显示-->
      <!--      <common-card-slot span="23" class="common-card-slot-style" v-else>-->
      <!--        <template #content>-->
      <!--          <van-cell title="创建歌单" icon="plus" @click="showCreatePopUp"/>-->
      <!--          <music-list-grid-long-slot :src="`http://localhost:8081/api/image/${createMusicList.showImgUrl}`"-->
      <!--                                     :intro="createMusicList.musicListInfo" text="0首"-->
      <!--                                     class="music-list-grid-long-slot-style"-->
      <!--                                     v-for="createMusicList in myCreateMusicList">-->
      <!--            <template #default>-->
      <!--              <van-icon name="wap-nav" @click="showMusicListTools(createMusicList.musicListId)"/>-->
      <!--            </template>-->
      <!--          </music-list-grid-long-slot>-->
      <!--        </template>-->
      <!--      </common-card-slot>-->
      <div v-else style="margin-top: 5%">
        <van-cell title="创建歌单" icon="plus" @click="showCreatePopUp"/>
        <show-music-list :music-list="myCreateMusicList"/>
      </div>

    </van-tab>


    <!--    收藏歌单部分-->
    <van-tab title="收藏歌单">
      <!--    没有显示-->
      <common-card-slot span="23" v-if="myFavoriteMusicList.length <= 0">
        <template #content>
          <div style="height: 50px;font-size: 50%;padding: 3% 35%">
            你还没有收藏歌单
          </div>
        </template>
      </common-card-slot>
      <!--    有显示-->
<!--      <common-card-slot span="23" class="common-card-slot-style" v-else>-->
<!--        <template #content>-->
<!--          <music-list-grid-long-slot src="src/assets/kunkun.jpg" intro="鸡你太美" text="0首"-->
<!--                                     class="music-list-grid-long-slot-style" v-for="i in 10">-->
<!--            <template #default>-->
<!--              <van-icon name="wap-nav"/>-->
<!--            </template>-->
<!--          </music-list-grid-long-slot>-->
<!--        </template>-->
<!--      </common-card-slot>-->
      <show-music-list :music-list="myFavoriteMusicList"/>
    </van-tab>
  </van-tabs>

  <van-popup
      v-model:show="createMusicListPopup"
      position="bottom"
      :style="{ height: '30%' }"
  >
    <van-cell-group inset>
      <van-field v-model="createMLTitle" placeholder="新建歌曲标题"/>
    </van-cell-group>
    <van-uploader v-model="createMLImage" multiple :max-count="1" :after-read="setFile" style="margin-left: 20px"/>
    <van-button type="primary" size="large" @click="createML(imgFile,createMLTitle)">完成</van-button>
  </van-popup>

  <!--  <van-popup-->
  <!--      v-model:show="musicListToolsPopup"-->
  <!--      position="bottom"-->
  <!--      :style="{ height: '7%' }"-->
  <!--  >-->
  <!--    <van-cell title="删除" icon="delete-o" @click="deleteML"/>-->
  <!--  </van-popup>-->

  <van-popup
      v-model:show="showMyMusicPopUp"
      position="bottom"
      :style="{ height: '90%' }"
  >
    <show-music :music-list="myFavoriteMusic"/>
  </van-popup>
</template>

<script setup>
import {onMounted, ref} from "vue";
import CommonCardSlot from "../../common-slot/commonCardSlot.vue";
import MusicListGridLongSlot from "../../common-slot/musicListGridLongSlot.vue";
import {useRouter} from "vue-router";
import axios from "axios";
import SearchTop from "../../common/searchTop.vue";
import ShowMusic from "../../common-show/ShowMusic.vue";
import ShowMusicList from "../../common-show/ShowMusicList.vue";

const router = useRouter();
const tabIndex = ref(0);
const myCreateMusicList = ref([]);
const myFavoriteMusicList = ref([]);
const myFavoriteMusic = ref([]);
const createMusicListPopup = ref(false);
const showMyMusicPopUp = ref(false);
const createMLTitle = ref();
const createMLImage = ref([]);
const imgFile = ref();
let imagePath = ref();
const user = ref();


onMounted(async () => {

  await axios.get('/user/current', {}).then(function (res) {
    user.value = res.data.data
  })

  await axios.get('/music/list/get', {
    params: {
      userId: user.value.userId
    }
  }).then(function (res) {
    myCreateMusicList.value = res.data.data
  })

  await axios.get('/music/list/get/favorite', {}).then(function (res) {
    myFavoriteMusicList.value = res.data.data
  })

  await axios.get('/music/get/favorite', {}).then(function (res) {
  })

  await axios.get('/music/get/favorite').then(function (res) {
    myFavoriteMusic.value = res.data.data
  })
})
const showCreatePopUp = () => {
  createMusicListPopup.value = true;
}

const setFile = (imageFile) => {
  imgFile.value = imageFile
}

const createML = async (imageFile, musicListInfo) => {
  imagePath = await fileUpload(imageFile);
  await axios.post('/music/list/create', {
    showImgUrl: imagePath.data.data,
    musicListInfo: musicListInfo
  }).then(function (res) {
    location.reload()
  })
}

// const deleteML = () => {
//   axios.get('/music/list/removeList', {
//     params: {
//       musicListId: musicListId.value
//     }
//   }).then(function (res) {
//     location.reload()
//   })
// }

const fileUpload = (imageFile) => {
  if (imageFile === null) {
    return;
  }
  let param = new FormData();
  param.append("imageFile", imageFile.file);
  return axios.post('/upLoad/image', param, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// const showMusicListTools = (Id) => {
//   musicListToolsPopup.value = true
//   musicListId.value = Id
// }

const showMyMusicPage = () => {
  showMyMusicPopUp.value = true;
}

const toUpdateUserPage = () => {

}

const toLoginChoose = () => {
  if (user.value == null) {
    router.push({
      path: '/login/phone'
    });
  }
}

</script>

<style scoped>
.music-list-grid-long-slot-style {
  padding: 3% 0
}

.login_img {
  position: absolute;
  left: 50%;
  top: 15%;
  transform: translate(-50%, -50%);
  z-index: 2;
}

.login_card {
  padding: 8% 0 10% 0;
  margin: 0 auto;
  width: fit-content;
  font-size: 80%;
}

.common-card-slot-style {
  margin: 4% 0;
}


</style>
