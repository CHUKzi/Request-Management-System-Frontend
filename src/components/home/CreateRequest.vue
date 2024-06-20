<template>
  <Header />
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">

          <div class="card-body">
            <h5 class="card-title mt-3 mb-3">
                Create Request Form
            </h5>
            <form @submit.prevent="handleSubmit">
              <div class="row">
                <div class="form-group required col-xl-6">
                  <div class="mb-3">
                    <label for="created_on" class="form-label"
                      >Created On</label
                    >
                    <input
                      type="date"
                      class="form-control"
                      id="created_on"
                      v-model="formData.created_on"
                      :class="{ 'is-invalid': errors.created_on }"
                    />
                    <span class="invalid-feedback" role="alert">
                      <strong>{{ errors.created_on }}</strong>
                    </span>
                  </div>
                </div>
                <div class="form-group required col-xl-6">
                  <div class="mb-3">
                    <label for="location" class="form-label">Location</label>
                    <input
                      type="text"
                      class="form-control"
                      id="location"
                      v-model="formData.location"
                      :class="{ 'is-invalid': errors.location }"
                    />
                    <span class="invalid-feedback" role="alert">
                      <strong>{{ errors.location }}</strong>
                    </span>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="form-group required col-xl-6">
                  <div class="mb-3">
                    <label for="service" class="form-label">Service</label>
                    <input
                      type="text"
                      class="form-control"
                      id="service"
                      v-model="formData.service"
                      :class="{ 'is-invalid': errors.service }"
                    />
                    <span class="invalid-feedback" role="alert">
                      <strong>{{ errors.service }}</strong>
                    </span>
                  </div>
                </div>
                <div class="form-group required col-xl-6">
                  <div class="mb-3">
                    <label for="status" class="form-label">Status</label>
                    <select
                      class="form-select"
                      id="status"
                      v-model="formData.status"
                      :class="{ 'is-invalid': errors.status }"
                    >
                      <option value="NEW">NEW</option>
                      <option value="IN_PROGRESS">IN PROGRESS</option>
                      <option value="COMPLETED">COMPLETED</option>
                    </select>
                    <span class="invalid-feedback" role="alert">
                      <strong>{{ errors.status }}</strong>
                    </span>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="form-group required col-xl-6">
                  <div class="mb-3">
                    <label for="priority" class="form-label">Priority</label>
                    <select
                      class="form-select"
                      id="priority"
                      v-model="formData.priority"
                      :class="{ 'is-invalid': errors.priority }"
                    >
                      <option value="LOW">LOW</option>
                      <option value="MEDIUM">MEDIUM</option>
                      <option value="HIGH">HIGH</option>
                    </select>
                    <span class="invalid-feedback" role="alert">
                      <strong>{{ errors.priority }}</strong>
                    </span>
                  </div>
                </div>

                <div class="form-group required col-xl-6">
                  <div class="mb-3">
                    <label for="department" class="form-label"
                      >Department</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      id="department"
                      v-model="formData.department"
                      :class="{ 'is-invalid': errors.department }"
                    />
                    <span class="invalid-feedback" role="alert">
                      <strong>{{ errors.department }}</strong>
                    </span>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="form-group required col-xl-6">
                  <div class="mb-3">
                    <label for="request_by" class="form-label"
                      >Request By</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      id="request_by"
                      v-model="formData.request_by"
                      :class="{ 'is-invalid': errors.request_by }"
                    />
                    <span class="invalid-feedback" role="alert">
                      <strong>{{ errors.request_by }}</strong>
                    </span>
                  </div>
                </div>

                <div class="form-group required col-xl-6">
                  <div class="mb-3">
                    <label for="assigned_to" class="form-label"
                      >Assigned To</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      id="assigned_to"
                      v-model="formData.assigned_to"
                      :class="{ 'is-invalid': errors.assigned_to }"
                    />
                    <span class="invalid-feedback" role="alert">
                      <strong>{{ errors.assigned_to }}</strong>
                    </span>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button @click="BackHome"
                  type="button"
                  class="btn btn-outline-dark"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" class="btn btn-dark">
                  Create Request
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from "../layouts/Header.vue";
import { ref } from "vue";
import axios from "axios";
import { useToast } from "vue-toast-notification";
import { useRouter } from "vue-router";
import { toastOptions } from "@/main.ts";
import { BASE_URL } from "@/config.js";

const formData = ref({
  created_on: "",
  location: "",
  service: "",
  status: "NEW",
  priority: "HIGH",
  department: "",
  request_by: "",
  assigned_to: "",
});

const errors = ref({});
const router = useRouter();
const toast = useToast(toastOptions);


// handle store request
const handleSubmit = async () => {
  try {
    errors.value = {};

    const response = await axios.post(
      `${BASE_URL}/requests/store`,
      formData.value,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.data.success) {
      toast.success(response.data.message);
      router.push('/home');
    } else {
      toast.error(response.data.message);

      if (response.data.errorMessages) {
        Object.keys(response.data.errorMessages).forEach((fieldName) => {
          errors.value[fieldName] = response.data.errorMessages[fieldName][0];
          document.getElementById(fieldName).classList.add("is-invalid");
        });
      }
    }
  } catch (error) {
    toast.error("An error occurred while creating the request.");
    console.error("Request creation error:", error);
  }
};

const BackHome = () => {
  router.push('/home');
};
</script>

<style scoped>
</style>
