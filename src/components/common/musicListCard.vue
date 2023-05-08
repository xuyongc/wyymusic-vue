<template>
    <!-- 设置整体居中-->
    <van-row justify="center">
      <van-col span="23" class="music-list-card-out">
        <van-space direction="vertical" fill class="music-list-card-in">
          <!--标题-->
          <van-row justify="center">
            <van-col span="21">
              <span style="font-size: 50%">热歌榜 ></span>
            </van-col>
          </van-row>
          <!--标题下面内容-->
          <van-row gutter="10" justify="center">
            <!--标题下面内容的图片-->
            <van-col span="4">
              <van-image src="src/assets/kunkun.jpg" radius="10px"/>
            </van-col>
            <!--标题下面内容的文字-->
            <van-col span="17">
              <ol>
                <li style="font-size: 60%;line-height: 160%" v-for="i in 3">{{i}}&emsp;鸡太美，篮球太危险</li>
              </ol>
            </van-col>
          </van-row>
        </van-space>
      </van-col>
    </van-row>

</template>

<script setup>

</script>

<style scoped>
.music-list-card-out{
  background-color: #ffffff;
  border-radius: 10px;
  margin: 2% 0;
  box-shadow: 1px 1px 1px 1px #f2f4f7;
}
.music-list-card-in {
  padding: 2% 0;
}

</style>