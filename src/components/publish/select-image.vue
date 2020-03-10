<template>
  <!-- 还是通过页签形式来显示 el-tabs -->
   <el-tabs v-model="activeName">
       <!-- name不能重复 name表示当前标签页的标识 -->
    <el-tab-pane label="素材库" name="material">
        <!-- 查询全部的素材 -->
        <!-- v-for循环遍历list数据 -->
        <div class='select-image-list'>
            <!-- 循环 -->
            <el-card v-for="item in list" :key="item.id" class='img-card'>
                <!-- 显示素材图片 -->
                <img @click="clickImg(item.url)" :src="item.url" alt="">
            </el-card>
        </div>
        <!-- 分页 -->
        <el-row type='flex' justify="center" style="height:80px" align="middle">
               <!-- 分页组件 -->
               <!-- layout特别注意 名字不能写错 写错全死了 -->
               <el-pagination background  layout="prev, pager, next"
               :total="page.total"
               :current-page="page.currentPage"
               :page-size="page.pageSize"
               @current-change="changePage"
               ></el-pagination>
        </el-row>
    </el-tab-pane>
    <el-tab-pane label="上传素材" name="upload">
      <!-- 放置一个上传组件 -->
      <!-- action必须给值 否则会报错http-request 自定义上传 -->
      <el-upload action="" class='upload-img' :http-request="uploadImg">
        <!-- 放置一个元素 用来点击上传 -->
        <i class='el-icon-plus'> </i>
      </el-upload>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'material', // 当前激活的变量
      list: [], // 素材列表数据
      page: {
        currentPage: 1, // 第几页
        pageSize: 8, // 每页多少条
        total: 0 // 总条数
      }
    }
  },
  methods: {
    getAllImg () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: false, // 查询全部的素材 所以这里给一个false
          page: this.page.currentPage, // 当前页码
          per_page: this.page.pageSize // 每页多少条
        }
      }).then(result => {
        this.list = result.data.results // 获取全部素材的数据
        this.page.total = result.data.total_count // 将总数赋值给页码变量
      })
    },
    // 改变页码
    changePage (newPage) {
      this.page.currentPage = newPage // 赋值新页码
      this.getAllImg() // 重新获取数据
    },
    // 点击图片时触发
    clickImg (url) {
    //   需要将url参数传递给上层组件
    // 在脚手架中 自定义事件名 可以大小写通用 不用纯小写了
      this.$emit('selectOneImg', url) // 将url参数传出去
    },
    // 上传素材
    uploadImg (params) {
      // 调用上传接口
      //  params.file 就是需要上传的图片文件
      // 接口参数类型要求是 formData
      const data = new FormData() // 实例化一个formData对象
      data.append('image', params.file) // 加入文件参数
      // 开始发送上传请求了
      this.$axios({
        url: '/user/images', // 请求地址
        method: 'post', // 上传或者新增一般都是post类型
        data // es6简写
      }).then(result => {
        // 如果成功了  此时 我们的接口会返回给我们一个上传成功之后的图片地址
        // 拿到了返回的url地址 应该做什么
        // 根刚才一样 往外传
        this.$emit('selectOneImg', result.data.url) // 将url参数传出去
      }).catch(() => {
        this.$message.error('上传素材失败')
      })
    }
  },
  created () {
    this.getAllImg() // 获取所有的数据
  }
}
</script>

<style lang='less' scoped>
.select-image-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .img-card {
        width: 150px;
        height: 150px;
        margin: 20px 0;
        img {
            width: 100%;
            height: 100%;
        }
    }

}
.upload-img {
  display: flex;
  justify-content: center;
  i {
    font-size: 20px;
    padding: 50px;
    border:2px dashed #ccc;
    border-radius: 4px;
  }
}
</style>
