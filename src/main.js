import {createApp} from 'vue'
import App from './App.vue'
import Vant from 'vant'
import * as VueRouter from 'vue-router';
import '../src/service/http.js';

// 2. 引入组件样式
import 'vant/lib/index.css';
import routes from "./components/router/routes.js";
import common from "./components/constant/common.js";

const app = createApp(App);


app.use(Vant);
app.use(common);

const router = VueRouter.createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})

app.use(router)

app.mount('#app')
