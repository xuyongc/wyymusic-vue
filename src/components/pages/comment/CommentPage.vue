<template>
  <search-top-slot title="评论"/>

  <van-row justify="center">
    <van-col span="23" style="font-size: 50%;margin: 5% 0">
      评论
      <van-icon name="arrow"/>
    </van-col>
  </van-row>


  <common-card-slot span="23" v-if="commentList.length <= 0">
    <template #content>
      <div style="height: 50px;font-size: 50%;padding: 3% 30%">
        评论区怎么为空(＃°Д°)
      </div>
    </template>
  </common-card-slot>

  <div v-else v-for="comment in commentList">
    <music-list-grid-long-slot src="src/assets/kunkun.jpg" intro="我不是小黑子" radius="50px" span-image-left="3">
      <template #textBottom>
        <span style="line-height: 170%;font-size: 20%;">{{ comment.content }}</span>
      </template>
      <template #default>
        <van-icon name="wap-nav" v-if="comment.userId === user.userId"
                  @click="deleteOrUpdateMyComment(comment.commentId)"/>
      </template>
    </music-list-grid-long-slot>

    <span style="font-size: 5%"
          @click="showCommentChildren(comment.childList,comment.commentId,comment.userId)">{{`(${comment.childList.length})条记录 >` }}</span>
    <space-hr/>
  </div>


  <van-popup
      v-model:show="showBottomLong"
      position="bottom"
      :style="{ height: '90%' }"
  >
    <van-row justify="center">
      <van-col span="23" style="font-size: 50%;margin: 5% 0">
        回复
        <van-icon name="arrow"/>
      </van-col>
    </van-row>

    <div v-for="comment in commentChildren[0]">
      <music-list-grid-long-slot src="src/assets/kunkun.jpg" intro="我不是小黑子" radius="50px" span-image-left="3">
        <template #textBottom>
          <span style="line-height: 170%;font-size: 20%;" >{{ comment.content }}</span>
        </template>
        <template #default>
          <van-icon name="wap-nav" v-if="commentChildren[2] === user.userId"
                    @click="deleteOrUpdateMyComment(comment.commentId)"/>
        </template>
      </music-list-grid-long-slot>

      <space-hr/>
    </div>

    <van-cell-group inset style="position: fixed;bottom: 0;left: 0;width: 350px">
      <van-field v-model="contentToChild" placeholder="爱回复的人朋友多~ (～￣▽￣)～">
        <template #button>
          <van-button size="small" type="primary" @click="setCommentChild(contentToChild,commentChildren[1])">发送
          </van-button>
        </template>
      </van-field>
    </van-cell-group>
  </van-popup>

  <van-popup
      v-model:show="showBottomShort"
      position="bottom"
      :style="{ height: '15%' }">
    <van-cell title="删除" icon="delete-o" @click="deleteComm(commentDeleteOrUpdate[0])"/>
    <van-cell title="修改" icon="edit"/>
  </van-popup>

  <van-cell-group inset style="position: fixed;bottom: 0;left: 0;width: 350px">
    <van-field v-model="contentToParent" placeholder="评论一下把！(～￣▽￣)～">
      <template #button>
        <van-button size="small" type="primary" @click="setComment(contentToParent)">发送</van-button>
      </template>
    </van-field>
  </van-cell-group>
</template>

<script setup>
import CommonCardSlot from "../../common-slot/commonCardSlot.vue";
import SearchTopSlot from "../../common-slot/searchTopSlot.vue";
import MusicListGridLongSlot from "../../common-slot/musicListGridLongSlot.vue";
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import axios from "axios";

const route = useRoute();
const showBottomLong = ref(false);
const showBottomShort = ref(false);
const contentToParent = ref();
const contentToChild = ref();
const commentList = ref([]);
const commentChildren = ref([]);
const commentDeleteOrUpdate = ref([]);
const user = ref();
const musicComment = ref({
  musicId: route.query.musicId,
});

onMounted(() => {
  axios.get('/user/current', {}).then(function (res) {
    user.value = res.data.data
  })
  axios.get('/comment/get', {
    params: {
      otherId: 101 + musicComment.value.musicId
    }
  }).then(function (res) {
    commentList.value = res.data.data
    console.log(res.data.data)
  })
})

//写评论
const setComment = (content) => {
  if (content == null) {
    return;
  }
  commentRequest(null, 101 + musicComment.value.musicId, content)
}

//写回复
const setCommentChild = (content, parentId) => {
  if (content == null) {
    return;
  }
  commentRequest(parentId, null, content)
}
// 评论功能实现
const commentRequest = (parentId, otherId, content) => {
  axios.post('/comment/save', {
    parentId: parentId,
    otherId: otherId,
    content: content
  }).then(function (res) {
    location.reload()
  })
}

const deleteComm = (commentId) => {
  axios.get('/comment/remove', {
    params: {
      commentId: commentId
    }
  }).then(function (res) {
    location.reload()
  })
}

const updateComm = () => {

}

const showCommentChildren = (childList, commentId,userId) => {
  showBottomLong.value = true;
  commentChildren.value = []
  commentChildren.value.push(childList, commentId,userId)
  console.log(commentChildren.value)
}

const deleteOrUpdateMyComment = (commentId) => {
  showBottomShort.value = true;
  commentDeleteOrUpdate.value = []
  commentDeleteOrUpdate.value.push(commentId)
  console.log(commentDeleteOrUpdate.value)
}

const a = () =>{
  console.log(1);
}

</script>

<style scoped>

</style>
