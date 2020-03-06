<template>
<!-- el-card布局 -->
   <el-card>
        <!-- 放置面包屑  将 面包屑给到卡片的具名header-->
        <bread-crumb slot='header'>
            <!-- 具名插槽 template不生成任何实质标签-->
            <template slot='title'>
                素材管理
            </template>
        </bread-crumb>
   </el-card>
</template>

<script>
export default {

}
</script>

<style>

</style>
