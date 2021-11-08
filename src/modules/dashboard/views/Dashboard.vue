<template>
  <Layout>
    <router-view />
  </Layout>
</template>

<script>
import Layout from '../components/Layout.vue';

export default {
  name: 'Dashboard',
  components: {
    Layout,
  },
};
</script>

<style></style>
