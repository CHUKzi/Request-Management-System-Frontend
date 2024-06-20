<template>
  <header class="p-3 bg-dark text-white">
    <div class="container">
      <div class="d-flex align-items-center">
        <div class="flex-grow-1">Request Management System</div>
        <div class="flex-shrink-0">
          Hi, {{ userName }}
          <button @click="logout" type="button" class="btn btn-danger">Log Out</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from 'vue';
import { BASE_URL } from "@/config.js";
import { toastOptions } from "@/main.ts";
import { useToast } from "vue-toast-notification";
import router from '@/router';

const userName = localStorage.getItem('userName');
const token = localStorage.getItem('token');
const toast = useToast(toastOptions);

// handle logout request
const logout = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/logout`, null, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (response.data.success === false) {
      toast.error(response.data.message);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
      router.push("/");

      toast.success(response.data.message);
      console.log('Logged out successfully');
    }
  } catch (error) {
    console.error('Logout failed:', error);
  }
};
</script>

