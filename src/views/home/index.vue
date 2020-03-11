<template>
<!-- 先在最外层放置一个大容器 因为 小容器只能放到大容器里面 -->
   <el-container>
     <!-- 根据折叠状态变成 64  -->
     <!-- style 对象语法 -->
     <el-aside :style="{width: collapse ? '64px' : '230px'}"  style="transition:all 0.5s; background:#2e2f32">
       <!-- 左侧导航组件 -->
       <!-- 直接把父组件的状态传给 子组件 -->
       <layout-aside :collapse="collapse"></layout-aside>
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
import eventBus from '@/utils/eventBus'
export default {
  data () {
    return {
      collapse: false // 默认是展开状态
    }
  },
  created () {
    // 切换了折叠的状态
    eventBus.$on('changeCollapse', () => {
      //  此时表示 折叠状态一定变了 变成什么了 一定是跟当前的状态相反了
      this.collapse = !this.collapse // 只要取反 就和 头部的组件的状态对上
    })
  }
}
</script>

<style>

</style>
