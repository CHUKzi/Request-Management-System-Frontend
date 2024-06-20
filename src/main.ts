import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue3 from 'bootstrap-vue-3'
import ToastPlugin from 'vue-toast-notification'
import DataTable from 'datatables.net-vue3';
/* import { DataTables } from 'vue-datatables'; */

// Import DataTables CSS

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css'
import 'vue-toast-notification/dist/theme-bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import VueGoodTablePlugin from 'vue-good-table';

// import the styles
import 'vue-good-table/dist/vue-good-table.css'



// Toast options
export const toastOptions = {
    position: 'top-right',
    duration: 5000,
    dismissible: true, 
    pauseOnHover: true, 
    draggable: true, 
    maxToasts: 5,
    queue: false, 
}

const app = createApp(App)

app.use(BootstrapVue3)
app.use(ToastPlugin, toastOptions)
app.use(DataTable)
app.use(router)

app.mount('#app')