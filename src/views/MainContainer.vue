<template>
  <div class="main-container">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'mainContainer',
};
</script>

<style lang="scss" scoped>
.main-container {
  height: 100%;
  width: 100%;
  overflow-y: auto;
  overflow-x: auto;
}
</style>
