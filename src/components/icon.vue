<script setup>
import { computed } from 'vue';
import iconset from '@/assets/iconset.json';

defineOptions({
  name: 'icon-component',
});

const props = defineProps({
  type: {
    type: String,
    required: true,
  }
});

const definition = computed(() => iconset[props.type]);
</script>

<template>
  <svg
    class="icon-component"
    fill="none"
    height="24"
    viewBox="0 0 24 24"
    width="24"
  >
    <path
      class="icon-component__path"
      :d="definition"
      fill="currentColor"
    ></path>
  </svg>
</template>

<style>
.icon-component {
  block-size: 1.5em;
  display: inline-block;
  inline-size: 1.5em;
  vertical-align: bottom;
}
</style>
