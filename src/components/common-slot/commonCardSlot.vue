<template>
  <!-- 设置整体居中-->
  <van-row justify="center">
    <van-col :span="props.span" class="common-card-out">
      <slot name="content">
      </slot>
    </van-col>
  </van-row>
</template>

<script setup>
const props = defineProps({
  span:String,
  title:String
})

</script>

<style scoped>
.common-card-out {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 1px 1px 1px 1px #f2f4f7;
}
</style>