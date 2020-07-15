<template>
  <div class="menu-bar-container">
    <div class="logo">
      <img src="@/assets/logo.png">
      <div>自动气象站</div>
    </div>
    <div style="height: 100%;">
      <el-menu
        :default-active="$route.path"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        unique-opened
        @open="handleOpenSubMenu"
      >
        <el-menu-item index="/data" @click="$router.push('/data')">
          <i class="el-icon-s-data"></i>
          <span>实时数据</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-user-solid"></i>
            <span>用户管理</span>
          </template>
          <el-menu-item index="/user" @click="$router.push('user')">
            <span>用户管理</span>
          </el-menu-item>
          <!-- <el-menu-item index="/useradvanced" @click="$router.push('useradvanced')">
            <span>高级设置</span>
          </el-menu-item> -->
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-info"></i>
            <span>仪器信息与状态</span>
          </template>
          <el-menu-item index="/network" @click="$router.push('/network')">
            <span>网络参数</span>
          </el-menu-item>
          <el-menu-item index="/property" @click="$router.push('/property')">
            <span>属性参数</span>
          </el-menu-item>
          <el-menu-item index="/element" @click="$router.push('/element')">
            <span>测量参数</span>
          </el-menu-item>
          <el-menu-item index="/status" @click="$router.push('/status')">
            <span>仪器状态</span>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-s-operation"></i>
            <span>仪器控制</span>
          </template>
          <el-menu-item index="/setting/network" @click="$router.push('/setting/network')">
            <span>设置网络参数</span>
          </el-menu-item>
          <el-menu-item index="/setting/property" @click="$router.push('/setting/property')">
            <span>设置属性参数</span>
          </el-menu-item>
          <el-menu-item index="/setting/element" @click="$router.push('/setting/element')">
            <span>设置通道参数</span>
          </el-menu-item>
          <el-menu-item index="/setting/sntp" @click="$router.push('/setting/sntp')">
            <span>SNTP对时</span>
          </el-menu-item>
          <el-menu-item index="/setting/reset" @click="$router.push('/setting/reset')">
            <span>仪器复位</span>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-download"></i>
            <span>数据下载</span>
          </template>
          <el-menu-item index="/download/minute" @click="$router.push('/download/minute')">
            <span>观测数据下载(分)</span>
          </el-menu-item>
          <el-menu-item index="/download/second" @click="$router.push('/download/second')">
            <span>观测数据下载(秒)</span>
          </el-menu-item>
          <el-menu-item index="/download/log" @click="$router.push('/download/log')">
            <span>日志数据下载</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navMenu',

  methods: {
    handleOpenSubMenu(index) {
      switch (index) {
        case '2':
          this.$router.push('/user');
          break;
        case '3':
          this.$router.push('/network');
          break;
        case '4':
          this.$router.push('/setting/network');
          break;
        case '5':
          this.$router.push('/download/minute');
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.menu-bar-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  .logo {
    line-height: 60px;
    text-align: center;
    height: 60px;
    background: #2d3a4b;
    cursor: pointer;
    width: 220px;
    img {
      width: 40px;
      height: 40px;
      border-radius: 0px;
      margin: 10px 10px 10px 10px;
      float: left;
    }
    div {
      font-size: 25px;
      color: rgb(255, 255, 255);
      text-align: left;
      padding-left: 20px;
    }
  }
}
.el-menu {
  height: 100%;
  border: #545c64;
}
</style>
