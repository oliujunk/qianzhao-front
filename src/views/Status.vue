<template>
  <div class="status">
    <el-form :model="status" size="small">
      <el-form-item label="电源" label-width="150px">
        <el-tag>12V</el-tag>
      </el-form-item>
      <el-form-item label="存储" label-width="150px">
        <el-tag>正常</el-tag>
      </el-form-item>
      <el-form-item label="标定" label-width="150px">
        <el-tag>不可标定</el-tag>
      </el-form-item>
      <el-form-item label="调试" label-width="150px">
        <el-tag>不可调零</el-tag>
      </el-form-item>
      <el-form-item label="软件匹配" label-width="150px">
        <el-tag>是</el-tag>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Status',

  data() {
    return {
      status: {},
    };
  },

  methods: {
    getConfig() {
      this.$http
        .get('/status')
        .then((res) => {
          this.status = res.data;
        })
        .catch();
    },
  },

  mounted() {
    this.getConfig();
  },

};
</script>

<style lang="scss" scoped>
.status {
  display: flex;
  justify-content: center;
  width: 80%;
  margin-top: 50px;
}

.el-tag {
  width: 150px;
}
</style>
