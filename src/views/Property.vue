<template>
  <div class="property">
    <el-form :model="property" size="small">
      <el-form-item label="台站名" label-width="150px">
        <el-tag>{{property.DeviceName}}</el-tag>
      </el-form-item>
      <el-form-item label="台站代码" label-width="150px">
        <el-tag>{{parameter.DeviceCode}}</el-tag>
      </el-form-item>
      <el-form-item label="测项代码" label-width="150px">
        <el-tag>{{parameter.ItemCode}}</el-tag>
      </el-form-item>
      <el-form-item label="序列号" label-width="150px">
        <el-tag>{{parameter.SerialNumber}}</el-tag>
      </el-form-item>
      <el-form-item label="经度" label-width="150px">
        <el-tag>{{parameter.Longitude}}</el-tag>
      </el-form-item>
      <el-form-item label="纬度" label-width="150px">
        <el-tag>{{parameter.Latitude}}</el-tag>
      </el-form-item>
      <el-form-item label="高程" label-width="150px">
        <el-tag>{{parameter.Elevation}}</el-tag>
      </el-form-item>
      <el-form-item label="软件版本" label-width="150px">
        <el-tag>{{property.SoftwareVersion}}</el-tag>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Property',

  data() {
    return {
      parameter: {},
      property: {},
    };
  },

  methods: {
    getParameter() {
      this.$http
        .get('/parameter')
        .then((res) => {
          this.parameter = res.data;
        })
        .catch();
    },
    getProperty() {
      this.$http
        .get('/property')
        .then((res) => {
          this.property = res.data;
        })
        .catch();
    },
  },

  mounted() {
    this.getParameter();
    this.getProperty();
  },

};
</script>

<style lang="scss" scoped>
.property {
  display: flex;
  justify-content: center;
  width: 80%;
  margin-top: 50px;
}

.el-tag {
  width: 150px;
}
</style>
