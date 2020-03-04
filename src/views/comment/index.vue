<template>
<!-- 用一个el-card组件做主页面 -->
 <el-card>
    <!-- 放置一个面包屑组件  slot='header' 表示面包屑会作为具名插槽给card的header部分-->
    <bread-crumb slot='header'>
    <!-- slot='title' 表示 评论管理给面包些的插槽 -->
       <template slot="title">
           评论管理
       </template>
    </bread-crumb>
    <!-- 表格组件 -->
    <el-table :data="list">
       <!-- 使用el-table-column作为列 -->
       <!-- prop 表示显示的字段 label表示表头 -->
       <el-table-column width="600"  label="标题"></el-table-column>
       <el-table-column  label="评论状态"></el-table-column>
       <el-table-column  label="总评论数"></el-table-column>
       <el-table-column  label="粉丝评论数"></el-table-column>
       <el-table-column  label="操作"></el-table-column>
    </el-table>
 </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [

      ]
    }
  }
}
</script>

<style>

</style>
