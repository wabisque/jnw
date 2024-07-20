<script setup>
</script>

<template>
  <router-view #default="{ Component }">
    <keep-alive>
      <component
        class="app__view"
        :is="Component"
      ></component>
    </keep-alive>
  </router-view>
</template>

<style>
.app {
  min-block-size: 100dvh;
  inline-size: 100%;
}

.app__view {
  background-color: #FCFCFD;
}
</style>
