import axios from "axios";
import {showFailToast, showSuccessToast} from "vant";

axios.defaults.baseURL = 'http://localhost:8081/api'

let token = sessionStorage.getItem("token");

axios.interceptors.request.use(function (config) {
    console.log(token)
    if (token){
        config.headers['authorization'] = token
    }
    // 在发送请求之前做些什么
    // console.log("这是请求之前")
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    if (response.data.code !== 200 || response.data.data === false){
        showFailToast("请求错误")
    }else {
        showSuccessToast("请求成功");
    }
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    // console.log("这是请求之后")
    return response;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});
