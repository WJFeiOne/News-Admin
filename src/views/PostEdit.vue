<script>/* 编辑文章 组件 */</script>


<template>
    <!-- 编辑文章组件布局 -->
    <div style="padding:30px;">
        <!-- 编辑文章组件表单 -->
        <el-form :model="form" label-width="80px">
            <!-- 编辑文章的标题 -->
            <el-form-item label="标题">
                <!-- 标题输入框组件 -->
                <el-input v-model="form.title"></el-input>
            </el-form-item>

            <!-- 编辑文章的类型 -->
            <el-form-item label="类型">
                 <!-- 编辑文章的类型选项 -->
                <el-radio-group v-model="form.type">
                    <!-- 文章选项 -->
                    <el-radio :label="1">文章</el-radio>
                    <!-- 视频选项 -->
                    <el-radio :label="2">视频</el-radio>
                </el-radio-group>
            </el-form-item>

            <!-- 编辑文章的内容 -->
            <el-form-item label="内容" v-if="form.type === 1">
                <!-- 调用富文本组件 -->
                <VueEditor :config="config" ref="vueEditor" />
            </el-form-item>

            <!-- 编辑文章的封面 -->
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
                    :file-list="form.cover"
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
                <el-button type="primary" @click="onSubmit">发布编辑</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
// 导入 富文本编辑器 组件
import VueEditor from "vue-word-editor";
// 导入 富文本编辑器 样式
import "quill/dist/quill.snow.css";

// 编辑文章 组件实例
export default {
    // 指定 编辑文章 组件
    data() {
        // 返回 编辑文章 组件
        return {
            // 指定 组件表单 数据
            form: {
                title: "",       // 接收 文章标题 数据
                content: "",     // 接收 文章内容 数据
                cover: [],       // 接收 文章封面 数据
                type: 1          // 接收 文章类型 数据
            },
            
            // 栏目的列表
            allCate: [],
            // 获取 本地 token 认证信息
            token: JSON.parse(localStorage.getItem(`user`) || `{}`).token,

            // 指定 富文本编辑器 配置
            config: {
                // 上传图片 配置
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
                        // insert 方法会把内容注入到编辑器中，res.data.url是资源地址
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
                            localStorage.getItem("user") || `{}` // 获取本地 token 认证信息
                        ).token
                    },
                    // 接收 响应数据 res是结果
                    uploadSuccess: (res, insert) => {
                        // insert 方法会把内容注入到编辑器中，res.data.url 是资源地址
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
            // 判断 文章类型
            if (this.form.type === 1) {
                // 使用 refs 获取富文本编辑器中的内容
                this.form.content = this.$refs.vueEditor.editor.root.innerHTML;
            }
            
            // 请求 编辑文章 数据
            this.$axios({
                // 请求 数据接口
                url: "/post_update/" + this.$route.params.id,
                // 请求 数据方式
                method: "POST",
                headers: {   // 添加 token 认证信息
                    Authorization: JSON.parse(
                        localStorage.getItem("user") || `{}`  // 获取本地 token 认证信息
                    ).token
                },
                data: this.form  // 请求 数据参数
            }).then(res => {
                const { message } = res.data;   // 解构 响应数据 data
                this.$message.success(message); // 弹出 发布成功 提示
                // 添加 定时跳转
                setTimeout(() => {
                    this.$router.push("/post_list");  // 跳转到 后台文章列表页面
                }, 1500);
            });
        },

        // 移除图片 时候触发
        handleRemove(file, fileList) {
            // 重新 获取封面图片
            this.form.cover = fileList;
        },

        // 图片上传成功 时候触发
        handleSuccess(res, file) {
            // 添加 封面图片 数据
            this.form.cover.push({
                id: res.data.id,  // 添加 图片 id
                url: this.$axios.defaults.baseURL + res.data.url  // 添加 图片 路径
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
        // 获取当前文章 id
        const id = this.$route.params.id;
        // 请求 文章详情 数据
        this.$axios({
            // 请求 数据接口
            url: "/post/" + id
        }).then(res => {
            // 解构 响应数据 data
            const { data } = res.data;

            // 把详情的数据 赋值给 form 表单
            this.form = {
                title: data.title,  // 文章标题 数据
                content: "",        // 文章内容 数据
                cover: [],          // 文章封面 数据
                type: data.type     // 文章类型 数据
            };

            // 循环遍历 文章封面
            data.cover.forEach(v => {
                // 判断 文章封面是否为 网络图片
                if (v.url.indexOf("http") === -1) {
                    // 给本地服务器 上传的图片 添加基准路径
                    v.url = this.$axios.defaults.baseURL + v.url;
                }
                // 重新赋值 封面图片
                this.form.cover.push(v);
            });

            // 将文章内容数据 赋值给富文本编辑器
            this.$refs.vueEditor.editor.clipboard.dangerouslyPasteHTML(
                0,
                data.content
            );
        });
    }
};
</script>

<style>

</style>