<template>
  <div style="display: flex; height: 100%;">
    <NavMenu></NavMenu>
    <div style="display: flex; flex-direction: column; width: 100%;">
      <Headbar></Headbar>
      <MainContainer></MainContainer>
    </div>
  </div>
</template>

<script>
import NavMenu from './NavMenu.vue';
import Headbar from './Headbar.vue';
import MainContainer from './MainContainer.vue';

export default {
  name: 'layout',
  components: {
    NavMenu,
    Headbar,
    MainContainer,
  },
};
</script>
