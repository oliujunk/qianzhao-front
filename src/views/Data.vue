<template>
  <div>
    <div class="title">
      <el-tag>更新时间：{{ moment(currentData.Timestamp * 1000).format('YYYY-MM-DD HH:mm:ss') }}</el-tag>
    </div>
    <div class="element-container">
      <el-card
        class="element-card"
        v-for="(item, index) in elementConfig"
        :key="index"
        :body-style="cardStyle()"
      >
        <div style="width: 60%; text-align: center; color: white;">
          <span class="element-name">{{ item.Name }}</span>
          <div v-if="currentData[item.Ch] !== 32767" class="element-data">
            {{ accMul(currentData[item.Ch], parseFloat(item.Prec)) + ' ' + item.Unit }}
          </div>
          <div v-else class="element-data">
            {{ '------' + ' ' + item.Unit }}
          </div>
        </div>
        <div style="width: 40%; text-align: center; color: white; font-size: 14px;">
          <div>最大值：{{item.Max}}</div>
          <div>最小值：{{item.Min}}</div>
          <div>测项代码：{{item.Code}}</div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'Data',

  data() {
    return {
      moment,
      parameter: {},
      element: [],
      currentData: {},
      elementConfig: [],
      cardStyle: () => {
        const background = `hsl(${((Math.random() * 1000) % 270) + 90}, ${((Math.random() * 1000) % 40) + 60}%, ${((Math.random() * 1000) % 40) + 20}%`;
        return {
          display: 'flex',
          width: '100%',
          'padding-top': '20px',
          background,
        };
      },
      accMul: (arg1, arg2) => {
        let m = 0;
        if ((arg1 || arg1 === 0) && (arg2 || arg2 === 0)) {
          const s1 = arg1.toString();
          const s2 = arg2.toString();
          try {
            if (s1.split('.').length > 1) {
              m += s1.split('.')[1].length;
            }
          } catch (e) {
            console.log(e);
          }
          try {
            if (s2.split('.').length > 1) {
              m += s2.split('.')[1].length;
            }
          } catch (e) {
            console.log(e);
          }
          return (
            (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / (10 ** m)
          );
        }
        return null;
      },
      readTimer: null,
    };
  },

  methods: {
    getConfig() {
      this.$http
        .get('/parameter')
        .then((res) => {
          this.parameter = res.data;
          const eleNum = this.parameter.ElementNum.split('/');
          const eleName = this.parameter.ElementName.split('/');
          const eleCode = this.parameter.ElementCode.split('/');
          const elementConfig = [];
          for (let i = 0; i < 16; i += 1) {
            if (eleNum[i] === '100') continue;
            const detail = this.getDetail(eleNum[i]);
            if (eleName[i] !== '-') {
              detail.Name = eleName[i];
            }
            detail.Ch = `E${i + 1}`;
            detail.Code = eleCode[i];
            elementConfig.push(detail);
          }
          this.elementConfig = elementConfig;
        })
        .catch();
    },
    getElement() {
      this.$http
        .get('/element')
        .then((res) => {
          this.element = res.data;
        })
        .catch();
    },
    getDetail(elementNum) {
      const detail = this.element.find((item) => item.Index === elementNum);
      return JSON.parse(JSON.stringify(detail));
    },
    getCurrentData() {
      this.$http
        .get('/data')
        .then((res) => {
          this.currentData = res.data;
        })
        .catch();
    },
  },

  mounted() {
    this.getElement();

    setTimeout(() => {
      this.getConfig();
      this.getCurrentData();
    }, 500);

    this.readTimer = setInterval(() => {
      this.getCurrentData();
    }, 10000);
  },

  beforeDestroy() {
    clearInterval(this.readTimer);
  },
};
</script>

<style lang="scss" scoped>
.title {
  text-align: left;
  margin: 20px;
  display: flex;
  flex-wrap: wrap;
}
.element-container {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
.element-card {
  width: 360px;
  height: 100px;
  margin: 10px;
  display: flex;
}

.element-name {
  font-size: 20px;
}

.element-data {
  margin-top: 15px;
  font-size: 18px;
}
</style>
