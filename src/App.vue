<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$http.defaults.baseURL = `http://${window.location.hostname}:90/api`;
  },
};
</script>

<style lang="scss">
html, body, #app {
  margin: 0;
  height: 100%;
  overflow-y: hidden;
}
</style>
