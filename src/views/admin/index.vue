<template>
    <div class="container-fluid ">
        <nav>
            <RouterLink to="/admin/manage-approve">จัดการผู้อนุมัติ</RouterLink>
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