<template>
  <!--  整体居中-->
    <van-row :gutter="gutterOut" justify="center">
      <van-col :span="spanImageLeft">
        <van-image :src="src" :radius="radius"/>
      </van-col>
      <van-col :span="spanTextRight">
        <van-row>
          <!--        左边-->
          <van-col :span="spanTextInLeft" class="music-list-grid-span-text-in-left">
            <van-space direction="vertical" fill>
              <!--            左边上面文字-->
              <ul class="music-list-grid-ul">
                <li>
                  <div style="height: 20%;font-size: 50%">{{ intro }}</div>
                </li>
                <li>
                  <div style="font-size: 50%">
                    <van-tag :color="props.tagColor" v-if="tagText" text-color="#ad0000">{{ tagText }}</van-tag>

                    <slot name="text">
                <span style="color: #b0b0b0">
                  {{ props.text }}
                </span>
                    </slot>
                  </div>
                </li>
              </ul>
              <!--            左边下面文字-->
              <slot name="textBottom">

              </slot>
            </van-space>
          </van-col>
          <!--        右边-->
          <van-col :span="spanDefaultInRight" class="music-list-grid-span-text-in-left" >
            <slot name="default">

            </slot>
          </van-col>
        </van-row>

      </van-col>
    </van-row>
</template>

<script setup>
const props = defineProps({
  text: String,
  tagText: String,
  src: String,
  tagColor: String,
  intro: String,
  radius: {type: String, default: "10px", required: false},
  spanImageLeft: {type: String, default: "4", required: false},
  spanTextRight: {type: String, default: "19", required: false},
  gutterOut: {type: String, default: "10", required: false},
  spanTextInLeft: {type: String, default: "22", required: false},
  spanDefaultInRight: {type: String, default: "2", required: false}
});

</script>

<style scoped>

</style>
