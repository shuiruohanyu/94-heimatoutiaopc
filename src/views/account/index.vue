<template>
  <el-card>
      <!-- 账户信息 -->
      <bread-crumb slot='header'>
        <template slot='title'>账户信息</template>
      </bread-crumb>
      <!-- 放置表单容器 -->
      <el-form label-width="100px">
        <!-- 表单域 -->
        <el-form-item label="用户名">
          <el-input v-model="formData.name" style="width:30%"></el-input>
        </el-form-item >
            <!-- 表单域 -->
        <el-form-item label="简介">
                <el-input v-model="formData.intro" style="width:30%"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
            <el-input v-model="formData.email" style="width:30%"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <!-- 手机号可以看 但是手机号不能改 因为手机号是登录的标识 -->
           <el-input v-model="formData.mobile" disabled style="width:30%"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type='primary'>保存</el-button>
        </el-form-item>
      </el-form>
      <!-- 头像 -->
      <img class='head-upload' src="../../assets/img/header.jpg" alt="">
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        name: '',
        intro: '',
        photo: '',
        email: '',
        mobile: ''
      }
    }
  },
  methods: {
    // 获取用户个人资料
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        this.formData = result.data // 将数据赋值给表单数据
      })
    }
  },
  created () {
    this.getUserInfo() // 调用方法
  }
}
</script>

<style>
  .head-upload {
    position: absolute;
    right: 350px;
    top:160px;
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }
</style>
