<template>
  <div class="main">
      <!-- Container for centering -->
      <div class="d-flex justify-content-center align-items-center vh-100">
        <div class="col-12 col-md-5">
          <div class="card shadow">
            <div class="card-body">
              <div class="row text-center px-5">
                <h5 class="card-title text-primary fw-bold">ประเมินความพึงพอใจ</h5>
                <hr/>
                <div class="form-check px-4  my-3 text-start text-secondary fw-bold" style="font-size:18px;" v-for="s in optSatisfaction">
                  <input  class="form-check-input mx-3" :id="s.value" type="radio"   :value="s.value" v-model="satisfaction">
                  <label style="font-weight: bold;" class="form-check-label" :for="s.value">
                    {{ s.label }} 
                  </label>
                  <img class="float-end" :src="`/${s.value}.png`"/>
                </div>
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
const {route}=useService();
const close=()=>{
  window.close();
};
const optSatisfaction=[
    {label:'พอใจมาก',value:5},
    {label:'พอใจ',value:4},
    {label:'ปานกลาง',value:3},
    {label:'ไม่พอใจ',value:2},
    {label:'ไม่พอใจมาก',value:1},
  ]
const satisfaction=ref(null)
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