<template>
  <div class="icon-wrapper">
    <v-icon class="icon" :name="name" :scale="scale" />
    <slot></slot>
  </div>
</template>

<script>
import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { FaRegularHeart, FaHeart } from 'oh-vue-icons/icons';

addIcons(FaRegularHeart, FaHeart);

export default {
  props: {
    //See additional props: https://oh-vue-icons.netlify.app/docs/#props
    name: String,
    scale: Number,
  },
  components: {
    'v-icon': OhVueIcon,
  },
};
</script>

<style lang="scss">
.icon-wrapper {
  display: inline-flex;
  align-items: center;
  /* color: #2f2f2f; */
  font-size: 1rem;
  font-weight: 600;
}
.icon {
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}
</style>
