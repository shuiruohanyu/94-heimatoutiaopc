<template>
<!-- 先在最外层放置一个大容器 因为 小容器只能放到大容器里面 -->
   <el-container>
     <el-aside style="width:230px;background:#2e2f32">
       <!-- 左侧导航组件 -->
       <layout-aside></layout-aside>
     </el-aside>
     <!-- 右侧 再嵌套一个 el-container -->
     <el-container>
       <!-- 再上下布局 -->
       <el-header>
         <!-- 顶部操作栏组件 -->
         <layout-header></layout-header>
       </el-header>
       <!-- 主要区域 el-main默认给加了 20px的 内边距-->
       <el-main style="padding: 0">
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
