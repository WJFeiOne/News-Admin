/* 项目入口文件 */


import Vue from 'vue'                           // 导入 Vue 库文件
import App from './App.vue'                     // 导入 入口组件
import router from './router'                   // 导入 路由组件
import Element from 'element-ui';               // 导入 element-ui 组件件库
import 'element-ui/lib/theme-chalk/index.css';  // 导入 element-ui 样式文件                    


// 指定 生产环境时候 是否有提示
Vue.config.productionTip = false

// 注册 element-ui 组件库
Vue.use(Element);


// 创建 Vue 根实例 
new Vue({
    router,               // 挂载 路由到根实例    
    render: h => h(App)   // 指定 一个组件渲染根实例
}).$mount('#app')         // $mount 把根实例挂载到 指定的节点中，相当于el
