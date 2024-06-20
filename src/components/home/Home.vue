<template>
  <Header />
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <RequestsTable />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Header from "../layouts/Header.vue";
import RequestsTable from "../home/RequestsTable.vue";
</script>
