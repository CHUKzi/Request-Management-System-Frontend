import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue3 from 'bootstrap-vue-3'
import ToastPlugin from 'vue-toast-notification'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import 'vue-toast-notification/dist/theme-bootstrap.css'

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
app.use(router)

app.mount('#app')