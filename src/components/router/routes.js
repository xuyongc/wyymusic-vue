import IndexPage from "../pages/index/Index.vue";
import RadioPage from "../pages/index/RadioIndex.vue";
import MyPage from "../pages/index/MyIndex.vue";
import FriendsPage from "../pages/index/FriendsIndex.vue";
import Setting from "../pages/popup/setting.vue";
import PhoneLogin from "../pages/login/PhoneLogin.vue";
import PasswordLogin from "../pages/login/PasswordLogin.vue";
import SearchPage from "../pages/search/SearchPage.vue"
import MusicList from "../pages/musicList/MusicList.vue"
import CommentPage from "../pages/comment/CommentPage.vue";
import AddCommunityPage from "../pages/user/AddCommunity.vue";
import SearchResultPage from "../pages/search/SearchResultPage.vue";

const routes = [
    {
        path: '/', name: 'Index', component: IndexPage,
        meta: {
            isShowTabBar: true
        }
    },
    {
        path: '/radio', name: 'radio', component: RadioPage,
        meta: {
            isShowTabBar: true
        }
    },
    {
        path: '/my', name: 'my', component: MyPage,
        meta: {
            isShowTabBar: true
        }
    },
    {
        path: '/friends', name: 'friends', component: FriendsPage,
        meta: {
            isShowTabBar: true
        }
    },

    {path: '/popup/setting', name: 'setting', component: Setting},

    {path: '/login/phone', name: 'phoneLogin', component: PhoneLogin},
    {path: '/login/password', name: 'passwordLogin', component: PasswordLogin},

    {path: '/search', name: 'searchPage', component: SearchPage},

    {path: '/searchResult', name: 'searchResultPage', component: SearchResultPage},

    {path: '/musicList', name: 'musicList', component: MusicList},

    {path: '/comment', name: 'comment', component: CommentPage},

    {path: '/addCommunity', name: 'addCommunity', component: AddCommunityPage}

]

export default routes;
