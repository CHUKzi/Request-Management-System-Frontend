import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import HomeView from '../views/HomeView.vue';
import CreateView from '../views/CreateView.vue';
import axios from 'axios';
import { BASE_URL } from "@/config.js";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }
    },
    {
      path: '/create',
      name: 'create',
      component: CreateView,
      meta: { requiresAuth: true }
    }
  ]
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    try {
      const response = await axios.get(`${BASE_URL}/check-auth`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.data.success) {
        next();
      } else {
        next({ name: 'login' });
      }
    } catch (error) {
      console.error('Authentication check failed:', error);
      next({ name: 'login' });
    }
  } else {
    next();
  }
});

export default router;