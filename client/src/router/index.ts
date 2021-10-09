import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import App from '../views/Main.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/chat/:userid?',
    name: 'Chat',
    component: App,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
