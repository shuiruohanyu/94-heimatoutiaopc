<template>
  <!-- elementUI布局组件 el-row 和 el-col -->
  <el-row align="middle" type='flex' class='layout-header'>
      <!-- 等分为两列  为什么是:span="12"-->
    <el-col class='left' :span="12">
       <!-- 图标 -->
       <i class='el-icon-s-fold'></i>
       <span>
           江苏传智播客教育科技股份有限公司
       </span>
    </el-col>
    <!-- 右侧列 -->
    <el-col class='right' :span="12">
        <!-- 再次放置一个 row组件  align属性设置垂直对齐方式  justify设置 水平对齐属性-->
        <el-row type='flex' justify="end" align="middle">
          <img :src="userInfo.photo" alt="">
           <!-- 下拉菜单 -->
           <el-dropdown trigger='click'>
               <!-- 显示的内容 -->
               <span>{{ userInfo.name }}</span>
                <!-- 下拉内容需要做具名插槽dropdown  el-dropdown-menu是专门做下拉的组件 -->
                <el-dropdown-menu slot="dropdown" >
                   <!-- 下拉选项 el-dropdown-item 作为下拉选项组件-->
                    <el-dropdown-item>个人信息</el-dropdown-item>
                    <el-dropdown-item>git地址</el-dropdown-item>
                    <el-dropdown-item>退出</el-dropdown-item>
                </el-dropdown-menu>
           </el-dropdown>
        </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {} // 用户个人信息
    }
  },
  created () {
    const token = localStorage.getItem('user-token') // 从兜里拿钥匙 也就是从缓存中取token
    //   获取用户的个人信息
    this.$axios({
      url: '/user/profile', // 请求地址
      headers: {
        Authorization: `Bearer ${token}` // 格式要求 Bearer +token
      } // 请求头参数 headers放置请求头参数
    }).then(result => {
      // 如果加载成功了 我们要将数据赋值给 userInfo
      this.userInfo = result.data.data
    })
  }
}
</script>

<style lang='less' scoped>
  .layout-header {
      height: 60px;
      .left {
          i {
              font-size:20px;
          }
      }
      .right {
          img {
              width: 40px;
              height: 40px;
              border-radius: 50%;
              margin-right: 4px;
          }
      }
  }
</style>
