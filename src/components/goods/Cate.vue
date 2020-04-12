<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary">添加分类</el-button>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <tree-table
        :data="cateList"
        :columns="columns"
        :selection-type="false"
        :expand-type="false"
        show-index
        index-text="#"
        border
        class="treeTable"
      >
        <!-- 是否有效 -->
        <template slot="isok" slot-scope="scope">
          <i style="color:lightgreen;" class="el-icon-success" v-if="scope.row.cat_deleted===false"></i>
          <i style="color:red;" class="el-icon-error" v-else></i>
        </template>
        <!-- 排序 -->
        <template slot="order" slot-scope="scope">
          <el-tag v-if="scope.row.cat_level===0" size="mini">一级</el-tag>
          <el-tag v-else-if="scope.row.cat_level===1" size="mini" type="success">二级</el-tag>
          <el-tag v-else-if="scope.row.cat_level===2" size="mini" type="warning">三级</el-tag>
        </template>
        <!-- 操作 -->
        <template class="opt-btn" slot="opt" slot-scope="scope">
          <div class="btn-div">
            <el-button class="btn1" size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete">搜索</el-button>
          </div>
        </template>
      </tree-table>
      <!-- 分页 -->

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="querInfo.pagenum"
        :page-sizes="[3,5,10,15]"
        :page-size="querInfo.pageize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 商品分类的数据列表，默认为空
      cateList: [],
      // 查询条件
      querInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      // 总数据条数
      total: 0,
      // 为 table 指定列的定义
      columns: [
        {
          label: "分类名称",
          prop: "cat_name"
        },
        {
          // 表示将当前列定义为模板类
          label: "是否有效",
          type: "template",
          // 表示当前这一类使用模板名称
          template: "isok"
        },
        {
          // 表示将当前列定义为模板类
          label: "排序",
          type: "template",
          // 表示当前这一类使用模板名称
          template: "order"
        },
        {
          // 表示将当前列定义为模板类
          label: "操作",
          type: "template",
          // 表示当前这一类使用模板名称
          template: "opt"
        }
      ]
    };
  },
  created() {
    this.getCateList();
  },
  methods: {
    // 获取商品列表数据
    async getCateList() {
      const { data: res } = await this.$http.get("categories", {
        params: this.querInfo
      });
      if (res.meta.status !== 200) {
        return this.$message.error("获取商品分类失败");
      }
      // 把数据列表赋值给 cateList
      this.cateList = res.data.result;
      // 为总数据条数赋值
      this.total = res.data.total;
      console.log(this.cateList);
    },
    // 监听pageSize改变的事件
    handleSizeChange(newSize) {
      this.querInfo.pagesize = newSize;
      this.getCateList();
    },
    // 监听 pagenum 的改变
    handleCurrentChange(newPage) {
      this.querInfo.pagenum = newPage;
      this.getCateList();
    }
  }
};
</script>
<style lang="less" scoped>
.btn-div {
  width: 70%;
  padding: 0 15% 0 20%;
}
.btn-div > .el-button {
  width: 45%;
}
.treeTable {
  margin: 10px 0;
}
</style>
