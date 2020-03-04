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
           <!-- 下拉菜单 点击菜单项会触发 command事件-->
           <el-dropdown trigger='click' @command="clickMenu">
               <!-- 显示的内容 -->
               <span>{{ userInfo.name }}</span>
                <!-- 下拉内容需要做具名插槽dropdown  el-dropdown-menu是专门做下拉的组件 -->
                <el-dropdown-menu slot="dropdown" >
                   <!-- 下拉选项 el-dropdown-item 作为下拉选项组件  给每一个选项一个command属性-->
                    <el-dropdown-item command="info">个人信息</el-dropdown-item>
                    <el-dropdown-item command="git">git地址</el-dropdown-item>
                    <el-dropdown-item command="lgout">退出</el-dropdown-item>
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
  methods: {
    clickMenu (command) {
      // 需要处理三种情况
      if (command === 'info') {
        // 点击了个人信息
      } else if (command === 'git') {
        // 如果点击了git地址就跳转到git仓库
        window.location.href = 'https://github.com/shuiruohanyu/94-heimatoutiaopc'
      } else {
        // 退出系统 1. 删除token 2. 跳转回登录页
        window.localStorage.removeItem('user-token') // 删除localstorage中某个选项
        this.$router.push('/login') // 跳回登录页  编程式导航
      }
    }
  },
  created () {
    //   获取用户的个人信息
    this.$axios({
      url: '/user/profile' // 请求地址
    }).then(result => {
      // 如果加载成功了 我们要将数据赋值给 userInfo
      this.userInfo = result.data
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
