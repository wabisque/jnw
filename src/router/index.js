import { createRouter, createWebHistory } from 'vue-router';
import routes from '@/router/routes.js';
import guard from '@/router/guard.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

guard(router);

export default router;
