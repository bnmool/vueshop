<template>
  <el-container class="home-container">
    <!-- 头部 -->
    <el-header>
      <div>
        <img />
        <span @click="gotoHome">管理系统</span>
      </div>
      <el-button type="info" @click="logOut">退出</el-button>
    </el-header>
    <!-- 主题 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse?'64px':'200px'">
        <div class="toggle-button" @click="toggleCollasp">|||</div>
        <el-menu
          :default-active="activePath"
          :router="true"
          :unique-opened="true"
          :collapse="isCollapse"
          :collapse-transition="false"
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409BFF"
        >
          <!-- 一级菜单 -->
          <el-submenu :index="item.id+''" v-for="item in menulist" :key="item.id">
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconsObj[item.id]" class="icon-font"></i>
              <!-- 文本 -->
              <span>{{item.authName}}</span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/'+subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
              @click="saveNavState('/'+subItem.path)"
            >
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      //左侧菜单数据
      menulist: [],
      iconsObj: {
        "125": "el-icon-user",
        "103": "el-icon-box",
        "101": "el-icon-shopping-cart-1",
        "102": "el-icon-notebook-2",
        "145": "el-icon-document"
      },
      // 是否折叠
      isCollapse: false,
      // 被激活的链接地址
      activePath: ""
    };
  },
  created() {
    this.getMenuList();
    this.activePath=window.sessionStorage.getItem("activePath")
  },
  methods: {
    // 退出
    logOut() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    // 获取所有的菜单
    async getMenuList() {
      const { data: res } = await this.$http.get("menus");
      console.log(res);
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
      this.menulist = res.data;
    },
    // 点击按钮切换菜单的折叠与展开
    toggleCollasp() {
      this.isCollapse = !this.isCollapse;
    },
    // 点击回到 Home
    gotoHome() {
      this.$router.push("/home");
    },
    // 保存链接的激活状态
    saveNavState(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
      this.activePath=activePath;
    }
  }
};
</script>

<style lang="less" scoped>
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 10px;
  color: #fff;
  align-items: center;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      display: block;
      background: url(../assets/images/leimu.jpg) center no-repeat;
      background-size: 180%;
      box-shadow: 1px 1px 4px rgba(255, 255, 255, 0.9);
    }
    span {
      margin-left: 15px;
      cursor: pointer;
    }
  }
}
.el-aside {
  background-color: #333744;
  color: #fff;
  .el-menu {
    border: none;
  }
}
.el-main {
  background-color: #eaedf1;
}
.home-container {
  height: 100%;
}

.icon-font {
  margin-right: 14px;
}
.toggle-button {
  font-size: 14px;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
