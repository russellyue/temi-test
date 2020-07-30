<template>
  <ScrollComponent :distance="20" :delay="100" :scrollReq="getUsers"/>
</template>

<script>
import ScrollComponent from '@/components/ScrollComponent.vue';
import axios from 'axios';

export default {
  components: {
    ScrollComponent,
  },
  methods: {
    async getUsers() {
      const { data: { users } } = await axios.get('/users');
      return users;
    },
  },
  created() {
  },
};
</script>

<style scoped>
.list-container {
  height: 500px;
  background: #AAAA;
  overflow: auto;
  margin: auto;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
