<template>
  <van-row justify="center">
    <van-col span="22">
      <van-space direction="vertical" fill>
        <van-row>
          <slot name="img">
            <van-image :src="props.src" radius="10px"/>
          </slot>
        </van-row>
        <div style="font-size: 50%">
          <slot name="tag">
            <van-tag :color="props.tagColor" text-color="#ad0000" v-if="props.tagText">{{props.tagText}}</van-tag>
          </slot>
          <slot name="text">
              <span style="color: #b0b0b0">
                {{ props.text }}
              </span>
          </slot>
        </div>
      </van-space>
    </van-col>
  </van-row>
</template>

<script setup>
const props = defineProps({
  text: String,
  tagText: String,
  src: String,
  tagColor:String
})
</script>

<style scoped>

</style>