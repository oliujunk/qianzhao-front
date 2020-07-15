<template>
  <div class="headbar">
    <div class="title">系统管理</div>
    <div class="user-dropdown">
      <i class="el-icon-user-solid"></i>
      <el-dropdown split-button type="primary" trigger="click" style="margin-left: 10px;">
        {{username}}
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <el-button type="text" icon="el-icon-third-logout" @click="logout">退出</el-button>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: 'headbar',
  data() {
    return {
      username: sessionStorage.getItem('username'),
    };
  },
  methods: {
    logout() {
      sessionStorage.removeItem('username');
      this.$router.push('/login');
    },
  },
};
</script>

<style lang="scss" scoped>
.headbar {
  width: 100%;
  line-height: 60px;
  height: 60px;
  min-height: 60px;
  background-color: rgb(214, 214, 214);
  display: flex;
  justify-content: space-between;
}

.title {
  text-align: center;
  color: rgb(12, 201, 226);
  font-weight: bold;
  margin-left: 40%;
}

.user-dropdown {
  cursor: pointer;
  margin-right: 20px;
  user-select: none;
}
</style>
