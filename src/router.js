/* 项目路由文件 */


import Vue from 'vue'             // 导入 Vue 库文件
import Router from 'vue-router'   // 导入 路由构造函数 


// 注册 路由组件 插件
Vue.use(Router)


// 导出创建 路由对象
export default new Router({
  // 指定 默认声明
  mode: 'history',
  // 指定 部署包 url 的配置
  base: process.env.BASE_URL,
  // 指定 路由配置
  routes: [

  ]
})
