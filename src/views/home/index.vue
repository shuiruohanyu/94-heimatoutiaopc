<template>
<!-- 先在最外层放置一个大容器 因为 小容器只能放到大容器里面 -->
   <el-container>
     <el-aside>
       <h1>左侧导航区域</h1>
     </el-aside>
     <!-- 右侧 再嵌套一个 el-container -->
     <el-container>
       <!-- 再上下布局 -->
       <el-header>
         <h1>顶部操作栏</h1>
       </el-header>
       <!-- 主要区域 -->
       <el-main>
         <h1>主要区域</h1>
          <!-- 这里应该放置 二级路由容器 -->
         <router-view></router-view>
       </el-main>
     </el-container>
   </el-container>
</template>

<script>
export default {

}
</script>

<style>

</style>
