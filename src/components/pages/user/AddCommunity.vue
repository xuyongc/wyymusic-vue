<template>
  <search-top-slot title="发布动态"/>

  <van-cell-group inset>
    <van-field
        v-model="textContext"
        rows="2"
        autosize
        type="textarea"
        maxlength="100"
        placeholder="请输入留言"
        show-word-limit
    />
  </van-cell-group>

  <van-uploader v-model="imageFileList" multiple :max-count="9" style="margin: 0 5%"/>

  <van-button type="primary" size="large" @click="saveComm(textContext)">发布</van-button>
</template>

<script setup>
import {ref} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";

const router = useRouter();
const textContext = ref();
const imageFileList = ref([]);
const imageFilePath = ref([]);
let imagePath = ref();


const saveComm = async (text) => {
  if (imageFileList.value.length > 0){
    for (let i = 0; i < imageFileList.value.length; i++) {
      imagePath = await fileUpload(imageFileList.value[i]);
      imageFilePath.value.push(imagePath.data.data)
    }
  }

  await axios.post('/community/add', {
    title: "这是一个标题",
    text: text,
    imgList: imageFilePath.value,
    musicId: null
  }).then(function () {
    router.push({
      path: '/friends'
    })
  })
}

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


</script>

<style scoped>

</style>
