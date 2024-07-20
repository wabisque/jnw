<script setup>
import SpinnerComponent from '@/components/spinner.vue';

defineOptions({
  name: 'button-component',
});

defineProps({
  disabled: Boolean,
  spinner: Boolean,
  type: {
    type: String,
    default: 'button',
  }
});
</script>

<template>
  <button
    class="button-component"
    :class="{
      'button-component--disabled': disabled,
    }"
    :disabled="disabled"
    :type="type" 
  >
    <span class="button-component__content">
      <slot></slot>
    </span>

    <spinner-component
      class="button-component__spinner"
      v-if="spinner"
    ></spinner-component>
  </button>
</template>

<style>
.button-component {
  background-color: #F9AB10;
  border: 0.08rem solid #F9AB10;
  border-radius: 0.75rem;
  color: #04383F;
  cursor: pointer;
  display: inline-block;
  font-size: 1rem;
  font-weight: 500;
  padding-block: 0.75rem;
  padding-inline: 1.5rem;
}

.button-component--disabled {
  opacity: 65%;
}

.button-component__spinner {
  margin-inline-start: 0.25rem;
}
</style>
