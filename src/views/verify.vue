<template>
  <div class="main">
      <!-- Container for centering -->
      <div class="d-flex justify-content-center align-items-center vh-100">
        <div class="col-12 col-md-5">
          <div class="card shadow">
            <div class="card-body">
              <div class="row text-center" v-if="isError">
                <div class="fa-3x text-danger">
                  <h5 class="card-title">เกิดข้อผิดผลาด</h5>
                  <hr/>
                  <span style="font-size:18px;">{{error}}</span>
                </div>
              </div>
              <div class="row text-center" v-if="loading">
                <div class="fa-3x text-info">
                  <i class="fas fa-spinner fa-pulse"></i>
                  <span style="font-size:18px;">&nbsp;กำลังตรวจสอบข้อมูลกับ ThaID</span>
                </div>
                
                <hr/>
                
              </div>
              <div class="row text-center" v-if="!loading && !isError">
                <div class="fa-3x text-success">
                  <i class="fa-solid fa-check"></i>
                  <span style="font-size:18px;">ดำเนินการตรวจสอบกับ ThaID เรียบร้อยแล้ว</span>
                </div>
                
                <hr/>
                
              </div>
              <div class="row" v-if="verify">
                <div class="col-4 text-end fw-bold">TxID:</div>
                <div class="col-8  fw-light px-2">{{$route.params['txId']}}</div>
              </div>
              <div class="row" v-if="verify">
                <div class="col-4 text-end fw-bold">สถานะ:</div>
                <div class="col-8  fw-light px-2">{{verify}}</div>
              </div>
              <div class="row" v-if="isConsent">
                <div class="col-4 text-end fw-bold">รายละเอียด:</div>
                <div class="col-8  fw-light px-2">{{consent.body}}</div>
              </div>
              <div class="row" v-if="isConsent">
                <div class="col-4 text-end fw-bold">วันเวลาขออนุมัติ:</div>
                <div class="col-8  fw-light px-2">{{consent.CreateDateFormatted}}</div>
              </div>
              <div class="row" v-if="isConsent">
                <div class="col-4 text-end fw-bold">PID ผู้อนุมัติ:</div>
                <div class="col-8  fw-light px-2">{{consent.pid}}</div>
              </div>
              <div class="row" v-if="isConsent">
                <div class="col-4 text-end fw-bold">สถานะคำขอ:</div>
                <div class="col-8  fw-light px-2">{{consent.status}}</div>
              </div>
              <div class="row" v-if="isConsent">
                <div class="col-4 text-end fw-bold">วันเวลาอนุมัติ:</div>
                <div class="col-8  fw-light px-2">{{consent.UpdatedDateFormatted}}</div>
              </div>
              <hr/>
              <div class="text-center"><button class="btn btn-danger text-center" @click="close()">ปิด</button></div>
            </div>
          </div>
        </div>
      </div>


  </div>
</template>
<style scoped>
  .main {
    font-size: 14px;
  }
</style>
<script setup>
import { onMounted, ref} from "vue";
import { api } from "@/helpers";
import { useService } from "./service";
const loading=ref(false);
const verify=ref(false);
const isVerify=ref(false);
const consent=ref(false);
const isConsent=ref(false);
const isError=ref(false);
const error=ref(null)
const {route}=useService();
const close=()=>{
  window.close();
};
onMounted(async ()=>{
  loading.value=true;
  try{
    let rs=await api.get(`/paperless/v1/consent/verify/${route.params?.txId}/${route.params?.pid}`)
    verify.value=rs.data.message;
    if(rs.data.data?.verify){
      isVerify.value=true;
      let rs2=await api.get(`paperless/v1/consent/${route.params.txId}`);
      if(!rs2.data?.data){
        isError.value=true;
        error.value=rs2.data.error;
        loading.value=false;
        return;
      }
      consent.value=rs2.data.data;
      console.log(consent.value);
      isConsent.value=true;
      loading.value=false;
      return;
    }
    isError.value=true;
    error.value=rs.data.error;
  }catch(err){
    error.value=err
    isError.value=true;
  }
  loading.value=false;
})
</script>