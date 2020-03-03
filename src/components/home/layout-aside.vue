<template>
  <div class='layout-aside'>
     <!-- 头部图片 -->
     <div class='title'>
         <img src="../../assets/img/logo_admin.png" alt="">
     </div>
     <!-- 导航菜单 开启路由模式 :router="true"(完整模式) router(简写模式)  -->
     <el-menu router background-color="#323745" text-color="#adafb5">
         <!-- 子菜单 没有子菜单的 用 el-menu-item标签 -->
         <el-menu-item index='/home'>
             <i class='el-icon-s-home'></i>
             <span>首页</span>
         </el-menu-item>
         <!-- 二级菜单 需要用submenu -->
         <el-submenu index="2">
             <template slot="title">
                <i  class='el-icon-s-grid'></i>
                <span >内容管理</span>
             </template>
             <!-- 匿名插槽是二级菜单  具名插槽title是一级菜单-->
             <!-- 二级菜单项 还是使用el-menu-item -->
             <el-menu-item index='/home/publish'>发布文章</el-menu-item>
             <el-menu-item index='/home/articles'>内容列表</el-menu-item>
             <el-menu-item index='/home/comment'>评论列表</el-menu-item>
             <el-menu-item index='/home/material'>素材管理</el-menu-item>

         </el-submenu>
           <el-submenu index="3">
               <template slot="title">
                 <i class='el-icon-s-opportunity'></i>
                 <span>粉丝管理</span>
               </template>
             <!-- 二级菜单项 还是使用el-menu-item -->
             <el-menu-item index='/home/picture'>图文数据</el-menu-item>
             <el-menu-item index='/home/fansinfo'>粉丝概况</el-menu-item>
             <el-menu-item index='/home/fansphoto'>粉丝画像</el-menu-item>
             <el-menu-item index='/home/fanslist'>粉丝列表</el-menu-item>

         </el-submenu>
         <el-menu-item index='/home/account'>
             <i class="el-icon-user-solid"></i>
             <span>账户信息</span>
         </el-menu-item>
     </el-menu>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
  .layout-aside {
      background-color: #2e2f32;
      width:230px;
      height: 100vh;
      .title {
          text-align: center;
          padding: 10px 0;
          img {
              height: 35px;
          }
      }
      .el-menu {
          border-right: none;
      }
  }
</style>
