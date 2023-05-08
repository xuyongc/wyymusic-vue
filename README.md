# 网易云仿作项目

作者：徐永晨

##### 项目介绍：网易云仿作

------

前端工具：vue框架 + vite打包 + vant4前端组件

后端工具：springBoot + spring依赖注入 +  mybatis-plus持久层 + springmvc + caffeine本地缓存

------

#### 前端设计

------

##### 前端实现页面：

1. 主页面

   

2. 用户页面

   

3. 功能页面

   

4. 后台管理页面

##### 前端实现功能：





#### 后台实现

------

##### 数据库设计(注意索引)

1. ##### 用户表

   ​	userId（用户id）bigint 唯一性索引

   ​	nickName（用户名称）varchar

   ​	userAccount（账户） 唯一性索引

   ​	userPassword（用户密码）varchar

   ​	avatarUrl（头像）varchar

   ​	bgImg（背景墙，图片地址）

   ​	gender（性别）tinyint

   ​	phone（电话）varchar

   ​	email（邮箱）varchar

   ​	tag (标签，json格式数据储存)

   ​	userStatus （状态）tinyint 0-正常 1-封号

   ​	userRole （用户角色）tinyint 0-普通用户 1-作者 2 -管理员

   ​	createTime （创建时间）datetime

   ​	updateTime （修改时间）datetime

   ​	isDelete（逻辑删除）tinyint 0-正常 1-删除

2. ##### 歌曲表

   ​	musicId (文章Id,可以用随机值) bigint 

   ​	musicTitle（文章标题）varchar

   ​	musicAuthorName（作者名字）varchar（不能使用作者固定名字，不然会导致批量修改）

   ​	musicAuthorId（作者Id） bigint

   ​	showImgUrl（封面地址）varchar

   ​	musicAdress（作品地址）varchar

   ​	musicLikeNumber（喜欢数）bigint

   ​	musicFavoriteNumber（收藏数量）bigint

   ​	musicStatus （状态）tinyint 0-正常 1-删除

   ​	createTime （创建时间）datetime

   ​	updateTime （修改时间）datetime

   ​	isDelete（逻辑删除）tinyint 0-正常 1-删除

3. ***收藏夹（favorites，歌曲收藏和歌单收藏，根据前缀判断）***

   ​	id (收藏夹id，根据用户编号设计) bigint

   ​	musicId（作品id） bigint

   ​	userId (收藏人)

   ​	createTime （创建时间）datetime

   ​	updateTime （修改时间）datetime

   ​	isDelete（逻辑删除）tinyint 0-正常 1-删除

4. ##### 关注（follow）

   followId bigint

   userId bigint

   fansId bigint

   createTime date

   updateTime date

   isDelete tinyint

5. ##### 评论

   commonId

   otherId（这个评论可以是在，某个音乐下面，或者是某个动态下面，用前缀区分）

   content

   userId（这个评论是谁发布的）

   parentId（他有没有父亲，判断他有没有上一级）

   createTime date

   updateTime date

   isDelete tinyint

6. ##### 歌单（要加前缀）

   musicListId

   userId

   musicListContentIds（储存歌曲列表，用json格式的数据储存）

   createTime date

   updateTime date

   isDelete tinyint

7. ##### 动态

   communityId

   userId

   imgList （储存图片地址列表，用json格式的数据储存，最多九个）

   musicId（歌曲推荐）

   text（动态内容）

   createTime date

   updateTime date

   isDelete tinyint

8. ##### 订单（暂定）

   

9. ##### 购物车（暂定）







功能添加（根据数据设计库表）

功能添加（redis缓存）
