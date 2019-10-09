<script>/* 发布文章 组件 */</script>


<template>
    <!-- 发布文章组件布局 -->
    <div style="padding:30px;">
        <!-- 发布文章组件表单 -->
        <el-form :model="form" label-width="80px">
            <!-- 发布文章的标题 -->
            <el-form-item label="标题">
                <!-- 标题输入框组件 -->
                <el-input v-model="form.title"></el-input>
            </el-form-item>

            <!-- 发布文章的类型 -->
            <el-form-item label="类型">
                <!-- 发布文章的类型选项 -->
                <el-radio-group v-model="form.type">
                    <!-- 文章选项 -->
                    <el-radio :label="1">文章</el-radio>
                    <!-- 视频选项 -->
                    <el-radio :label="2">视频</el-radio>
                </el-radio-group>
            </el-form-item>

            <!-- 发布文章的内容 -->
            <el-form-item label="内容" v-if="form.type === 1">
                <!-- 调用富文本组件 -->
                <VueEditor :config="config" ref="vueEditor" />
            </el-form-item>
            
            <!-- 发布文章的视频 -->
            <el-form-item label="视频" v-if="form.type === 2">
                <!-- 视频上传组件 -->
                <el-upload
                    :action="`${$axios.defaults.baseURL}/upload`"
                    name="file"
                    :headers="{
                    Authorization: token
                    }"
                    :on-success="handleVideoSuccess"
                >
                <!-- 上传视频按钮 -->
                <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
            </el-form-item>
            
            <!-- 发布文章的栏目 -->
            <el-form-item label="栏目">
                <!-- 文章栏目组件 -->
                <el-checkbox-group v-model="form.categories">
                    <!-- 文章栏目选项 allCate:所有的栏目 -->
                    <el-checkbox
                        v-for="(item, index) in allCate"
                        :key="index"
                        v-if="item.id !== 999"
                        :label="item.id"
                        name="type"
                    >{{item.name}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>

            <!-- 发布文章的封面 -->
            <el-form-item label="封面">
                <!-- 文章封面组件
                action：上传图片的链接
                name: 上传字段名
                list-type: 声明当前是上传多张图片
                on-success： 图片上传成功的函数
                on-remove: 移除图片函数-->
                <el-upload
                    :action="`${$axios.defaults.baseURL}/upload`"
                    name="file"
                    :headers="{
                        Authorization: token
                    }"
                    list-type="picture-card"
                    :on-success="handleSuccess"
                    :on-remove="handleRemove"
                >
                <!-- 添加封面图标 -->
                <i class="el-icon-plus"></i>
                </el-upload>
            </el-form-item>
            
            <!-- 发布文章按钮 -->
            <el-form-item>
                <!-- 按钮组件 -->
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>


<script>
// 导入 富文本编辑器 组件
import VueEditor from "vue-word-editor";
// 导入 富文本编辑器 样式
import "quill/dist/quill.snow.css";

// 发布文章 组件实例
export default {
    // 指定 发布文章 组件
    data() {
        // 指定 发布文章 组件
        return {
            // 指定 组件表单 数据
            form: {
                title: "",       // 接收 文章标题 数据
                content: "",     // 接收 文章内容 数据
                categories: [],  // 接收 文章栏目 数据
                cover: [],       // 接收 文章封面 数据
                type: 1          // 接收 文章类型 数据
            },

            // 栏目的列表
            allCate: [],
            // 获取 本地 token 认证信息
            token: JSON.parse(localStorage.getItem(`user`) || `{}`).token,

            // 指定 富文本编辑器 配置
            config: {

                // 上传图片的配置
                uploadImage: {
                    // 上传图片 数据接口
                    url: this.$axios.defaults.baseURL + "/upload",
                    // 指定 上传视频 字段名
                    name: "file",
                    headers: {  // 添加 token 认证信息
                        Authorization: JSON.parse(
                            localStorage.getItem("user") || `{}`  // 获取本地 token 认证信息
                        ).token
                    },
                    // 接收 响应数据 res是结果
                    uploadSuccess: (res, insert) => {
                        // insert方法会把内容注入到编辑器中，res.data.url是资源地址
                        insert(
                            this.$axios.defaults.baseURL + res.data.data.url
                        );
                    }
                },

                // 指定 上传视频 配置
                uploadVideo: {
                    // 上传视频 数据接口
                    url: this.$axios.defaults.baseURL + "/upload",
                    // 指定 上传视频 字段名
                    name: "file",
                    headers: {  // 添加 token 认证信息
                        Authorization: JSON.parse(
                            localStorage.getItem("user") || `{}`  // 获取本地 token 认证信息
                        ).token
                    },
                    // 接收 响应数据 res是结果
                    uploadSuccess: (res, insert) => {
                        // insert方法会把内容注入到编辑器中，res.data.url是资源地址
                        insert(
                            this.$axios.defaults.baseURL + res.data.data.url
                        );
                    }
                }
            }
        };
    },

    // 注册 组件
    components: {
        VueEditor  // 注册 富文本 组件
    },

    // 指定 组件事件
    methods: {
        // 点击 发布文章
        onSubmit() {
            // 解构 表单栏目 数据
            const { categories } = this.form;
            // 将 表单栏目 清空
            this.form.categories = [];

            // 循环遍历 表单栏目
            categories.forEach(v => {
                // 将表单栏目 id 转成对象数据
                this.form.categories.push({
                    id: v
                });
            });
           
            // 判断发布文章 是否为文章类型
            if (this.form.type === 1) {
                // 使用 refs 获取编辑器中内容
                this.form.content = this.$refs.vueEditor.editor.root.innerHTML;
            }

            // 请求 发布文章 数据
            this.$axios({
                url: "/post",   // 请求 数据接口
                method: "POST", // 请求 数据方式
                headers: {      // 添加 token 认证信息 
                    Authorization: JSON.parse(
                        localStorage.getItem("user") || `{}` // 获取本地 token 认证信息
                    ).token
                },
                data: this.form // 请求 数据参数
            }).then(res => {
                const { message } = res.data;   // 解构 响应数据 data
                this.$message.success(message); // 弹出 发布成功 提示
                // 添加 定时跳转
                setTimeout(() => {
                    // 跳转到 后台管理首页
                    this.$router.push("/post_list");// 跳转到 文章列表
                }, 1500);
            });
        },
 
        // 移除图片 时候触发
        handleRemove(file, fileList) {
            // 获取 图片字段 id
            const id = file.response.data.id;
            // 定义 接收数组  
            const arr = [];
            
            // 循环遍历 封面图片 cover
            this.form.cover.forEach(v => {
                // 找到 当前字段 id 
                if (v.id !== id) {
                    arr.push(v);   // 从 cover 中删除掉已经移除的图片
                } 
            });
            // 将移除后的 封面数据 重新赋值
            this.form.cover = arr;
        },

        // 图片上传成功 时候触发
        handleSuccess(res, file) {
            // 将封面图片 添加到数组中
            this.form.cover.push({
                id: res.data.id
            });
        },

        // 上传视频 时候触发
        handleVideoSuccess(res) {
            // 把视频连接保存到 content
            this.form.content = this.$axios.defaults.baseURL + res.data.url;
        }
    },
    
    // 组件 加载完成后 触发
    mounted() {
        // 请求 文章栏目 数据
        this.$axios({
            url: "/category"  // 请求 数据接口
        }).then(res => {
            const { data } = res.data;  // 解构 响应数据 data
            this.allCate = data;        // 保存 文章栏目 数据
        }); 
    }
};
</script>


<style>

</style>