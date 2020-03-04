// 需要使用Vue.use的方式去注册
// Vue.use会调用对象中的install方法 install方法第一个参数 是Vue对象
import LayoutHeader from './home/layout-header'
import LayoutAside from './home/layout-aside'
import BreadCrumb from './common/bread-crumb'
export default {
  install: function (Vue) {
    //   注册全局组件 Vue 一旦注册 在任意位置都可以使用
    Vue.component('layout-header', LayoutHeader) // 注册头部组件
    Vue.component('layout-aside', LayoutAside) // 注册左侧导航组件
    Vue.component('bread-crumb', BreadCrumb) // 注册一个面包屑组件
  }
}
