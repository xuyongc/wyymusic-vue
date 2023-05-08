<template>
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
    <van-cell style="font-size: 5px" title="专栏"/>
    <van-cell title="专栏菜单" is-link/>
    <van-cell title="我的客服" is-link/>
    <van-cell title="关于网易云" is-link/>
  </van-cell-group>
</template>

<script setup>

</script>

<style scoped>

</style>