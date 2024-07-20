<script setup>
defineOptions({
  name: 'spinner-component',
});
</script>

<template>
  <div class="spinner-component"></div>
</template>

<style>
.spinner-component {
  block-size: 1.5rem;
  color: currentColor;
  display: inline-block;
  inline-size: 1.5rem;
  vertical-align: bottom;
}

.spinner-component::before,
.spinner-component::after {
  border-radius: 100vmax;
  content: '';
  inline-size: 100%;
  inset-block-start: 0px;
  inset-inline-end: 0px;
  position: absolute;
}

.spinner-component::before {
  block-size: 100%;
  border: 0.24rem solid currentColor;
  opacity: 25%;
}

.spinner-component::after {
  animation-duration: 840ms;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: spinner-component;
  animation-timing-function: linear;
  block-size: 100%;
  border: 0.24rem solid transparent;
  border-block-start-color: currentColor;
}

@keyframes spinner-component {
  0% {
    rotate: z 0deg;
  }
  100% {
    rotate: z 360deg;
  }
}
</style>
