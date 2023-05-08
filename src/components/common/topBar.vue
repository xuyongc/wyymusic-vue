<template>
  <van-sticky>
    <!-- 居中 -->
    <van-row justify="center">
      <van-col span="1">
        <van-icon size="150%" name="wap-nav" class="left-icon"/>
      </van-col>
      <van-col span="22">
        <van-search shape="round" disabled placeholder="鸡你太美" />
      </van-col>
    </van-row>
  </van-sticky>


</template>

<script setup>

</script>

<style scoped>
.left-icon {
  margin-top: 100%;
}
</style>