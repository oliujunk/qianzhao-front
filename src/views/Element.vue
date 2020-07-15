<template>
  <div class="element">
    <vxe-table
      :data="elementConfig"
      size="mini"
      border
      resizable
      auto-resize
      highlight-current-row
      highlight-hover-row
      align="center"
    >
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="Ch" title="通道号"></vxe-table-column>
      <vxe-table-column field="Name" title="名称"></vxe-table-column>
      <vxe-table-column field="Code" title="测项代码"></vxe-table-column>
      <vxe-table-column field="Min" title="最小值"></vxe-table-column>
      <vxe-table-column field="Max" title="最大值"></vxe-table-column>
      <vxe-table-column field="Prec" title="分辨率"></vxe-table-column>
      <vxe-table-column field="Unit" title="单位"></vxe-table-column>
    </vxe-table>
  </div>
</template>

<script>
export default {
  name: 'Element',

  data() {
    return {
      parameter: {},
      elementConfig: [],
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
.element {
  margin: 50px;
  max-width: 800px;
}
</style>
