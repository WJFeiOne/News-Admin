<script>/* 登录页面 组件 */</script>


<template>
    <!-- 登录页组件 flex布局-->
    <el-row type="flex" justify="center" align="middle" class="container">
        <!-- 登录表单盒子 -->
        <div class="form-wrap">

            <!-- 登录表单标题 -->
            <h3>登录</h3>

            <!-- 登录表单 rules：表单的校验规则 model：表单的数据对象-->
            <el-form ref="form" :rules="rules" :model="form" label-width="80px">

                <!-- 账号输入框 prop：校验字段 -->
                <el-form-item label="账号" prop="username">
                    <!-- 账号输入框组件 -->
                    <el-input v-model="form.username"></el-input>
                </el-form-item>

                <!-- 密码输入框 prop：校验字段 -->
                <el-form-item label="密码" prop="password">
                    <!-- 密码输入框组件 -->
                    <el-input type="password" v-model="form.password"></el-input>
                </el-form-item>

                <el-form-item>
                    <!-- 提交按钮组件 -->
                    <el-button type="primary" @click="submitForm">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-row>
</template>


<script>
// 登录页 组件实例
export default {
    // 指定 登录页组件 数据
    data() {
        // 返回 登录页组件 数据
        return {
            // 指定 表单数据对象
            form: {
                username: "",  // 接收 账户参数
                password: ""   // 接收 账户参数
            },

            // 指定 表单校验规则
            rules: {
                // 账号 校验规则
                username: [
                    // 账号 校验字段  required 代表是否必填, message 错误时候的提示,trigger 什么时候触发
                    { required: true, message: "请输入用户名", trigger: "blur" }
                ],
                // 密码 校验规则
                password: [
                    // 密码 校验字段
                    { required: true, message: "请输入密码", trigger: "blur" }
                ]
            }
        };
    },

    // 指定 组件事件
    methods: {
        // 点击 提交表单
        submitForm() {
            // 获取 表单数据 validate 方法是 element 的表单才有的
            this.$refs.form.validate(valid => {
                // 判断 是否有 表单数据
                if (valid) {
                    // 发送 登录页面 数据请求
                    this.$axios({
                        url: "/login",   // 请求 数据接口
                        method: "POST",  // 请求 数据方式
                        data: this.form  // 请求 数据参数
                    }).then(res => {
                        // 解构 响应数据 参数
                        const { message, statusCode, data } = res.data;

                        // 判断 是否登录失败
                        if (statusCode === 401) {
                            // 弹出 失败提示框
                            this.$message.error(message); 
                            return;  // 返回
                        }

                        // 弹出 登录成功提示框
                        this.$message.success(message);

                        // 把用户信息 保存到本地
                        localStorage.setItem("user", JSON.stringify(data));
                        
                        // 添加 定时跳转
                        setTimeout(() => {
                            // 跳转到 后台管理首页
                            this.$router.push("/");
                        }, 1500);
                    });
                }
            });
        }
    }
};
</script>

<style scoped lang="less">
// 登录页组件样式
.container {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    // 登录标题样式
    h3 {
        text-align: center;
        margin-bottom: 20px;
    }
}
// 表单盒子样式
.form-wrap {
    padding: 20px;
    border: 1px #ddd solid;
    border-radius: 10px;
    width: 400px;
}
</style>