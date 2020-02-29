import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui' // 引入模块
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
Vue.config.productionTip = false
Vue.use(ElementUI) // 全局注册element-ui框架 一旦全局注册 所有的位置都可以使用组件
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
