<template>
  <v-app-bar app fixed color="primary">
    <v-app-bar-nav-icon @click.stop="$emit('hide', !show)"></v-app-bar-nav-icon>
    <v-toolbar-title>Dashboard</v-toolbar-title>
  </v-app-bar>
</template>

<script>
export default {
  name: 'Toolbar',
  props: {
    show: Boolean,
  },
  model: {
    prop: 'show',
    event: 'hide',
  },
};
</script>

<style></style>
