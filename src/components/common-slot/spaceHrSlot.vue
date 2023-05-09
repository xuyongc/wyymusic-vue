<template>
  <div class="van-hairline-out">
    <div v-if="isHave" class="van-hairline--top-bottom"></div>
  </div>



</template>

<script setup>


const props = defineProps({
  isHave:String
})

</script>

<style scoped>
.van-hairline-out{
  padding: 10px 0;
}
</style>
