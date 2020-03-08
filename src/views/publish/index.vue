<template>
  <el-card>
      <bread-crumb slot='header'>
         <template slot='title'>发布文章</template>
      </bread-crumb>
      <!-- 表单组件  标题宽度设置于 el-form组件-->
      <el-form style="margin-left:50px" label-width="100px">
        <el-form-item label="标题">
          <!-- 输入框 -->
          <el-input placeholder="请输入您的标题" style="width:60%"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <!-- 多行输入 -->
          <el-input placeholder="请输入您的内容" type='textarea' :rows="4"></el-input>
        </el-form-item>
        <el-form-item label="封面">
          <!-- 单选框组 -->
          <el-radio-group>
             <el-radio>单图</el-radio>
             <el-radio>三图</el-radio>
             <el-radio>无图</el-radio>
             <el-radio>自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <!-- select选择器 -->
          <el-select placeholder="请选择频道">
              <!-- 下拉选项 v-for 循环生成 el-option-->
              <!-- label 显示值  value 保存值 -->
              <el-option v-for="item in channels" :label="item.name" :value="item.id"  :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <!-- 放置两个按钮 -->
          <el-button type='primary'>发表</el-button>
          <el-button>存入草稿</el-button>
        </el-form-item>

      </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [] // 接收频道数据
    }
  },
  methods: {
    // 获取频道数据
    getChannels () {
      this.$axios({
        url: '/channels' // 获取频道数据
      }).then(result => {
        this.channels = result.data.channels // 将频道数据赋值给本地数据
      })
    }
  },
  created () {
    // 调用获取频道数据的方法
    this.getChannels()
  }
}
</script>

<style>

</style>
