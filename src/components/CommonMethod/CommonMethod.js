import axios from "axios";

const getCurrentUser = await axios.get('/user/current', {}).then(function (res) {
    // user.value = res.data.data
    console.log("这里被执行");
})

export default getCurrentUser
