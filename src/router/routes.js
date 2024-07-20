import HomeView from '@/views/home.vue';
import LoginView from '@/views/login.vue';

export default [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      guard: 'auth',
    },
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {
      guard: 'guest',
    },
  },
];
