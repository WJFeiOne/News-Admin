<script>/* 文章列表 组件 */</script>


<template>
    <div>
        <!-- 文章列表 组件布局 data: 列表的数据对象 -->
        <el-table :data="tableData" style="width: 100%">
            <!-- 序号列表组件 label：标签 -->
            <el-table-column label="序号" width="80" >
                <!-- 序号内容组件 scope.row：数组中当前列的数据对象 -->
                <template slot-scope="scope">
                    <!-- 列表序号 -->
                    <span>{{scope.$index + 1}}</span>
                </template>
            </el-table-column>

            <!-- 标题列表组件 -->
            <el-table-column label="标题" width="800">
                <!-- 标题内容组件 -->
                <template slot-scope="scope">
                    <!-- 标题列表内容 -->
                    <span>{{scope.row.title}}</span>
                </template>
            </el-table-column>

            <!-- 显示列表组件 -->
            <el-table-column label="显示" width="200">
                <!-- 显示内容组件 -->
                <template slot-scope="scope">
                    <!-- 显示列表内容 -->
                    <span>{{scope.row.open === 1 ? '显示': '隐藏'}}</span>
                </template>
            </el-table-column>

            <!-- 类型列表组件 -->
            <el-table-column label="类型" width="200">
                <!-- 类型内容组件 -->
                <template slot-scope="scope">
                    <!-- 类型列表内容 -->
                    <span>{{scope.row.type === 1 ? '文章': '视频'}}</span>
                </template>
            </el-table-column>

            <!-- 操作列表组件 -->
            <el-table-column label="操作">
                <!-- 操作内容组件 -->
                <template slot-scope="scope">
                    <!-- 编辑文章按钮 -->
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <!-- 关闭文章按钮 -->
                    <el-button
                        size="mini"
                        :type="scope.row.open === 0 ? 'success': 'danger'"
                        @click="handleDelete(scope.$index, scope.row)">
                        {{scope.row.open === 0 ? '打开': '关闭'}}
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="paging">
        <!-- 分页组件 -->
        <!-- size-change：条数切换时候触发的函数
        current-change：当前页数切换时候触发的函数
        current-page：当前的页数
        page-sizes：页面条数的列表
        page-size: 当前页面的条数
        layout：布局列表，默认就行
        total：全部的条数 -->
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-sizes="[5, 10, 15]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        ></el-pagination>
        </div>
    </div>
</template>

<script>
// 文章列表 组件实例
export default {
    // 指定 文章列表 数据
    data() {
        // 返回 文章列表 数据
        return {
            tableData: [],  // 接收 文章列表 数据
            pageSize: 5,    // 接收 分页条数 数据
            pageIndex: 1,   // 接收 当前页数 数据
            total: 0,       // 接收 分页数据 总条数 
        };
    },

    // 指定 组件事件
    methods: {
        // 关闭或者 打开文章
        handleDelete(index, row) {
            // 请求 文章打开状态 数据
            this.$axios({
                url: "/post_update/" + row.id,  // 请求 数据接口
                method: 'POST',   // 请求 数据方式
                headers: {        // 添加 token 认证信息
                    Authorization: JSON.parse(localStorage.getItem("user") || `{}`).token
                },
                data: {
                    open: row.open === 1 ? 0 : 1  // 请求 文章打开状态 参数
                }
            }).then(res => {
                // 重新请求 文章列表 数据
                this.getList();
            })
        },

        // 切换 条数时候触发
        handleSizeChange(val){
            this.pageSize = val;   // 获取 分页条数 数据
            this.getList();        // 请求 文章列表 数据
        },

        // 切换 页数时候触发
        handleCurrentChange(val) {
            this.pageIndex = val;  // 获取 当前页数 数据
            this.getList();        // 请求 文章列表 数据
        },

       // 封装 文章列表 数据请求
        getList(){
            // 请求 文章列表 数据
            this.$axios({
                // 请求 数据接口
                url: `/post?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`
            }).then(res => {
                const { data } = res.data;  // 解构 响应数据
                this.tableData = data;      // 保存 文章列表 数据
            });
        }
    },

    // 组件 加载完毕 执行
    mounted() {
        // 请求 文章列表 数据
        this.getList();

        // 获取 文章总条数 请求
        this.$axios({
            // 请求 数据接口
            url: `/post?pageIndex=${this.pageIndex}&pageSize=9999`
        }).then(res => {
            const { data } = res.data;  // 解构 响应数据
            this.total = data.length;   // 设置 分页总条数
        });
    }
};
</script>

<style scoped lang="less">
// 分页样式
.paging{
    margin: 10px 500px;
}
</style>