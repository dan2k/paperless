<template>
  <div class="container">
    <div class="card col-12 col-md-4 mx-auto">
      <div class="card-header">
        <h5 class="card-title text-center text-primary fw-bold">อนุมัติการให้บริการ</h5>
        <hr/>
        <div class="text-center">
          <h6>กรุณา แสกน QR Code เพื่ออนุมัติการให้บริการ</h6>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          
          <div class="col-12 text-center">
            <qrcode
            :class="{ 'qr-blur': isBlur }"
            :value="url"
            :width="100"
            :height="100"
            :qrOptions="{ typeNumber: 0, mode: 'Byte', errorCorrectionLevel: 'H' }"
            :imageOptions="{ hideBackgroundDots: true, imageSize: 0.4, margin: 0 }"
            :dotsOptions="{
              type: 'square',
              color: '#000000',
            }"
            imgclass="img-qr"
            myclass="my-qur"
          />
          </div>
          
        </div>
        <div class="row text-center mt-3">
          <div class="col-12">
            <h5 class="loading-indicator" v-if="isLoading">
              <i class="fas fa-spinner fa-pulse"></i> กำลังตรวจสอบสถานะ...
            </h5>
            <h5 class="text-success" v-if="status">การอนุมัติสำเร็จ</h5>
            <!-- <h5 class="text-danger" v-if="!status">การอนุมัติถูกปฏิเสธ</h5> -->
            <button class="btn btn-primary btn-sm" v-if="status" @click="gotoCdg()">หน้าแรก</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .loading-indicator {
    font-weight: bold;
    font-size: 1rem;
    text-align: center;
  }
  .scan-confirmation {
    position: absolute;
    width: 100%;
    height: 100%;

    background-color: rgba(255, 255, 255, 0.8);

    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
  }
  .qr-blur {
  filter: blur(5px); /* ปรับระดับการเบลอตามต้องการ (เช่น 5px) */
  transition: filter 0.3s ease; /* ทำให้การเปลี่ยนแปลงการเบลอนุ่มนวล */
}


</style>
<script setup>
  import { ref, onMounted, onUnmounted,nextTick } from 'vue';
  import qrcode from "qrcode-vue3";
  import { api,  start, close } from "@/helpers";
  import { useService } from "./service.js";
  // import axios from "axios";
  const {authStore,appStore,route,gotoCdg} = useService();
  // const authStore = useAuthStore();
  const empid = authStore.userData.ses_empid;
  const url=ref(`https://www.controldata.co.th/mpsicc/paperless/client/approve/${route.params['jobid']}/${empid}`);
  const status = ref(false);
  const isChecking = ref(false);
  const isLoading = ref(false);
  const intervalId = ref(null);
  // const co=ref(0);
  const isBlur = ref(false);
  const checkStatus = async () => {
    isChecking.value = true;
    try {
      const response = await api.get(`/paperless/v1/ckapprove/${route.params['jobid']}`);
      status.value = response.data.status && response.data.data[0];
      if (status.value ) {
        // clearInterval(intervalId.value);
        // gotoCdg();
        isBlur.value = true;
        stopChecking();

      }
      // co.value++;
    } catch (error) {
      console.error('Error checking status:', error);
    } finally {
      isChecking.value = false;
    }
  };
  const startChecking = () => {
    isLoading.value = true;
    intervalId.value = setInterval(checkStatus, 10000);
    console.log('start...')
  };
  const stopChecking = () => {
    clearInterval(intervalId.value);
    isLoading.value = false;
    console.log('stop...');
  };
  
  onMounted(async () => {
    appStore.title="อนุมัติการให้บริการ";
    startChecking();

  });
  onUnmounted(() => {
    stopChecking();
  });
</script>