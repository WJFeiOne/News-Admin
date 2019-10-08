/* 项目路由文件 */


import Vue from 'vue'              // 导入 Vue 库文件
import Router from 'vue-router'    // 导入 路由构造函数
import Login from "@/views/Login"  // 导入 登录页面 组件

import Index from "@/views/Index"  // 导入 后台首页 组件


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
        {path: "/login",component: Login},  // 匹配 登录页面 地址            
        { path: "/", component: Index },    // 匹配 后台首页 地址
    ]
})