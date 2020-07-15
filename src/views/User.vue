<template>
  <div class="user">
    <el-form :model="userInfo" size="small" label-width="150px">
      <el-form-item label="用户名">
        <el-tag>{{ userInfo.username }}</el-tag>
      </el-form-item>
      <el-form-item label="旧密码">
        <el-input v-model="userInfo.oldPassword" placeholder="旧密码" show-password></el-input>
      </el-form-item>
      <el-form-item label="新密码">
        <el-input v-model="userInfo.newPassword" placeholder="新密码" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="handleReset">重置</el-button>
        <el-button type="primary" size="small" @click="handleChange">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'User',

  data() {
    return {
      userInfo: {
        username: sessionStorage.getItem('username'),
        oldPassword: '',
        newPassword: '',
      },
    };
  },

  methods: {
    handleReset() {
      this.userInfo.oldPassword = '';
      this.userInfo.newPassword = '';
    },

    handleChange() {
      this.$confirm('确认修改', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          if (this.userInfo.oldPassword === '' || this.userInfo.newPassword.length !== 8 || this.userInfo.oldPassword === this.userInfo.newPassword) {
            this.$message.error('参数错误');
          } else {
            this.$http
              .post('/user', this.userInfo)
              .then((response) => {
                if (response.status === 200 && response.data) {
                  this.$message.success('修改成功');
                  sessionStorage.removeItem('username');
                  this.$router.push('/login');
                } else {
                  this.$message.error('修改失败');
                }
              })
              .catch((err) => {
                console.log(err);
                this.$message.error('修改失败');
              });
          }
        })
        .catch((err) => console.log(err));
    },
  },

  mounted() {
  },
};
</script>

<style lang="scss" scoped>
.user {
  display: flex;
  justify-content: center;
  width: 80%;
  margin-top: 50px;
}
</style>
