<script>/* 后台首页 组件 */</script>


<template>
    <!-- 后台首页 组件布局 -->
    <el-container class="container">
        <!-- 侧边栏布局 -->
        <el-aside width="200px">
            <!-- logo 链接 -->
            <router-link to="/">
            <!-- 新闻 logo -->
            <div class="logo">
                <!-- logo 图片 -->
                <img src="../../public/news.png" alt="">
                新闻头条
            </div>
            </router-link>

            <!-- 侧边栏菜单 default-active：当前高亮选中的菜单 -->
            <el-menu
                default-active="1"
                class="el-menu-vertical-demo"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
            >
                <!-- index是一标识，给default-actives使用的 -->
                <el-submenu index="1">
                    <!-- 文章管理菜单 slot="title"必须要保留 -->
                    <template slot="title">
                        <!-- 管理菜单图标 -->
                        <i class="el-icon-location"></i>
                        <span>文章管理</span>
                    </template>

                    <!-- 文章列表链接 -->
                    <router-link to="/post_list">
                        <!-- 文章列表组件 -->
                        <el-menu-item index="1-1">文章列表</el-menu-item>
                    </router-link>

                    <!-- 发布文章链接 -->
                    <router-link to="/post_add">
                        <!-- 发布文章组件 -->
                        <el-menu-item index="1-2">发布文章</el-menu-item>
                    </router-link>
                </el-submenu>
            </el-menu>
        </el-aside>

        <!-- 右侧的内容部分 -->
        <el-container>
            <!-- 头部 -->
            <el-header>
                <!-- 管理员头像 -->
                <img :src="$axios.defaults.baseURL + user.user.head_img" alt class="head" />
                <!-- 管理员头像 -->
                <span>{{ user.user.nickname }}</span>
                <!-- 退出按钮 -->
                <span @click="handleLogut" style="cursor:pointer">退出</span>
            </el-header>
            <!-- 子页面显示的内容 -->
            <el-main>
                <!-- 显示面包屑导航 -->
                <div>{{ breaks }}</div>
                <!-- 显示子路由匹配的页面 -->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
// 后台首页 组件实例
export default {
    // 指定 后台首页 数据
    data() {
        // 返回 后台首页 数据
        return {
            // 接收 本地管理员 数据
            user: JSON.parse(localStorage.getItem("user") || `{}`),
            // 接收 面包屑导航 数据
            // breaks:""
        };
    },

    // 监听 组件参数 变化
    // watch:{
    //     // 监听 路由参数 数据
    //     $route(){
    //         // 解构 路由数据
    //         const {matched} = this.$route;
    //         // 定义 空数组
    //         const arr = [];
    //
    //         // 循环遍历 路由参数
    //         matched.forEach(v=>{
    //             // 将遍历到的 自定义导航 添加到数组中
    //             arr.push(v.meta)
    //         })
    //         // 获取拼接后 的面包屑导航数据
    //         this.breaks=arr.join("/")
    //     }
    // },

    // 监听 实例属性 变化
    computed: {
        // 获取 面包屑 导航数据
        breaks(){
            // 解构 路由数据
            const {matched} = this.$route;
            // 定义 空数组
            const arr = [];

            // 循环遍历 路由参数
            matched.forEach(v => {
                // 将遍历到的 自定义导航 添加到数组中
                arr.push(v.meta)
            })
            // 返回拼接后 的面包屑导航数据
            return arr.join(" / ");
        }
    },

    // 指定 组件事件
    methods:{
        // 点击 退出登录
        handleLogut(){
            // 弹出 退出登录确认窗口
            this.$confirm('确定退出','提示',{
                confimButtonText:'确定',  // 确定按钮
                cancelbuttonText:'取消',  // 取消按钮
                type:'warning'            // 提示图标
            }).then(()=>{
                localStorage.removeItem('user'); // 删除本地 用户信息
                this.$router.push("/login")      // 跳转到 登录页面
            }) 
        }
    }
};
</script>


<style scoped lang="less">
// 后台首页组件样式
.el-header,
.el-footer {
    background-color: #eee;
    color: #2f4050;
    line-height: 60px;
}

.el-header {
    text-align: right;

    * {
        vertical-align: middle;
    }

    .head {
        width: 38px;
        height: 38px;
        border-radius: 50%;
        border: 1px #999 solid;
    }

    span {
        margin-left: 10px;
    }
}
.el-menu {
    border: none;
}
.el-aside {
    background-color: #2f4050;
    color: #2f4050;
    line-height: 200px;
}
.el-main {
    background-color: #fff;
    color: #2f4050;
}
.container {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
}
.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
    line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
    line-height: 320px;
}
.logo {
    * {
        vertical-align: middle;
    }
    height: 60px;
    width: 200px;
    line-height: 60px;
    text-align: center;
    color: #a9b0c2;
    img {
        height: 60px;
        width: 60px;
        margin-left: -10px;
        margin-right: 2px;
    }
}
</style>