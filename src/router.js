/* 项目路由文件 */


import Vue from 'vue'              // 导入 Vue 库文件
import Router from 'vue-router'    // 导入 路由构造函数
import Login from "@/views/Login"  // 导入 登录页面 组件

import Index from "@/views/Index"         // 导入 后台首页 组件
import PostList from "@/views/PostList"   // 导入 文章列表 组件
import PostAdd from "@/views/PostAdd"     // 导入 发布文章 组件
import PostEdit from "@/views/PostEdit";  // 导入 编辑文章 组件


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
        { path: "/", component: Index , meta: "首页", children: [   // 匹配 后台首页 地址
          { path: "post_list", component: PostList, meta: "文章列表"},      // 匹配 文章列表 地址    
          { path: "post_add", component: PostAdd, meta: "发布文章"},        // 匹配 发布文章 地址
          { path: "post_edit/:id", component: PostEdit,  meta: "编辑文章"}  // 匹配 编辑文章 地址
        ]}
         
    ]
})