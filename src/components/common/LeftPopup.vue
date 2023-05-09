<template>
  <!-- 左侧弹出 -->
  <van-popup
      v-model:show="isShowLeftUser"
      position="left"
      :style="{ width: '80%', height: '100%' ,backgroundColor: '#f5f5f5'}"
  >
    <van-sticky>
      <van-cell title="立即登录 >" icon="user-circle-o"/>
    </van-sticky>
    <van-cell-group class="cell-inset">
      <van-cell style="font-size: 5px" title="音乐服务"/>
      <van-cell title="我的消息" icon="envelop-o" is-link/>
      <van-cell title="商城" icon="bag-o" is-link/>
    </van-cell-group>

    <van-cell-group class="cell-inset">
      <van-cell style="font-size: 5px" title="其他"/>
      <van-cell title="设置" icon="setting-o" is-link/>
      <van-cell title="深色模式" icon="closed-eye" is-link>
        <template #right-icon>
          <van-switch :model-value="isBlack" @update:model-value="setDark" size="15px" active-color="#ee0a24"
                      inactive-color="#dcdee0"/>
        </template>
      </van-cell>
      <van-cell title="个性装扮" icon="flower-o" is-link/>
      <van-cell title="青少年模式" icon="shield-o" value="未开启" is-link>
        <template #value>
          <span style="font-size: 1px">未开启</span>
        </template>
      </van-cell>
    </van-cell-group>

    <van-cell-group class="cell-inset">
      <van-cell title="我的订单" icon="shopping-cart-o" is-link/>
      <van-cell title="优惠劵" icon="idcard" is-link/>
      <van-cell title="我的客服" icon="service-o" is-link/>
      <van-cell title="分享" icon="share-o" is-link @click="showSharePanel()"/>
      <van-cell title="关于" icon="info-o" is-link/>
    </van-cell-group>

    <van-cell-group class="cell-inset">
      <van-cell style="color: #e9403e" title="关闭云音乐" @click="exit"/>
    </van-cell-group>
  </van-popup>

  <!--   夜间模式-->
  <van-config-provider :theme="pageColor"></van-config-provider>

  <!--  分享给好友-->
  <van-share-sheet
      v-model:show="showShare"
      title="立即分享给好友"
      :options="options"
  />
</template>

<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";

const router = useRouter();
const isShowLeftUser = ref(false);
const isBlack = ref(false);
const showShare = ref(false);
const pageColor = ref('light');
const options = [
  [
    {name: '微信', icon: 'wechat'},
    {name: '朋友圈', icon: 'wechat-moments'},
    {name: '微博', icon: 'weibo'},
    {name: 'QQ', icon: 'qq'},
  ],
  [
    {name: '复制链接', icon: 'link'},
    {name: '二维码', icon: 'qrcode'}
  ],
];

//展示分享页面
const showSharePanel = () => {
  showShare.value = !showShare.value
}

//夜间模式
const setDark = (newValue) =>{
  isBlack.value = newValue
  pageColor.value = (isBlack.value) ? 'dark' : 'light'
}

const showLeftPanel = () => {
  isShowLeftUser.value = !isShowLeftUser.value
  console.log("这里被调用")
}

const toSetting = () =>{

}

defineExpose({
  showLeftPanel
})

const exit = () =>{
  axios.get('/user/logout').then(function () {
    router.push('/')
  })
}
</script>


<style scoped>

.cell-inset {
  margin-top: 10px;
}

</style>
