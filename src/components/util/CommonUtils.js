import axios from "axios";

let MUSIC_LIST_PREFIX = '/music/list'

let MUSIC_PREFIX = '/music'

let USER_PREFIX = '/user'

let INDEX_PREFIX = '/index'

let UPLOAD_PREFIX = '/upLoad'

let COMMUNITY_PREFIX = '/community'

let COMMENT_PREFIX = '/comment'


//index 主页操作
/**
 * 获取主页图片
 * @type {Promise<axios.AxiosResponse<any>>}
 */
export const getIndexImage = axios.get(INDEX_PREFIX + '/get/img', {}).then(function (res) {
    return res
})

//user 用户操作
/**
 * 获取当前登录信息
 * @type {Promise<axios.AxiosResponse<any>>}
 */
export const getCurrentUser = axios.get(USER_PREFIX + '/current', {}).then(function (res) {
    return res;
})

//musicList 歌单操作

/**
 * 添加一个音乐到我的歌单
 * @param musicListId
 * @param musicId
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const addMusicToMusicList = (musicListId, musicId) => {
    return axios.get(MUSIC_PREFIX + '/add/one', {
        params: {
            musicListId: musicListId,
            musicId: musicId
        }
    })
}

/**
 * 创建我的歌单
 * @param imagePath
 * @param musicListInfo
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const createMusicList = (imagePath, musicListInfo) => {
    return axios.post('/music/list/create', {
        showImgUrl: imagePath,
        musicListInfo: musicListInfo
    })
}

/**
 * 删除一个歌单，注意：这是删除一个歌单，不是删除我的收藏的歌单
 * @param musicListId
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const deleteMusicList = (musicListId) => {
    return axios.get(MUSIC_LIST_PREFIX + '/removeList', {
        params: {
            musicListId: musicListId
        }
    })
}

/**
 * 获取热点歌单列表
 * @type {Promise<axios.AxiosResponse<any>>}
 */
export const getHotMusicList = axios.get(MUSIC_LIST_PREFIX + '/get/hot', {}).then(function (res) {
    return res;
})

/**
 * 通过userId查询歌单列表
 * @param userId
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const getMusicListByUserId = (userId) => {
    return axios.get(MUSIC_LIST_PREFIX + '/get', {
        params: {
            userId: userId
        }
    })
}

//music 音乐操作
/**
 * 获取我收藏的音乐
 * @type {Promise<axios.AxiosResponse<any>>}
 */
export const getMyFavoriteMusic = axios.get(MUSIC_PREFIX + '/get/favorite').then(function (res) {
    return res;
})
//community 动态操作

/**
 * 获取最近发布的动态
 * @type {Promise<axios.AxiosResponse<any>>}
 */
export const getCommunityLate = axios.get(COMMUNITY_PREFIX + '/get/late', {}).then(function (res) {
})

/**
 * 获取动态通过feed流
 * @param minTime
 * @param offset
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const getCommunityByFeed = (minTime, offset) => {
    return axios.get(COMMUNITY_PREFIX + '/get/feed', {
        params: {
            max: minTime,
            offset: offset
        }
    });
}

/**
 * 通过id删除自己的动态
 * @param communityId
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const deleteCommunityById = (communityId) => {
    return axios.get('/community/remove', {
        params: {
            communityId: communityId
        }
    })
}

//comment 评论操作
/**
 * 发布评论
 * @param parentId
 * @param otherId
 * @param content 不能为空
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const saveComment = (parentId, otherId, content) => {
    return axios.post(COMMENT_PREFIX + '/save', {
        parentId: parentId,
        otherId: otherId,
        content: content
    })
}

/**
 * 根据otherId获取评论，这个otherId是根据,前缀判断
 * 歌单是 100
 * 歌曲是 101
 * @param otherId
 * @returns {Promise<axios.AxiosResponse<any>>}
 */

export const getCommentByOtherId = (otherId) => {
    return axios.get('/comment/get', {
        params: {
            otherId: otherId
        }
    })
}


/**
 * 删除我的评论
 * @param commentId
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const deleteMyComment = (commentId) => {
    return axios.get(COMMENT_PREFIX + '/remove', {
        params: {
            commentId: commentId
        }
    })
}

/**
 * 修改我的评论
 * @param commentId
 * @param content
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const updateMyComment = (commentId, content) => {
    return axios.post(COMMENT_PREFIX + '/update', {
        commentId: commentId,
        content: content
    })
}

//file 文件操作
/**
 * 单文上传
 * @param imageFile
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const fileUpload = (imageFile) => {
    let param = new FormData();
    param.append("imageFile", imageFile.file);
    return axios.post('/upLoad/image', param, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

/**
 * 文件批量上传
 * @param imageFileList
 */
export const fileUploadBatch = (imageFileList) => {

}




