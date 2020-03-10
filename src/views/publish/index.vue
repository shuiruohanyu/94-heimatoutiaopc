<template>
  <el-card>
      <bread-crumb slot='header'>
         <template slot='title'>发布文章</template>
      </bread-crumb>
      <!-- 表单组件  标题宽度设置于 el-form组件-->
      <el-form  ref="myForm" :model="publishForm" :rules="publishRules" style="margin-left:50px" label-width="100px">
        <el-form-item label="标题" prop="title">
          <!-- 输入框 -->
          <el-input  v-model="publishForm.title" placeholder="请输入您的标题" style="width:60%"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <!-- 多行输入 -->
          <!-- 将el-input换成 quill-editor即可 -->
          <quill-editor v-model="publishForm.content"
             style="height:300px"
            ></quill-editor>
        </el-form-item>
        <el-form-item label="封面" prop="cover" style="margin-top:120px;">
          <!-- 单选框组 -->
          <!-- 封面单选组 绑定的是 封面cover中的type -->
          <!-- 当类型发生变化时触发changeType -->
          <el-radio-group v-model="publishForm.cover.type" @change="changeType">
            <!-- 需要给每个el-radio 加上 label属性 -->
             <el-radio :label="1">单图</el-radio>
             <el-radio :label="3">三图</el-radio>
             <el-radio :label="0">无图</el-radio>
             <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 放置封面组件 -->
        <!-- 把封面图片传递给子组件 -->
        <cover-image @selectTwoImg="receiveImg" :list="publishForm.cover.images"></cover-image>
        <el-form-item label="频道" prop="channel_id">
          <!-- select选择器 -->
          <el-select placeholder="请选择频道" v-model="publishForm.channel_id">
              <!-- 下拉选项 v-for 循环生成 el-option-->
              <!-- label 显示值  value 保存值 -->
              <el-option v-for="item in channels" :label="item.name" :value="item.id"  :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <!-- 放置两个按钮 -->
          <!-- true和false代表是不是草稿 -->
          <el-button @click="publish(false)" type='primary'>发表</el-button>
          <el-button @click="publish(true)">存入草稿</el-button>
        </el-form-item>

      </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [], // 接收频道数据
      // 发布表单数据
      publishForm: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: {
          type: 0, // -1 是自动 0是无图  1 是单图 3 是三图
          images: [] // 字符串数组 对应type  假如 type 为1 images中应该有一个值 假如为3 images应该有三个值 0 images为空
        },
        channel_id: null // 频道id
      },
      // 发布表单的校验规则
      publishRules: {
        title: [{ required: true, message: '文章标题不能为空', trigger: 'blur' }, {
          min: 5, max: 30, message: '标题应该在5-30字符之间', trigger: 'blur'
        }],
        content: [{ required: true, message: '文章内容不能为空', trigger: 'blur' }],
        channel_id: [{ required: true, message: '频道内容不能为空', trigger: 'blur' }]

      }
    }
  },
  // 如果你想要捕捉路由参数的变化, 我们可以采用watch来监听 $route
  watch: {
    // watch是监听data中的数据变化
    // 路由在初始化之后 会把$route也放置在 页面data中
    $route: function (to, from) {
      // 监听$route的变化
      // to表示新的路由地址对象
      // from表示旧的路由地址对象
      console.log(to) // 打印一下to属性
      // 根据to属性中的 params的articleId的变化 来决定 是不是改变数据
      // 如果有articleId  应该获取编辑文章的数据
      // 如果没有articleId 应该将表单数据设置为空
      if (to.params.articleId) {
        // 如果id存在 应该获取文章数据
        // 获取数据
        this.getArticleById(to.params.articleId) // 获取文章id
      } else {
        // 如果不存在 应该 设置表单数据为空
        // 如果是发布文章 就设置为空对象
        this.publishForm = {
          title: '', // 文章标题
          content: '', // 文章内容
          cover: {
            type: 0, // -1 是自动 0是无图  1 是单图 3 是三图
            images: [] // 字符串数组 对应type  假如 type 为1 images中应该有一个值 假如为3 images应该有三个值 0 images为空
          },
          channel_id: null // 频道id
        }
      }
    }

  },
  methods: {
    // 接收cover-image传递过来的数据
    receiveImg (url, index) {
      // 接收到了 传递过来的封面数据
      // 接下来需要更新 images数组
      // but!!!!  仅仅拿到了一个url地址, 但是images可能有1条 可能有3条 单单有地址 并不足以 知道要更新哪一条记录
      //  有索引 有 url了 可以改变 数据了
      this.publishForm.cover.images.splice(index, 1, url) // 删除替换元素
      // splice(索引, 要删除的个数, 替换的个数)
    },
    // 改变类型事件
    changeType () {
      //  我们应该根据type的值对 images进行控制
      if (this.publishForm.cover.type === 1) {
        // 单图模式
        this.publishForm.cover.images = [''] // 此时还没有选择图片 所以 给一个空字符
      } else if (this.publishForm.cover.type === 3) {
        this.publishForm.cover.images = ['', '', ''] // 此时还没有选择图片 所以 给3个空字符
      } else {
        this.publishForm.cover.images = [] // 无图或者自动时 给一个空数组
      }
    },
    // 根据id获取文章详情数据
    getArticleById (id) {
      //  获取数据
      this.$axios({
        url: `/articles/${id}` // 请求地址
      }).then(result => {
        this.publishForm = result.data // 将数据赋值给表单数据
      })
    },
    // 获取频道数据
    getChannels () {
      this.$axios({
        url: '/channels' // 获取频道数据
      }).then(result => {
        this.channels = result.data.channels // 将频道数据赋值给本地数据
      })
    },
    // 发布
    publish (draft) {
      //  this.$refs 来获取 el-form实例  调用validate方法
      // 回调形式
      // promise形式
      // this.$refs.myForm.validate(function (isOK) {
      //   if (isOK) {
      //     // 调用发布皆苦
      //   }
      // })
      this.$refs.myForm.validate().then(() => {
        const { articleId } = this.$route.params // 如果id 不为空 就是修改 如果为空就是发布新文章
        //  发布正式文章 发布草稿文章
        //  修改正式文章  修改草稿文章
        this.$axios({
          url: articleId ? `/articles/${articleId}` : '/articles', // 根据场景决定用什么地址
          method: articleId ? 'put' : 'post', // 根据场景决定用什么类型
          params: {
            draft
          },
          data: this.publishForm
        }).then(() => {
          this.$message.success('操作成功!')
          this.$router.push('/home/articles') // 跳到文章列表
        }).catch(() => {
          this.$message.error('操作失败!')
        })
        // if (articleId) {
        //   // 修改
        //   this.$axios({
        //     url: `/articles/${articleId}`, // 修改地址
        //     method: 'put',
        //     params: { draft },
        //     data: this.publishForm// 请求体参数
        //   }).then(() => {
        //     this.$message.success('发布成功!')
        //     this.$router.push('/home/articles') // 跳到文章列表
        //   }).catch(() => {
        //     this.$message.error('发布失败!')
        //   })
        // } else {
        // // 如果进了then 表示校验成功
        // // 调用发布接口
        //   this.$axios({
        //     method: 'post',
        //     url: '/articles', // 请求地址
        //     params: { draft }, // query参数
        //     data: this.publishForm // 请求体body参数
        //   }).then(() => {
        //     this.$message.success('发布成功!')
        //     // 如果发布成功
        //     this.$router.push('/home/articles') // 跳到文章列表
        //   }).catch(() => {
        //     this.$message.error('发布失败!')
        //   })
        // }
      })
    }
  },
  // 判断是否存在 文章id 如果存在 获取数据
  created () {
    // 调用获取频道数据的方法
    this.getChannels()
    const { articleId } = this.$route.params // articleId是 路由参数中定义的
    // if (articleId) {
    //   // 获取文章数据
    //   this.getArticleById(articleId)
    // }
    articleId && this.getArticleById(articleId) // && 运算符 如果前面为true 才会执行后面的逻辑
  }
}
</script>

<style>

</style>
