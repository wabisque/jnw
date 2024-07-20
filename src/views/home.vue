<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import ButtonComponent from '@/components/button.vue';
import useAuthStore from '@/stores/auth.js';

defineOptions({
  name: 'home-view',
});

const router = useRouter();

const authStore = useAuthStore();

const abortLogoutController = ref(null);

function abortLogout() {
  abortLogoutController.value?.abort();
  abortLogoutController.value = null;
}

async function logout() {
  if(abortLogoutController.value == null) {
    abortLogoutController.value = new AbortController();

    try {
      await authStore.logout(abortLogoutController.value.signal);

      router.push({
        name: 'login',
      });
    } catch {} finally {
      abortLogout();
    }
  }
}
</script>

<template>
  <div class="home-view">
    <div class="home-view__card home-view__card--logout">
      <div class="home-view__card__title">Logout</div>

      <button-component
        class="home-view__card__action"
        :disabled="abortLogoutController != null"
        :spinner="abortLogoutController != null"
        @click="logout();"
      >Logout</button-component>
    </div>
  </div>
</template>

<style>
.home-view {
  inline-size: 100%;
  min-block-size: 100dvh;
  padding-block: 2.5rem;
}

.home-view__card {
  background-color: #ffffff;
  border: 0.08rem solid #E5E8F0;
  border-radius: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  inline-size: 60rem;
  margin-inline: auto;
  max-inline-size: 100%;
  padding-block: 2.5rem;
  padding-inline: 1.5rem;
}

.home-view__card--logout {
  align-items: start;
}

.home-view__card__title {
  color: #292727;
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
