<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

import ButtonComponent from '@/components/button.vue';
import TextFieldComponent from '@/components/text-field.vue';
import useAuthStore from '@/stores/auth.js';

defineOptions({
  name: 'login-view',
});

const router = useRouter();

const authStore = useAuthStore();

const abortController = ref(null);
const form = reactive({
  email: '',
  password: '',
});

function abort() {
  abortController.value?.abort();
  abortController.value = null;
}

async function engage() {
  if(abortController.value == null) {
    abortController.value = new AbortController();

    try {
      await authStore.login(form.email, form.password, abortController.value.signal);
      
      router.push({
        name: 'home',
      });
    } catch {} finally {
      abort();
    }
  }
}
</script>

<template>
  <div class="login-view">
    <form
      class="login-view__card"
      :disabled="abortController != null"
      @submit.prevent="engage();"
    >
      <div class="login-view__card__title">Login</div>

      <text-field-component
        class="login-view__card__field"
        :disabled="abortController != null"
        icon="envelope"
        placeholder="jon@mail.io"
        v-model="form.email"
      >
        <template #label>Email Address</template>
      </text-field-component>

      <text-field-component
        class="login-view__card__field"
        :disabled="abortController != null"
        icon="lock"
        placeholder="Enter Password"
        type="password"
        v-model="form.password"
      >
        <template #label>Password</template>
      </text-field-component>

      <button-component
        class="login-view__card__submit"
        :disabled="abortController != null"
        :spinner="abortController != null"
        type="submit"
      >Sign In</button-component>
    </form>
  </div>
</template>

<style>
.login-view {
  align-items: center;
  display: flex;
  flex-direction: column;
  inline-size: 100%;
  justify-content: center;
  min-block-size: 100dvh;
  padding: 1.5rem;
}

.login-view__card {
  background-color: #ffffff;
  border: 0.08rem solid #E5E8F0;
  border-radius: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  inline-size: 25rem;
  max-inline-size: 100%;
  padding-block: 2.5rem;
  padding-inline: 1.5rem;
}

.login-view__card__title {
  color: #292727;
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
