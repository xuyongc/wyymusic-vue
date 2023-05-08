<template>
  <van-nav-bar
      left-text="返回上一级"
      left-arrow
      @click-left="back"
  />

  <van-form @failed="userLogin">
    <van-cell-group inset>
      <van-field
          v-model="phoneNumber"
          center
          clearable
          label="手机号"
          placeholder="请输入手机号"
          :rules="[{ required: true,validator: isPhone }]"
      >
        <template #button>
          <van-button size="small" type="primary" @click="getSendCode">发送验证码</van-button>
        </template>
      </van-field>
      <van-field
          v-model="sendCode"
          label="验证码"
          placeholder="请输入验证码"
          :rules="[{ required: true,validator: isSendCode}]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import axios from "axios";
import {showFailToast, showNotify} from "vant";
import 'vant/es/toast/style'
import 'vant/es/notify/style'

const router = useRouter();

const phoneNumber = ref('17193403962');
const sendCode = ref('');


// 正则表达式
const isPhoneRegex = (phone) => /^((13[0-9])|(14[5,7,9])|(15([0-3]|[5-9]))|(166)|(17[0,1,3,5,6,7,8])|(18[0-9])|(19[8|9]))\d{8}/.test(phone);
const isSendCodeRegex = (code) => /^\d{7}$/.test(code);


//判断手机号
const isPhone = (phone) => {
  if (!isPhoneRegex(phone)) {
    return `请输入正确的手机号`
  }
}

// 判断验证码
const isSendCode = (code) => {
  if (!isSendCodeRegex(code)) {
    return `请输入正确的验证码`
  }
}


const back = () => {
  router.back();
}

const getSendCode = () => {
  if (phoneNumber.value.length < 11) {
    showFailToast("手机号不足11位")
    return;
  }
  if (!isPhoneRegex(phoneNumber.value)) {
    showFailToast("手机号错误")
    return;
  }
  axios.post('/user/send/code', {
    phone: phoneNumber.value
  }).then(function (res) {
    showNotify({type: 'primary', message: '你的验证码是 ' + res.data.data});
    sendCode.value = res.data.data
  }).catch(function (error) {
    showFailToast("获取失败请稍后再试")
  })
}


const userLogin = () => {
  if (sendCode.value.length < 6) {
    return;
  }
  if (phoneNumber.value.length < 11) {
    return;
  }
  // if (!isSendCodeRegex(sendCode.value)) {
  //   return;
  // }
  if (!isPhoneRegex(phoneNumber.value)) {
    return;
  }

  axios.post('/user/login/code', {
    phone: phoneNumber.value,
    code: sendCode.value
  }).then(function (res) {
    // 保存用户信息
    sessionStorage.setItem("token", res.data.data);
    // 回到主页
    router.push({
      path: '/'
    })
  }).catch(function (error) {
    showFailToast("登录失败请稍后再试")
  })
}

</script>

<style scoped>

</style>
