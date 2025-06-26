<template>
  <div class="main">
      <!-- Container for centering -->
      <div class="d-flex justify-content-center align-items-center vh-100">
        <div class="col-12 col-md-5">
          <div class="card shadow">
            <div class="card-body">
              <div class="row text-center px-5" v-if="isSatify">
                <h5 class="card-title text-primary fw-bold">ประเมินความพึงพอใจ</h5>
                <hr/>
                <div class="form-check px-4  my-3 text-start text-secondary fw-bold" style="font-size:18px;" v-for="s in optSatisfaction">
                  <input  class="form-check-input mx-3" :id="s.value" type="radio"   :value="s.value" v-model="satisfaction">
                  <label style="font-weight: bold;" class="form-check-label" :for="s.value">
                    {{ s.label }} 
                  </label>
                  <img class="float-end" :src="`${s.value}.png`" />
                  <!-- <img class="float-end" src="/1.png"   /> -->
                </div>
              </div>
              <div class="row text-center text-info" v-if="loading">
                <div class="fa-3x ">
                  <h5>
                    <i class="fas fa-spinner fa-pulse"></i>
                    <span style="font-size:18px;">&nbsp;กำลังดำเนินการ</span>
                  </h5> 
                </div>
                <hr/>
                <div><h5 v-html="error"></h5></div>
              </div>
              <div class="row text-center" v-if="isError">
                <div class="text-danger">
                  
                  <h5 class="card-title"><i class="fa-regular fa-circle-xmark"></i> เกิดข้อผิดผลาด</h5>
                  <hr/>
                  <span style="font-size:18px;">{{error}}</span>
                </div>
              </div>
              <div class="row text-center" v-if="success && !loading">
                <div class="text-success">
                  
                  <h5 class="card-title"><i class="fa-regular fa-circle-check"></i> ดำเนินการเรียบร้อยแล้ว</h5>
                  <hr/>
                  <span style="font-size:18px;" v-html="error"></span>
                </div>
              </div>
              <hr/>
              <div class="text-center">
                <button v-if="isSatify" class="btn btn-primary text-center mx-2" @click="approve()">บันทึก</button>
                <button v-if="1!=1" class="btn btn-danger text-center" @click="close()">ปิด</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- {{data}} -->
      


  </div>
</template>
<style scoped>
  .main {
    font-size: 14px;
  }
</style>
<script setup>
import { onMounted, ref} from "vue";
import { api,errAlert } from "@/helpers";
import { useService } from "./service";
const {route,router,gotoImauth2}=useService();
const close=()=>{
  window.close();
};

// let empid='3459';
// let jobid='RG066704783';
const optSatisfaction=[
    {label:'พอใจมาก',value:5},
    {label:'พอใจ',value:4},
    {label:'ปานกลาง',value:3},
    {label:'ไม่พอใจ',value:2},
    {label:'ไม่พอใจมาก',value:1},
  ]
const satisfaction=ref(null)
const isSatify=ref(true);
const isAuth=ref(false)
const loading=ref(false);
const interval=ref(null);
const error=ref(null);
const consent=ref(null);
const isError=ref(false);
const success=ref(false);
const data=ref(null)
const approve=()=>{
  if(!satisfaction.value){
    errAlert("กรุณาเลือกความพึงพอใจ");
    return;
  }
  let uri = window.location.href;
  
  // gotoImauth2(route.params.jobid, satisfaction, uri);
  // gotoImauth2(jobid, satisfaction.value, uri,empid);
  gotoImauth2(route.params.jobid, satisfaction.value, uri,route.params.empid);
}
onMounted(async ()=>{
  if (route.query.error) {
    isSatify.value=false;
    if (route.query.error == "false") {
        isAuth.value=true;
        loading.value=true;
        try{
          error.value=`<i class="fa-brands fa-creative-commons-remix"></i> กำลังทำการสร้าง consent`;
          let rs2=await api.post(`paperless/v1/consent/${route.query.pid}/${jobid}/${empid}`,{timeout: 1000*60*3});
          if(!rs2.data.data){
            error.value=`เกิดความผิดพลาดในการส่ง consent ${rs2.data.message}`
            isError.value=true;
          }else{
            consent.value=rs2;
          }
        }catch(err){
          isError.value=true;
          if (err?.code=='ECONNABORTED' || err?.code=='ERR_BAD_RESPONSE') {
            console.log('Request canceled', err.message);
            error.value=err.message
          } else {
            // console.error('Error:', error);
            console.error('There was a problem with your Axios request:', err);
            error.value=err.response?.data.message
          }
        }//cache
        if(isError.value){
          loading.value=false;
          return;
        }
        
        // let i=0;
        interval.value=setInterval(async ()=>{
          try{
              let rs=await api.get(`paperless/v1/consent/${consent.value.data.data.txID}`);
              if(rs.data.data.status==='DISAPPROVED'){
                isError.value=true;
                error.value="คำขออนุมัติได้ถูกยกเลิกแล้ว"
              }
              if(rs.data.data.status!=='APPROVED' && rs.data.data.status!=='DISAPPROVED'){
                // if(i==0){
                //   window.open(`cdt://imauth.bora.dopa.go.th?txID=${consent.value.data.data.txID}&to=internal`,"_self");
                //   i++;
                // }
                error.value=`<i class="fa-solid fa-hourglass-start"></i> รอการอนุมัติจากเจ้าหน้าที่`

              }
              if(rs.data.data.status==='APPROVED'){
                //ทำการ approve แล้ว
                let txID2=consent.value.data.data.txID; 
                data.value={
                  pid:route.query.pid,
                  dob:route.query.dob,
                  name:JSON.parse(route.query.th_fullname),
                  txID:txID2,
                }
                success.value=true;
                error.value=`${data.value.name} <br>อนุมัติรายการเรียบร้อยแล้ว`;
                loading.value=false;
              }
            }catch(err){
              isError.value=true;
              if (err?.code=='ECONNABORTED' || err?.code=='ERR_BAD_RESPONSE') {
                console.log('Request canceled', err.message);
                error.value=err.message
              } else {
                // console.error('Error:', error);
                console.error('There was a problem with your Axios request:', err);
                error.value=err.response?.data.message
              }
            }
            if(isError.value){
              loading.value=false;
              clearInterval(interval.value)
            }
            if(success.value){
              //approve
              clearInterval(interval.value)
            }
          },5000)   
          
    } else {
        error.value= `ไม่สามารถอนุมัติรายการได้  ${route.query.msg}`
    }
    return;
  }
});

</script>