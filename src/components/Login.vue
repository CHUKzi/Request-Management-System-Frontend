<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6 col-xl-5">
        <div class="card overflow-hidden">
          <div class="card-body pt-0">
            <div class="mt-5 text-center">
              <h2>Login</h2>
            </div>
            <form @submit.prevent="login">
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  type="email"
                  v-model="email"
                  :class="{ 'form-control': true, 'is-invalid': errors.email }"
                  id="email"
                />
                <span class="invalid-feedback" role="alert">
                  <strong>{{ errors.email }}</strong>
                </span>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input
                  type="password"
                  v-model="password"
                  :class="{
                    'form-control': true,
                    'is-invalid': errors.password,
                  }"
                  id="password"
                />
                <span class="invalid-feedback" role="alert">
                  <strong>{{ errors.password }}</strong>
                </span>
              </div>
              <div class="mt-2 d-grid">
                <button
                  type="submit"
                  class="btn btn-dark btn-lg waves-effect waves-light"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";
import { toastOptions } from "@/main.ts";
import { BASE_URL } from "@/config.js";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const router = useRouter();
    const toast = useToast(toastOptions);
    const errors = ref({});

    const login = async () => {
      try {
        const response = await axios.post(`${BASE_URL}/login`, {
          email: email.value,
          password: password.value,
        });

        if (response.data.success === false) {
          toast.error(response.data.message);
          errors.value = { email: null, password: null };

          if (response.data.errorMessages) {
            Object.keys(response.data.errorMessages).forEach((fieldName) => {
              errors.value[fieldName] =
                response.data.errorMessages[fieldName][0];
              document.getElementById(fieldName).classList.add("is-invalid");
            });
          }
        } else {
          localStorage.setItem("token", response.data.data.token);
          toast.success("Login successful!");
          router.push("/user");
        }
      } catch (error) {
        console.error("Login failed:", error);
      }
    };

    return {
      email,
      password,
      login,
      errors,
    };
  },
};
</script>
