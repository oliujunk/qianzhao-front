<template>
  <div class="property-setting">
    <el-form :model="parameter" size="small" label-width="150px">
      <el-form-item label="台站名称">
        <el-input v-model="property.DeviceName" placeholder="台站名称"></el-input>
      </el-form-item>
      <el-form-item label="台站代码">
        <el-input v-model="parameter.DeviceCode" placeholder="台站代码"></el-input>
      </el-form-item>
      <el-form-item label="测项代码">
        <el-input v-model="parameter.ItemCode" placeholder="测项代码"></el-input>
      </el-form-item>
      <el-form-item label="仪器序列号">
        <el-input v-model="parameter.SerialNumber" placeholder="仪器序列号"></el-input>
      </el-form-item>
      <el-form-item label="经度">
        <el-input v-model="parameter.Longitude" placeholder="经度"></el-input>
      </el-form-item>
      <el-form-item label="纬度">
        <el-input v-model="parameter.Latitude" placeholder="纬度"></el-input>
      </el-form-item>
      <el-form-item label="高程">
        <el-input v-model="parameter.Elevation" placeholder="高程"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="handlePropertyEditCancel">取消</el-button>
        <el-button type="primary" size="small" @click="handlePropertyEditOk">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'PropertySetting',

  data() {
    return {
      parameter: {},
      property: {},
    };
  },

  methods: {
    getProperty() {
      this.$http
        .get('/property')
        .then((res) => {
          this.property = res.data;
        })
        .catch();
    },
    getParameter() {
      this.$http
        .get('/parameter')
        .then((res) => {
          this.parameter = res.data;
        })
        .catch();
    },
    handlePropertyEditCancel() {
      this.$confirm('确认取消', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$message('已取消');
          this.getProperty();
          this.getParameter();
        })
        .catch((err) => console.log(err));
    },
    handlePropertyEditOk() {
      this.$confirm('确认修改', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$http
            .post('/property', this.property);
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
    this.getProperty();
    this.getParameter();
  },

};
</script>

<style lang="scss" scoped>
.property-setting {
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
