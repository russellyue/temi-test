<template>
  <div class="home">
    <div class="center">
      <router-link to="/list">I'm the list</router-link>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
};
</script>

<style scoped>
  .center {
    height: 100px;
    width: 150px;
    position: absolute;
    top:0;
    right:0;
    bottom: 0;
    left: 0;
    margin: auto;
    font-size: 30px;
  }
</style>
