<script>/* 后台首页 组件 */</script>


<template>
    <!-- 后台首页 组件布局 -->
    <el-container class="container">
        <!-- 侧边栏布局 -->
        <el-aside width="200px">
            <!-- 新闻 logo -->
            <div class="logo">
                <img src="../../public/news.png" alt="">
                新闻头条
            </div>
            
            <!-- 侧边栏菜单 default-active：当前高亮选中的菜单 -->
            <el-menu default-active="1"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">

                <!-- index是一标识，给default-actives使用的 -->
                <el-submenu index="1">

                    <!-- 文章管理菜单 slot="title"必须要保留 -->
                    <template slot="title">
                        <!-- 管理菜单图标 -->
                        <i class="el-icon-location"></i>
                        <span>文章管理</span>
                    </template>

                    <!-- 文章列表项 -->
                    <el-menu-item index="1-1">
                        文章列表
                    </el-menu-item>

                    <!-- 发布文章项 -->
                    <el-menu-item index="1-2">
                        发布文章
                    </el-menu-item>
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
                <span>退出</span>
            </el-header>
            <!-- 子页面显示的内容 -->
            <el-main>Main</el-main>
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
            user: JSON.parse(localStorage.getItem("user") || `{}`)
        };
    },

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
.el-menu{
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
.logo{
    * {
        vertical-align: middle;
    }
    height: 60px;
    width:200px;
    line-height: 60px;
    text-align: center;
    color:#a9b0c2;
    img{
        height: 60px;
        width:60px;
        margin-left:-10px;
        margin-right: 2px;  
    }
}
</style>