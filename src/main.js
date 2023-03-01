import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
import router from "@/route";
import { plugin as storePlugin } from './store'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import  "bootstrap";
// import "@/assets/js/fontawesome";
// import "@/assets/js/regular";
// import "@/assets/js/solid";
// fontawesome 6.3
import "@/assets/js/all.min";
const app=createApp(App)
app.config.devtools = true;
app.use(VueSweetalert2);

window.Swal =  app.config.globalProperties.$swal;
app.use(storePlugin)
app.use(router)
router.isReady().then(() => {
    app.mount('#app')
})
