<template>
  <div class="reset">
    <div>
      <el-button type="primary" @click="handleReset">恢复出厂参数</el-button>
    </div>
    <div style="margin-top: 50px;">
      <el-button type="primary" @click="handleReboot">设备重启</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Reset',

  methods: {
    handleReset() {
      this.$http
        .get('/reset')
        .then((res) => {
          if (res.status === 200 && res.data) {
            this.$message.success('恢复出厂参数成功');
          } else {
            this.$message.error('恢复出厂参数失败');
          }
        })
        .catch();
    },
    handleReboot() {
      this.$http
        .get('/reboot')
        .then((res) => {
          if (res.status === 200 && res.data) {
            this.$message.success('重启成功');
          } else {
            this.$message.error('重启失败');
          }
        })
        .catch();
    },
  },

  mounted() {
  },
};
</script>

<style lang="scss" scoped>
.reset {
  margin-top: 50px;
  margin-left: 50px;
}
</style>
