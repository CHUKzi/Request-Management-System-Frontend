<template>
  <div class="text-sm-end">
    <button @click="CreateRequests" type="button" class="btn btn-dark">
      Create Request
    </button>
  </div>
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
          <th>Actions</th>
        </tr>
      </thead>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import DataTable from "datatables.net-vue3";
import DataTablesCore from "datatables.net-bs5";
import { BASE_URL } from "@/config.js";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

DataTable.use(DataTablesCore);

// Initial table column
const columns = [
  { data: "id", title: "Request ID" },
  { data: "created_on", title: "Created On" },
  { data: "location", title: "Location" },
  { data: "service", title: "Service" },
  { data: "status", title: "Status" },
  { data: "priority", title: "Priority" },
  { data: "department", title: "Department" },
  { data: "request_by", title: "Requested By" },
  { data: "assigned_to", title: "Assigned To" },
  {
    title: "Actions",
    orderable: false,
    searchable: false,
    render: function (data, type, row, meta) {
      return `
        <button class="btn btn-sm btn-dark edit-button" data-id="${row.id}">Edit</button>
        <button class="btn btn-sm btn-danger delete-button" data-id="${row.id}">Delete</button>
      `;
    },
  },
];

const router = useRouter();

// Fetch Requests
const requests = ref([]);
const fetchData = () => {
  const token = localStorage.getItem("token");
  axios
    .get(`${BASE_URL}/requests`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (response.data.success) {
        requests.value = response.data.data;
      }
    })
    .catch((error) => {
      console.error("Something is wrong for fetch data", error);
    });
};

// Table on button click
onMounted(() => {
  fetchData();
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    if (target && target.classList.contains('edit-button')) {
      const id = target.getAttribute('data-id');
      if (id) {
        editRequest(id);
      }
    } else if (target && target.classList.contains('delete-button')) {
      const id = target.getAttribute('data-id');
      if (id) {
        deleteRequest(id);
      }
    }
  });
});

// Delete Method
const deleteRequest = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.delete(
          `${BASE_URL}/requests/delete/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.success) {
          Swal.fire("Deleted!", response.data.message, "success");
          fetchData();
        } else {
          Swal.fire("Failed!", response.data.message, "error");
        }
      } catch (error) {
        console.error("There was an error deleting the data!", error);
        Swal.fire(
          "Error!",
          "An error occurred while deleting the request.",
          "error"
        );
      }
    }
  });
};

// Call create route
const CreateRequests = () => {
  router.push("/create");
};

// Call Edit route
const editRequest = (id) => {
  router.push(`/edit/${id}`);
};


</script>

<style scoped></style>
