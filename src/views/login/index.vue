<template>
  <div class='login'>
    <!-- 表单 -->
    <el-card class='login-card'>
      <!-- 表单内容 -->
      <!-- 头部logo部分 -->
       <div class='title'>
         <img src="../../assets/img/logo_index.png" alt="">
       </div>
       <!-- 表单 绑定model属性  绑定rules属性(表单验证规则) ref 给el-form一个属性-->
       <el-form ref="loginForm" :model="loginForm" :rules="loginRules" style="margin-top:20px">
         <!-- 表单容器 设置prop属性 prop表示要校验的字段名-->
         <el-form-item prop="mobile">
           <!-- 表单域  v-model双向绑定 -->
           <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
         </el-form-item>
         <!-- 验证码 -->
         <el-form-item prop="code">
           <el-input v-model="loginForm.code" style="width:60%" placeholder="请输入验证码"></el-input>
           <!-- 放置一个按钮 -->
           <el-button style="float:right" plain>发送验证码</el-button>
         </el-form-item>
         <!-- 表单域 -->
         <el-form-item prop="checked">
           <!-- 是否同意被人家坑 -->
           <el-checkbox v-model="loginForm.checked">我已阅读同意用户协议和隐私条款</el-checkbox>
         </el-form-item>
         <!-- 按钮 -->
         <el-form-item>
           <el-button @click="login" style="width:100%" type="primary">登录</el-button>
         </el-form-item>
       </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 登录表单的数据
      loginForm: {
        mobile: '', // 手机号
        code: '', // 验证码
        checked: false // 是否同意用户协议
      },
      // 定义表单的验证规则
      loginRules: {
        // required 如果为true表示该字段必填
        mobile: [{ required: true, message: '您的手机号不能为空' }, {
          pattern: /^1[3-9]\d{9}$/, // 正则表达式
          message: '您的手机号格式不正确'
        }],
        code: [{ required: true, message: '您的验证码不能为空' }, {
          pattern: /^\d{6}$/, // 要求6个数字
          message: '验证码应该是6位数字'
        }],
        // 自定义校验  required不能校验true/false
        checked: [{
          validator: function (rule, value, callback) {
          // rule是当前的校验规则
          // value是当前的要校验的字段的值
          // calllback是一个回调函数 不论成功或者失败都要执行
          // 成功执行callback 失败执行 callback(new Error('错误信息'))
          // 我们认为 如果 value 为true 就表示 校验成功 如果value 为false就表示校验失败
            // new Error(错误信息) 就是我们提示的错误信息
            value ? callback() : callback(new Error('您必须同意我们的霸王条款'))
          }
        }]
      }
    }
  },
  methods: {
    login () {
      //    this.$refs.loginForm 获取的就是el-form的对象实例
      // 第一种 回调函数 isOK, fields(没有校验通过的字段)
      // this.$refs.loginForm.validate(function (isOK) {
      //   if (isOK) {
      //     console.log('校验通过')
      //   } else {
      //     console.log('校验未通过')
      //   }
      // }) // 方法
      // 第二种方式 promise
      this.$refs.loginForm.validate().then(() => {
        // 如果成功通过 校验就会到达 then
        // 通过校验之后 应该做什么事 -> 应该调用登录接口 看看手机号是否正常
        //   this.$axios.get/post/delete/put
        this.$axios({
          url: '/authorizations', // 请求地址
          data: this.loginForm,
          // data: { ...this.loginForm, checked: null }, // body请求体参数
          method: 'post'
        }).then(result => {
          // 成功 之后打印结果
          // 把钥匙放在兜里 也就是把token存于 本地缓存
          window.localStorage.setItem('user-token', result.data.token)
          // 跳转到主页
          this.$router.push('/home') // push 和 router-link类似 to属性 可以直接是字符串 也可以是对象
        }).catch(() => {
          // 提示消息
          // 第一种用法
          // this.$message({ message: '用户名或者密码错误', type: 'error' })
          this.$message.error('用户名或者密码错误')
        })
      })
    }
  }
}
</script>

<style lang='less' scoped>
// 加了scoped属性 就只会对当前自己的组件起作用
// 如果需要写less 需要在style标签中 lang='less'
.login {
  // background-image: url('../../assets/img/back.jpg');
  height: 100vh;// 当前屏幕可视区域分成100份
  display: flex;
  justify-content: center;
  align-items: center;
  &:before {
     content: '123';
     width: 100%;
     height: 100%;
     position: absolute;
     background-image: url('../../assets/img/back.jpg');
     filter: blur(5px);
      background-size: cover;

  }
  .login-card {
    background: rgba(0, 0, 0, 0);
    z-index: 2;
    width:440px;
    height: 340px;
    .title {
      text-align: center;
      img {
         height: 40px;
      }
    }
  }
}
</style>
