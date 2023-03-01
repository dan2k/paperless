<template>
  <div id="pagenotfound" class="col-8 mx-auto my-5">
    <div class="alert alert-danger text-center">
      <h2>กรุณาเข้าสู่ระบบ</h2>
      <a v-if="mode!=='development'" type="button" class="btn btn-outline-primary" @click="goto()"><i class="fas fa-user"></i> เข้าสู่ระบบ</a>
      <a v-if="mode=='development'" type="button" class="btn btn-outline-primary" @click="setLogin()"><i class="fas fa-user"></i> เข้าสู่ระบบ</a>
    </div>
  </div>
</template>
<script setup>
import { useAuthStore,useAppStore } from "../store";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
const store = useAuthStore();
const store2=useAppStore();

const router = useRouter();
const mode=import.meta.env.MODE //development
onMounted(async () => {
  store2.title="เข้าสู่ระบบ"
  if (store.isLogin) {
    await store.checkLogin();
    if(store.isLogin){  
        router.replace({ path: "/" });
        return;
    }
  }
  store.$reset();
});
const goto = () => {
  window.location = "/mpsicc?home=movement&url=" + import.meta.env.VITE_PRIVATE_BASE_URL;
};
const setLogin = () => {
  store2.toggle=false;
  // alert(store2.toggle);
  store.setLogin();
};
</script>
<style scoped></style>
