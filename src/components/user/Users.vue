<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="10">
        <el-col :span="10">
          <el-input
            v-model="queryInfo.query"
            placeholder="请输入内容"
            clearable
            @clear="getUserList"
          >
            <el-button
              @click="getUserList"
              slot="append"
              icon="el-icon-search"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="5">
          <el-button @click="addDialogVisible = true" type="primary"
            >添加用户</el-button
          >
        </el-col>
      </el-row>
      <!-- 用户列表区域 -->
      <el-table :data="userList" border stripe>
        <el-table-column label="ID" type="index"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>

        <el-table-column label="状态">
          <!-- 通过 solt-scope 插槽拿到数据 -->
          <el-switch
            slot-scope="scope"
            v-model="scope.row.mg_state"
            @change="userStateChanged(scope.row)"
          ></el-switch>
        </el-table-column>

        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <!-- 修改 -->
            <el-tooltip
              effect="dark"
              :enterable="disabled"
              content="修改"
              placement="bottom"
            >
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="showEditDialog(scope.row.id)"
              ></el-button>
            </el-tooltip>
            <!-- 删除 -->
            <el-tooltip
              effect="dark"
              :enterable="disabled"
              content="删除"
              placement="bottom"
            >
              <el-button
                @click="removeUserById(scope.row.id)"
                type="danger"
                icon="el-icon-delete"
                size="mini"
              ></el-button>
            </el-tooltip>
            <!-- 分配角色 -->
            <el-tooltip
              effect="dark"
              :enterable="disabled"
              content="分配角色"
              placement="bottom"
            >
              <el-button
                class="user-setting-button"
                type="warning"
                size="mini"
                @click="setRole(scope.row)"
              >
                <i class="el-icon-setting"></i>
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 3, 4, 5]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <!-- 添加用户的对话框 -->
    <el-dialog
      @close="addDialogClosed"
      title="添加用户"
      :visible.sync="addDialogVisible"
      width="50%"
    >
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="80px"
      >
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>

        <el-form-item label="联系电话" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>

      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改用户对话框 -->
    <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="50%">
      <el-form
        :model="editForm"
        :rules="addFormRules"
        ref="editFormRef"
        label-width="80px"
        @close="editDialogClosed"
      >
        <el-form-item label="用户名">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 分配角色的对话框 -->
    <el-dialog
      title="分配角色"
      :visible.sync="setRoleDialogVisible"
      width="50%"
    >
      <div>
        <p>当前的用户: {{ userInfo.username }}</p>
        <p>当前的角色: {{ userInfo.role_name }}</p>
        <el-select v-model="selectedRoleId" placeholder="请选择">
          <el-option
            v-for="item in rolesList"
            :key="item.id"
            :label="item.roleName"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="SetRoleDialogClosed">取 消</el-button>
        <el-button type="primary" @click="saveRoleInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    // 自定义的验证邮箱的规则
    var checkEmail = (rule, value, cb) => {
      const regEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (regEmail.test(value)) {
        // 合法的邮箱
        return cb();
      }
      cb(new Error('请输入合法的邮箱'));
    };
    // 自定义的验证手机号的规则
    var checkMobile = (rule, value, cb) => {
      const regMobile = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
      if (regMobile.test(value)) {
        return cb();
      }
      cb(new Error('请输入合法的手机号'));
    };

    return {
      // Tooltip 是否可用
      disabled: false,
      // 获取用户列表的参数对象
      queryInfo: {
        query: '',
        // 当前页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 2
      },
      userList: [],
      total: 0,
      // 控制添加用户对话框的显示与隐藏
      addDialogVisible: false,
      // 添加用户的表单数据
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 添加表单的验证规则对象
      addFormRules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            tigger: 'blur'
          },
          {
            min: 3,
            max: 10,
            message: '用户名的长度在3-10个字符之间',
            tigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            tigger: 'blur'
          },
          {
            min: 6,
            max: 15,
            message: '密码的长度在6-15个字符之间',
            tigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            message: '请输入邮箱',
            tigger: 'blur'
          },
          // 自定义的规则(引入方法)
          {
            validator: checkEmail,
            tigger: 'blur'
          }
        ],
        mobile: [
          {
            required: true,
            message: '请输入联系电话',
            tigger: 'blur'
          },
          // 自定义的规则(引入方法)
          {
            validator: checkMobile,
            tigger: 'blur'
          }
        ]
      },
      // 控制修改用户对话框的显示与隐藏
      editDialogVisible: false,
      // 查询到的用户信息对象
      editForm: {},
      editFormRules: {
        email: [
          {
            required: true,
            message: '请输入邮箱',
            tigger: 'blur'
          },
          // 自定义的规则(引入方法)
          {
            validator: checkEmail,
            tigger: 'blur'
          }
        ],
        mobile: [
          {
            required: true,
            message: '请输入联系电话',
            tigger: 'blur'
          },
          // 自定义的规则(引入方法)
          {
            validator: checkMobile,
            tigger: 'blur'
          }
        ]
      },
      // 控制分配角色对话框的显示与隐藏
      setRoleDialogVisible: false,
      // 用户数据
      userInfo: {},
      // 所有角色数据列表
      rolesList: [],
      // 已选中的角色 ID 值
      selectedRoleId: ''
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    async getUserList() {
      const { data: res } = await this.$http.get('users', {
        params: this.queryInfo
      });
      if (res.meta.status !== 200) {
        return this.$message.error('获取用户列表失败');
      }
      this.userList = res.data.users;
      this.total = res.data.total;
      console.log(res);
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getUserList();
    },
    // 监听页码值改变的事情
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getUserList();
    },
    // 监听 switch 开关状态的改变
    async userStateChanged(userInfo) {
      console.log(userInfo);
      const { data: res } = await this.$http.put(
        `users/${userInfo.id}/state/${userInfo.mg_state}`
      );
      if (res.meta.status !== 200) {
        userInfo.mg_state = !userInfo.mg_state;
        return this.$message.error('更新用户状态失败');
      }
      this.$message.success('更新用户成功');
    },
    // 监听添加用户对话框的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
    // 点击按钮添加新用户
    addUser() {
      this.$refs.addFormRef.validate(async valid => {
        console.log(valid);
        if (!valid) return;
        // 可以发起添加用户的网络请求
        const { data: res } = await this.$http.post('users', this.addForm);
        if (res.meta.status !== 201) {
          this.$message.err('添加用户失败!');
        }
        this.$message.success('添加用户成功!');
        // 隐藏添加用户的对话框
        this.addDialogVisible = false;
        // 重新获取用户列表
        this.getUserList();
      });
    },
    // 展示编辑用户的对话框
    async showEditDialog(id) {
      const { data: res } = await this.$http.get('users/' + id);
      if (res.meta.status !== 200) {
        return this.$message.error('查询用户失败');
      }
      this.editForm = res.data;
      console.log(res.data);
      this.editDialogVisible = true;
    },
    // 监听修改用户对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields();
    },
    // 修改用户信息并提交
    editUserInfo() {
      this.$refs.editFormRef.validate(async valid => {
        console.log(valid);
        if (!valid) return;
        // 发起修改用户信息的数据请求
        const { data: res } = await this.$http.put(
          'users/' + this.editForm.id,
          {
            email: this.editForm.email,
            mobile: this.editForm.mobile
          }
        );

        if (res.meta.status !== 200) {
          return this.$message.error('更新用户信息失败');
        }

        // 关闭对话框
        this.editDialogVisible = false;
        // 刷新数据列表
        this.getUserList();
        // 提示修改成功
        this.$message.success('更新用户信息成功');
      });
    },
    // 根据 id 删除对应的用户信息
    async removeUserById(id) {
      console.log(id);
      // 弹窗询问是否删除数据
      const confirmResult = await this.$confirm(
        '此操作将永久删除该用户, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err);

      // 如果用户确认删除，则返回值为 confirm
      // 如果用户确认取消，则返回值为 cancel
      if (confirmResult !== 'confirm') {
        return this.$message.info('已经取消删除');
      }

      const { data: res } = await this.$http.delete('users/' + id);
      if (res.meta.status !== 200) {
        return this.$message.err('删除用户失败!');
      }
      this.$message.success('删除用户成功');
      this.getUserList();
    },
    // 展示分配角色的对话框
    async setRole(userInfo) {
      this.userInfo = userInfo;
      // 在展示对话框之前，获取所有角色的列表
      const { data: res } = await this.$http.get('roles');
      if (res.meta.status !== 200) {
        return this.$message.error('获取角色列表失败');
      }
      this.rolesList = res.data;
      this.setRoleDialogVisible = true;
    },
    // 点击按钮分配角色
    async saveRoleInfo() {
      if (!this.selectedRoleId) {
        return this.$message.error('请选择分配的角色！');
      }
      const { data: res } = await this.$http.put(
        `users/${this.userInfo.id}/role`,
        {
          rid: this.selectedRoleId
        }
      );

      if (res.meta.status !== 200) {
        return this.$message.error('更新角色失败');
      }

      this.$message.success('更新角色成功');
      this.getUserList();
      this.setRoleDialogVisible = false;
    },
    // 监听分配角色对话框的关闭事件
    SetRoleDialogClosed() {
      // 关闭后要清空需要修改的用户数据
      this.selectedRoleId = '';
      this.userInfo = {};
    }
  }
};
</script>
<style lang="less" scoped></style>
