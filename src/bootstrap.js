import axios from 'axios';

import useAuthStore from '@/stores/auth.js';

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';

const authStore = useAuthStore();

await authStore.hydrate();
