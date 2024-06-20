// import necessary modules and components
import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import HomeView from '../views/HomeView.vue';
import CreateView from '../views/CreateView.vue';
import EditView from '../views/EditView.vue';
import axios from 'axios';
import { BASE_URL } from "@/config.js";

// create router instance
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
      meta: 
      { 
        title: 'Login'
      }
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: 
      { requiresAuth: true,
        title: 'Home'
      }
    },
    {
      path: '/create',
      name: 'create',
      component: CreateView,
      meta: { 
        requiresAuth: true,
        title: 'Create Request'
      }
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: EditView,
      meta: { 
        requiresAuth: true,
        title: 'Edit Request'
       }
    },
  ]
});

// Handle authenticated routes
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

// Update title
router.afterEach((to) => {
  const defaultTitle = "Request Management System";
  const routeTitle = to.meta.title ? `${to.meta.title} | ${defaultTitle}` : defaultTitle;
  document.title = routeTitle;
});

export default router;
