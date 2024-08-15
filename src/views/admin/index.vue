<template>
    <div class="container-fluid ">
        <nav>
            <RouterLink to="/admin/manage-approve"><i class="fa-solid fa-gear"></i> จัดการผู้อนุมัติ</RouterLink>
        </nav>
        <hr/>
        <router-view ></router-view>
    </div>
</template>
<script setup>
import { useAdmin } from "./admin"
import { onMounted } from "vue";
const {appStore}=useAdmin();
onMounted(()=>{
    appStore.title="จัดการระบบ"
});
</script>