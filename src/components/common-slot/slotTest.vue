<template>
  <van-row justify="center">
    <van-col span="22">
      <van-space direction="vertical" fill>
        <van-row>
          <slot name="img">

          </slot>
        </van-row>
        <div style="font-size: 50%">
          <slot name="tag">

          </slot>
          <slot name="text">

          </slot>
        </div>
      </van-space>
    </van-col>
  </van-row>
</template>

<script setup>

</script>

<style scoped>

</style>