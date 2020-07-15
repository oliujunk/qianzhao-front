<template>
  <div class="network-setting">
    <el-form :model="parameter" size="small" label-width="150px">
      <el-form-item label="IP地址">
        <el-input v-model="parameter.IP" placeholder="IP地址"></el-input>
      </el-form-item>
      <el-form-item label="子网掩码">
        <el-input v-model="parameter.Mask" placeholder="子网掩码"></el-input>
      </el-form-item>
      <el-form-item label="网关">
        <el-input v-model="parameter.Gateway" placeholder="网关"></el-input>
      </el-form-item>
      <el-form-item label="HTTP端口">
        <el-input-number v-model="parameter.HTTPPort" placeholder="HTTP端口" controls-position="right" :min="1" :max="65535"></el-input-number>
      </el-form-item>
      <!-- <el-form-item label="FTP端口">
        <el-input-number v-model="parameter.FTPPort" placeholder="FTP端口" controls-position="right" :min="1" :max="65535"></el-input-number>
      </el-form-item> -->
      <el-form-item label="指令端口">
        <el-input-number v-model="parameter.CommandPort" placeholder="指令端口" controls-position="right" :min="1" :max="65535"></el-input-number>
      </el-form-item>
      <el-form-item label="管理端IP地址">
        <el-input v-model="parameter.ManagementIP" placeholder="管理端IP地址"></el-input>
      </el-form-item>
      <el-form-item label="管理端端口">
        <el-input-number v-model="parameter.ManagementPort" placeholder="管理端端口" controls-position="right" :min="1" :max="65535"></el-input-number>
      </el-form-item>
      <el-form-item label="SNTP服务器IP地址">
        <el-input v-model="parameter.SntpIP" placeholder="SNTP服务器IP地址"></el-input>
      </el-form-item>
      <el-form-item label="指令数据输出">
        <el-radio-group v-model="parameter.Sample" disabled size="mini">
          <el-radio-button :label="1">分采样</el-radio-button>
          <el-radio-button :label="2">秒采样</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="handleNetworkEditCancel">取消</el-button>
        <el-button type="primary" size="small" @click="handleNetworkEditOk">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'NetworkSetting',

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
    handleNetworkEditCancel() {
      this.$confirm('确认取消', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$message('已取消');
          this.getConfig();
        })
        .catch((err) => console.log(err));
    },
    handleNetworkEditOk() {
      this.$confirm('确认修改', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$http
            .post('/parameter', this.parameter)
            .then((response) => {
              if (response.status === 200 && response.data) {
                this.$message.success('修改成功');
              } else {
                this.$message.error('修改失败');
              }
            })
            .catch((err) => {
              console.log(err);
              this.$message.error('修改失败');
            });
        })
        .catch((err) => console.log(err));
    },
  },

  mounted() {
    this.getConfig();
  },

};
</script>

<style lang="scss" scoped>
.network-setting {
  display: flex;
  justify-content: center;
  width: 80%;
  margin-top: 50px;
}

.el-input {
  width: 200px;
}
.el-input-number {
  width: 200px;
}
</style>
