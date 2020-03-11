<template>
  <el-card class='articles'>
      <bread-crumb slot='header'>
          <template slot='title'>文章列表</template>
      </bread-crumb>
      <!-- 搜索工具栏 筛选 -->
      <!-- 表单容器 -->
      <el-form style="padding-left:50px">
         <el-form-item label="文章状态:">
           <!-- 放置单选框组 -->
           <!-- 第一种监听值改变的方式 -->
          <!-- <el-radio-group v-model="searchForm.status" @change="changeCondition"> -->
           <el-radio-group v-model="searchForm.status" >
             <!-- 单选框选项  label值表示该选项对应的值-->
             <!-- :label的意思是后面值不会加引号 -->
              <!-- 文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，不传为全部 / 先将 5 定义成 全部 -->

             <el-radio :label="5">全部</el-radio>
             <el-radio :label="0">草稿</el-radio>
             <el-radio :label="1">待审核</el-radio>
             <el-radio :label="2">审核通过</el-radio>
             <el-radio :label="3">审核失败</el-radio>
           </el-radio-group>
         </el-form-item>
         <el-form-item label="频道类型:">
           <!-- 选择器 -->
            <!-- 第一种监听值改变的方式 -->
           <!-- <el-select @change="changeCondition" placeholder="请选择频道" v-model="searchForm.channel_id"> -->
           <el-select  placeholder="请选择频道" v-model="searchForm.channel_id">
             <!-- 下拉选项 应该通过接口来获取数据 -->
             <!-- el-option是下拉的选项 label是显示值  value是绑定的值 -->
             <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
           </el-select>
         </el-form-item>
         <el-form-item label="日期范围:">
           <!-- 日期范围选择组件  要设置type属性为 daterange-->
           <!-- 显示值和存储值的结构不一致 使用value-format指定绑定值的格式。 -->
            <!-- 第一种监听值改变的方式 -->
           <!-- <el-date-picker @change="changeCondition" type='daterange' value-format="yyyy-MM-dd" v-model="searchForm.dateRange"></el-date-picker> -->
           <el-date-picker  type='daterange' value-format="yyyy-MM-dd" v-model="searchForm.dateRange"></el-date-picker>
         </el-form-item>
      </el-form>
      <!-- 文章的主体结构 flex布局  -->
      <el-row class='total' type='flex' align="middle">
         <span>共找到1000条符合条件的内容</span>
      </el-row>
      <!-- 列表内容 -->
      <!-- article-item 作为一个循环项 -->
       <div class="article-item" v-for="item  in  list" :key="item.id.toString()">
         <!-- 左侧内容 -->
         <div class="left">
           <!-- 设置文章的封面信息 有的数组有值 有的没值 搞一个默认值 -->
               <!-- <img src="../../assets/img/default.gif" alt=""> -->
              <!--  采用变量的形式 赋值 -->
             <img :src=" item.cover.images.length ?  item.cover.images[0] : defaultImg" alt="">
             <div class="info">
               <span>{{ item.title}}</span>
               <!-- 文章状态 0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除 -->
               <!-- 只是改变显示的格式 可以用过滤器   两个过滤器 分别处理   显示文本 和 标签类型-->
               <el-tag :type=" item.status | filterType" class='tag'>{{  item.status  | filterStatus}}</el-tag>
               <!-- 发布日期 -->
               <span class='date'>{{ item.pubdate }}</span>
             </div>
         </div>
         <!-- 右侧内容 -->
         <div class="right">
           <!-- 事件绑定方法 -->
           <!-- <span @click="toPublish"><i class="el-icon-edit"></i> 修改</span> -->
           <!-- 事件直接跟逻辑 -->
           <span @click="$router.push(`/home/publish/${item.id.toString()}`)"><i class="el-icon-edit"></i> 修改</span>

           <!-- 需要传递参数 传递要删除的id  id 有可能是大数字类型 -->
           <span @click="delMaterial(item.id.toString())"><i class="el-icon-delete"></i> 删除</span>
         </div>
       </div>
       <!-- 放置分页组件 -->
       <el-row type='flex' justify="center" style='height:80px' align="middle">
             <!-- 分页组件 -->
             <el-pagination
              :current-page="page.currentPage"
              :page-size="page.pageSize"
              :total="page.total"
              @current-change="changePage"
               background  layout='prev,pager,next'>
             </el-pagination>
       </el-row>
  </el-card>
</template>

<script>
import { getChannels } from '@/api/channels'
import { getArticles } from '@/api/articles'
export default {
  data () {
    return {
      page: {
        currentPage: 1, // 当前页码
        pageSize: 10, // 接口要求每页 10-50条之间
        total: 0 // 总数
      },
      // 定义一个表单数据对象
      searchForm: {
        // 数据
        // 文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除，不传为全部 / 先将 5 定义成 全部
        // 传值的是时候如果是5 就不传
        status: 5, // 默认为全部的状态
        channel_id: null, // 表示没有任何的频道
        dateRange: [] // 日期范围
      },
      channels: [], // 专门来接收频道的数据
      list: [], // 定义list数据接收文章列表
      defaultImg: require('../../assets/img/default.gif') // 地址对应的文件变成了变量 在编译的时候会被拷贝到对应位置
    }
  },
  // 监听data中的数据变化  第二种解决方案  watch监听对象的深度检测方案
  watch: {
    searchForm: {
      deep: true, // 固定写法 表示 会深度检测searchForm中的数据变化
      // handler也是一个固定写法 一旦数据发生任何变化 就会触发 更新
      handler () {
        //  统一调用改变条件的 方法
        this.page.currentPage = 1 // 只要条件变化 就变成第一页
        this.changeCondition() // this 指向当前组件实例
      }
    }
  },
  // 专门处理显示格式的
  filters: {
    // 过滤器的第一个参数是value
    // 文章状态 0-草稿，1-待审核，2-审核通过，3-审核失败
    filterStatus (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2 :
          return '已发表'
        case 3:
          return '审核失败'
      }
    },
    // 过滤器除了用在 插值表达中还可以用 v-bind 的表达式中
    filterType (value) {
      // 根据当前状态的值 显示不同类型的tag标签
      switch (value) {
        case 0:
          return 'warning' // 草稿的时候 警告
        case 1:
          return 'info' // 待审核
        case 2 :
          return '' // 已发表
        case 3:
          return 'danger' // 失败 错误
      }
    }
  },
  methods: {
    // 跳转到发布页面
    toPublish () {
      // 编程式导航
      this.$router.push('/home/publish')
    },
    // 删除素材方法
    delMaterial (id) {
    //  先友好的提示一下
      this.$confirm('您确定删除此条数据?', '提示').then(() => {
        // 如果进入了then 表示点击了确定
        this.$axios({
          method: 'delete',
          url: `/articles/${id}` // 地址 是  /articles/:target target 是文章id
        }).then(() => {
          // 如果删除成功了
          // 重新获取数据
        //  this.getArticles() // 如果这么写 就意味着你 舍去了当前的页码和条件 不能这么写
          // 应该带着条件和页码去加载
          this.changeCondition() // 重新加载
        }).catch(() => {
          this.$message.error('删除文章失败')
        })
      })
    },
    // 改变页码事件
    changePage (newPage) {
      // 先将最新的页码给到 当前页码
      this.page.currentPage = newPage // 最新页码
      this.changeCondition() // 直接调用改变事件的方法
    },
    // 改变了条件
    changeCondition () {
      // 当触发此方法的时候 表单数据已经变成最新的了
      // 组装条件 params
      const params = {
        page: this.page.currentPage, // 如果条件改变 就回到第一页
        per_page: this.page.pageSize,
        // 文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除，不传为全部
        status: this.searchForm.status === 5 ? null : this.searchForm.status, // 5 是我们前端虚构的
        channel_id: this.searchForm.channel_id, // 就是表单的数据
        begin_pubdate: this.searchForm.dateRange && this.searchForm.dateRange.length ? this.searchForm.dateRange[0] : null,
        end_pubdate: this.searchForm.dateRange && this.searchForm.dateRange.length > 1 ? this.searchForm.dateRange[1] : null
      }
      // 通过接口传入
      this.getArticles(params) // 直接调用获取方法
    },
    // 获取频道数据
    async  getChannels () {
      const result = await getChannels()
      this.channels = result.data.channels
    },
    // 获取文章列表
    async   getArticles (params) {
      const result = await getArticles(params)
      this.list = result.data.results // 获取文章列表
      // 将总数赋值给total
      this.page.total = result.data.total_count // 总数
    }
  },
  created () {
    // 获取频道数据
    this.getChannels()
    this.getArticles() // 手动调用获取文章数据
  }

}
</script>

<style lang='less' scoped>
   .articles {
      .total {
        height: 60px;
        border-bottom: 1px dashed #ccc;
      }
      // 对文章循环项进行样式的编写
       .article-item {
         display: flex;
         justify-content: space-between;
         padding: 20px  0;
         border-bottom: 1px solid #ccc;
         .left {
           display: flex;
           img {
             width:180px;
             height: 100px;
             border-radius: 4px;
           }
           .info {
             display: flex;
             flex-direction: column;
             height: 100px;
             justify-content: space-around;
             margin-left: 10px;
             .date {
               color: #999;
               font-size:12px;
             }
             .tag {
               width: 60px;
               text-align: center;
             }
           }
         }
         .right {
           span {
             font-size: 12px;
             margin-right: 8px;
             cursor: pointer;
             user-select: none;
           }
         }
       }
   }
</style>
