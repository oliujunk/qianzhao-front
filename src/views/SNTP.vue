<template>
  <div class="sntp">
    <div>
      <el-button type="primary" @click="handleSntpSync">SNTP校时</el-button>
    </div>
    <div style="margin-top: 50px;">
      <el-date-picker
        v-model="now"
        type="datetime"
        placeholder="选择日期时间"
      >
      </el-date-picker>
      <el-button type="primary" style="margin-left: 50px;" @click="handleUpdatetime">手动校时</el-button>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'Sntp',

  data() {
    return {
      now: '',
    };
  },

  methods: {
    handleUpdatetime() {
      this.$http
        .post('/datetime', { datetime: moment(this.now).format('YYYY-MM-DD HH:mm:ss') })
        .then((res) => {
          if (res.status === 200 && res.data) {
            this.$message.success('手动校时成功');
          } else {
            this.$message.error('手动校时失败');
          }
        })
        .catch();
    },
    handleSntpSync() {
      this.$http
        .get('/sntpsync')
        .then((res) => {
          if (res.status === 200 && res.data) {
            this.$message.success('SNTP校时成功');
          } else {
            this.$message.error('SNTP校时失败');
          }
        })
        .catch();
    },
  },

  mounted() {
    this.now = moment().format('YYYY-MM-DD HH:mm:ss');
  },
};
</script>

<style lang="scss" scoped>
.sntp {
  margin-top: 50px;
  margin-left: 50px;
}
</style>
