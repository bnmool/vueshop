<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像 -->
      <div class="avater_box">
        <img src="../assets/logo.png" />
      </div>

      <!-- 登录表单 -->
      <el-form
        ref="loginFormRef"
        class="login_form"
        label-width="60px"
        :model="loginForm"
        :rules="loginFromRules"
        :label-position="labelPosition"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            ref="loginFocus"
            placeholder="用户名"
            v-model="loginForm.username"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>

        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            placeholder="密码"
            v-model="loginForm.password"
            prefix-icon="el-icon-search"
            type="password"
          ></el-input>
        </el-form-item>

        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button @click="resetLoginForm" type="info">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 登录文字对齐方式
      labelPosition: "left",
      // 登录表单的数据绑定对象
      loginForm: {
        username: "admin",
        password: "123456"
      },
      // 表单验证规则对象
      loginFromRules: {
        // 验证用户名是否合法
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur"
          }
        ],
        // 验证密码是否合法
        password: [
          {
            required: true,
            message: "请输入登录密码",
            trigger: "blur"
          },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    // 重置表单内容
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return;
        const { data: res } = await this.$http.post("login", this.loginForm);
        if (res.meta.status !== 200) return this.$message.error("登录失败");
        this.$message.success("登陆成功");
        window.sessionStorage.setItem("token",res.data.token);
        this.$router.push('/home');
      });
    }
  },

  // 当页面数据加载完毕执行 focus 焦点获取
  mounted() {
    this.$nextTick(() => {
      this.$refs.loginFocus.focus();
    });
  }
};

</script>

<style lang="less" scoped>
.login_container {
  background-color: #ccc;
  height: 100%;
  position: relative;
}
.login_box {
  width: 450px;
  height: 300px;
  background: #fff;
  border-radius: 4px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  // 头像框
  .avater_box {
    height: 100px;
    width: 100px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    img {
      width: 100%;
      height: 100%;
      display: block;
      border-radius: 50%;
    }
  }
  // 登录密码框
  .login_form {
    position: absolute;
    bottom: 0;
    width: 90%;
    padding: 0 2%;
    box-sizing: border-box;
    .btns {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
