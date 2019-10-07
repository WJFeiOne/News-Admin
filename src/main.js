/* 项目入口文件 */


import Vue from 'vue';                          // 导入 Vue 库文件
import App from './App.vue';                    // 导入 入口组件
import router from './router';                  // 导入 路由组件
import Element from 'element-ui';               // 导入 element-ui 组件件库
import 'element-ui/lib/theme-chalk/index.css';  // 导入 element-ui 样式文件 
import axios from "axios";                      // 导入 axios http 库文件


// 指定 生产环境时候 是否有提示
Vue.config.productionTip = false;

// 注册 element-ui 组件库
Vue.use(Element);

// 把axios挂载到vue的原型
Vue.prototype.$axios = axios;

// 设置 基准路径
axios.defaults.baseURL="http://localhost:3000";

// 添加 路由守卫
router.beforeEach((to, from, next) => {
    // 判断 非登录页，都必须判断是否有 token
    if(to.path !== "/login"){
        // 获取 本地用户数据
        const token = JSON.parse(localStorage.getItem("user") || `{}`).token;
        // 判断是否有 token 值
        if(token){
            // 有 token 正常跳转
            next()
        }else{
            // 没有 token 返回登录页
            next("/login")
        }
    }else{
        // 正常访问 登录页面
        next();
    }
})


// 创建 Vue 根实例 
new Vue({
    router,               // 挂载 路由到根实例    
    render: h => h(App)   // 指定 一个组件渲染根实例
}).$mount('#app')         // $mount 把根实例挂载到 指定的节点中，相当于el
