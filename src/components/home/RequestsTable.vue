<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-bs5';
import { BASE_URL } from "@/config.js";

DataTable.use(DataTablesCore);

const columns = [
  { data: 'id' },
  { data: 'created_on' },
  { data: 'location' },
  { data: 'service' },
  { data: 'status' },
  { data: 'priority' },
  { data: 'department' },
  { data: 'request_by' },
  { data: 'assigned_to' },
];

const requests = ref([]);

onMounted(() => {
  fetchData();
});

const fetchData = () => {
  const token = localStorage.getItem('token');
  axios.get(`${BASE_URL}/requests`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(response => {
    if (response.data.success) {
      requests.value = response.data.data;
    }
  })
  .catch(error => {
    console.error("There was an error retrieving the data!", error);
  });
};

</script>

<template>
  <div>
    <DataTable
      :columns="columns"
      :data="requests"
      class="table table-hover table-striped"
      width="100%"
      :options="{
        responsive: true,
      }"
    >
      <thead>
        <tr>
          <th>Request ID</th>
          <th>Created On</th>
          <th>Location</th>
          <th>Service</th>
          <th>Status</th>
          <th>Priority</th>
          <th>Department</th>
          <th>Requested By</th>
          <th>Assigned To</th>
        </tr>
      </thead>
    </DataTable>
  </div>
</template>

<style scoped>
/* Add any scoped styles here */
</style>
