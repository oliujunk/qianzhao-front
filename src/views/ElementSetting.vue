<template>
  <div class="element-setting">
    <vxe-table
      ref="elementTable"
      :data.sync="elementChannel"
      size="mini"
      auto-resize
      border
      resizable
      highlight-current-row
      highlight-hover-row
      :edit-config="{key: 'id', trigger: 'click', mode: 'cell', autoClear: true}"
      align="center"
    >
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="Ch" width="60" title="通道号"></vxe-table-column>
      <vxe-table-column field="Name" title="名称" :edit-render="{name: 'input'}" show-header-overflow show-overflow></vxe-table-column>
      <vxe-table-column field="Code" title="测项代码" :edit-render="{name: 'input'}" show-header-overflow show-overflow></vxe-table-column>
      <vxe-table-column
        field="Index"
        title="要素"
        :edit-render="{type: 'default'}"
        show-header-overflow
        show-overflow
        width="150"
      >
        <template v-slot:edit="{ row }">
          <el-select v-model="row.Index" size="mini" filterable @change="handleElementChange(row)">
            <el-option
              v-for="item in element"
              :key="item.Index"
              :label="item.Name"
              :value="item.Index"
            ></el-option>
          </el-select>
        </template>
        <template
          v-slot="{ row }"
        >{{ row.Index !== '100' ? getElementLabel(row.Index) : null }}</template>
      </vxe-table-column>
      <vxe-table-column field="Min" title="最小值" show-header-overflow show-overflow></vxe-table-column>
      <vxe-table-column field="Max" title="最大值" show-header-overflow show-overflow></vxe-table-column>
      <vxe-table-column field="Prec" title="分辨率" show-header-overflow show-overflow></vxe-table-column>
      <vxe-table-column field="Unit" title="单位" show-header-overflow show-overflow></vxe-table-column>
    </vxe-table>
    <div style="text-align: center; margin-top: 20px;">
      <el-button size="small" @click="handleElementEditCancel">取消</el-button>
      <el-button type="primary" size="small" @click="handleElementEditOk">确定</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ElementSetting',

  data() {
    return {
      parameter: {},
      elementChannel: [],
      element: [],
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
          this.elementChannel = [];
          for (let i = 0; i < 16; i += 1) {
            if (eleNum[i] !== '100') {
              this.elementChannel.push({
                Ch: `E${i + 1}`,
                Name: eleName[i],
                Code: eleCode[i],
                Index: eleNum[i],
                Min: this.element.find((item) => item.Index === eleNum[i]).Min,
                Max: this.element.find((item) => item.Index === eleNum[i]).Max,
                Prec: this.element.find((item) => item.Index === eleNum[i]).Prec,
                Unit: this.element.find((item) => item.Index === eleNum[i]).Unit,
              });
            } else {
              this.elementChannel.push({
                Ch: `E${i + 1}`,
                Index: `${eleNum[i]}`,
                Name: '-',
                Code: '-',
              });
            }
          }
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
    getElementLabel(index) {
      return this.element.find((item) => item.Index === index).Name;
    },
    handleElementChange(row) {
      const newElement = this.element.find((item) => item.Index === row.Index);
      row.Min = newElement.Min;
      row.Max = newElement.Max;
      row.Prec = newElement.Prec;
      row.Unit = newElement.Unit;
    },
    handleElementEditCancel() {
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
    handleElementEditOk() {
      this.$confirm('确认修改', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.parameter.ElementNum = '';
          this.parameter.ElementName = '';
          this.parameter.ElementCode = '';
          const newElements = this.$refs.elementTable.getData();
          for (let i = 0, len = newElements.length; i < len; i += 1) {
            this.parameter.ElementNum += `/${newElements[i].Index}`;
            this.parameter.ElementName += `/${newElements[i].Name}`;
            this.parameter.ElementCode += `/${newElements[i].Code}`;
          }
          this.parameter.ElementNum = this.parameter.ElementNum.slice(1);
          this.parameter.ElementName = this.parameter.ElementName.slice(1);
          this.parameter.ElementCode = this.parameter.ElementCode.slice(1);

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
    this.getElement();

    setTimeout(() => {
      this.getConfig();
    }, 500);
  },

};
</script>

<style lang="scss" scoped>
.element-setting {
  margin: 50px;
  max-width: 800px;
}
</style>
