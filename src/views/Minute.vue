<template>
  <div class="minute">
    <vxe-table
      :data="file"
      size="mini"
      border
      resizable
      auto-resize
      highlight-current-row
      highlight-hover-row
      align="center"
    >
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="Name" title="文件名"></vxe-table-column>
      <vxe-table-column field="Size" title="大小(字节)"></vxe-table-column>
      <vxe-table-column title="操作">
        <template v-slot="{ row }">
          <template>
            <el-button size="mini" type="primary" @click="handleDownload(row)" icon="el-icon-download">下载</el-button>
          </template>
        </template>
      </vxe-table-column>
    </vxe-table>
  </div>
</template>

<script>
export default {
  name: 'Minute',

  data() {
    return {
      file: [],
    };
  },

  methods: {
    getFile() {
      this.$http
        .get('/file/minute')
        .then((res) => {
          this.file = res.data;
        })
        .catch();
    },
    handleDownload(row) {
      this.$http
        .get(`/file/download?name=${row.Name}`, {
          responseType: 'blob',
        })
        .then((response) => {
          const blob = new Blob([response.data], { type: 'application/octet-stream' });
          const filename = row.Name;
          if (navigator.msSaveBlob) {
            navigator.msSaveBlob(blob, filename);
          } else {
            const elink = document.createElement('a');
            elink.download = filename;
            elink.style.display = 'none';
            elink.href = URL.createObjectURL(blob);
            document.body.appendChild(elink);
            elink.click();
            URL.revokeObjectURL(elink.href);
            document.body.removeChild(elink);
          }
        })
        .catch();
    },
  },

  mounted() {
    this.getFile();
  },

};
</script>

<style lang="scss" scoped>
.minute {
  margin: 50px;
  max-width: 800px;
}
</style>
