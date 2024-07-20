import axios from 'axios';
import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';

export default defineStore(
  'auth',
  () => {
    const _token = ref(localStorage.getItem('auth.token') || null);
    const _user = ref(null);

    const token = computed(() => _token.value);
    const user = computed(() => _user.value);
    const isAuthenticated = computed(() => _token.value != null && _user.value != null);

    /**
     * @param {AbortSignal} [signal]
     */
    async function hydrate(signal) {
      try {
        const response = await axios.get(
          '/api/auth/me',
          {
            signal,
          }
        );

        _user.value = response.data.data.user;
      } catch(error) {
        if(!axios.isCancel) {
          throw error;
        }
      }
    }

    /**
     * @param {string} email
     * @param {string} password
     * @param {AbortSignal} [signal]
     */
    async function login(email, password, signal) {
      try {
        const response = await axios.post(
          '/api/auth/login',
          {
            email,
            password,
          },
          {
            signal,
          }
        );

        _token.value = response.data.data.token;
        _user.value = response.data.data.user;
      } catch(error) {
        if(!axios.isCancel(error)) {
          throw error;
        }
      }
    }

    /**
     * @param {AbortSignal} [signal]
     */
    async function logout(signal) {
      try {
        await axios.post(
          '/api/auth/logout',
          undefined,
          {
            signal,
          }
        );

        _token.value = null;
        _user.value = null;
      } catch(error) {
        if(!axios.isCancel(error)) {
          throw error;
        }
      }
    }

    watch(
      _token,
      value => localStorage.setItem('auth.token', value || null)
    );

    axios.interceptors.request.use(
      config => {
        if(!!_token.value) {
          config.headers.Authorization = `Bearer ${_token.value}`;
        }

        return config;
      }
    );

    axios.interceptors.response.use(
      undefined,
      error => {
        if(error.response?.status == 401) {
          _token.value = null;
          _user.value = null;
        }
      }
    );

    return {
      hydrate,
      isAuthenticated,
      login,
      logout,
      token,
      user,
    };
  },
);
