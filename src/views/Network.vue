<template>
  <div class="network">
    <el-form :model="parameter" size="small">
      <el-form-item label="IP地址" label-width="150px">
        <el-tag>{{parameter.IP}}</el-tag>
      </el-form-item>
      <el-form-item label="子网掩码" label-width="150px">
        <el-tag>{{parameter.Mask}}</el-tag>
      </el-form-item>
      <el-form-item label="网关" label-width="150px">
        <el-tag>{{parameter.Gateway}}</el-tag>
      </el-form-item>
      <el-form-item label="HTTP端口" label-width="150px">
        <el-tag>{{parameter.HTTPPort}}</el-tag>
      </el-form-item>
      <!-- <el-form-item label="FTP端口" label-width="150px">
        <el-tag>{{parameter.FTPPort}}</el-tag>
      </el-form-item> -->
      <el-form-item label="指令端口" label-width="150px">
        <el-tag>{{parameter.CommandPort}}</el-tag>
      </el-form-item>
      <el-form-item label="管理端IP地址" label-width="150px">
        <el-tag>{{parameter.ManagementIP}}</el-tag>
      </el-form-item>
      <el-form-item label="管理端端口" label-width="150px">
        <el-tag>{{parameter.ManagementPort}}</el-tag>
      </el-form-item>
      <el-form-item label="SNTP服务器IP地址" label-width="150px">
        <el-tag>{{parameter.SntpIP}}</el-tag>
      </el-form-item>
      <el-form-item label="指令数据输出" label-width="150px">
        <el-tag>秒采样</el-tag>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Network',

  data() {
    return {
      parameter: {},
    };
  },

  methods: {
    getConfig() {
      this.$http
        .get('/parameter')
        .then((res) => {
          this.parameter = res.data;
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
.network {
  display: flex;
  justify-content: center;
  width: 80%;
  margin-top: 50px;
}

.el-tag {
  width: 150px;
}
</style>
