<template>
  <div class="container">
    <div class="card col-12 col-md-4 mx-auto">
      <div class="card-header">
        QRCODE READER
      </div>
      <div class="card-body">
        <div class="row">
          <!-- <div class="col-12  mx-auto">
            <select class="form-select" v-model="activeCameraId" @change="selectCamera">
              <option v-for="camera in cameras" :key="camera.id" :value="camera.id">
                {{ camera.name }}
              </option>
            </select>
          </div> -->
          <div class="col-12">
            <qrcode-stream 
              :track="paintBoundingBox" 
              :constraints="{ facingMode }"
              :paused="paused"
              @detect="onDetect" 
              @error="onError"
              @camera-on="onCameraOn"
              @camera-off="onCameraOff"
              v-if="!destroyed"
            >
              <div
                class="loading-indicator"
                v-if="loading && !error"
              >
                กำลังโหลด...
              </div>
              <button class="btn rounded-circle p-1 m-1 border bg-info bg-opacity-75 text-white border-white" @click="switchCamera" v-if="!loading && !paused">
                <!-- <img
                  src="/camera-switch.svg"
                  alt="switch camera"
                /> -->
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24">
                  <g
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                  >
                    <path
                      d="M22.003 3v4.497A.503.503 0 0 1 21.5 8v0c-.2 0-.38-.119-.466-.3A10.001 10.001 0 0 0 12.003 2c-5.186 0-9.45 3.947-9.95 9"
                    />
                    <path
                      d="M6 16.4V9.394a.6.6 0 0 1 .6-.6h1.173a.6.6 0 0 0 .504-.275l1.446-2.244A.6.6 0 0 1 10.227 6h3.546a.6.6 0 0 1 .504.275l1.446 2.244a.6.6 0 0 0 .504.275H17.4a.6.6 0 0 1 .6.6V16.4a.6.6 0 0 1-.6.6H6.6a.6.6 0 0 1-.6-.6Z"
                    />
                    <path
                      d="M12 14a2 2 0 1 0 0-4a2 2 0 0 0 0 4Zm-9.95 7v-4.497c0-.278.226-.503.504-.503v0c.2 0 .38.119.466.3a10.001 10.001 0 0 0 9.03 5.7c5.186 0 9.45-3.947 9.951-9"
                    />
                  </g>
                </svg>
              </button>
              <div
                v-show="showScanConfirmation"
                class="scan-confirmation"
              >
                <img
                  src="/checkmark.svg"
                  alt="Checkmark"
                  width="128"
                />
              </div>
            </qrcode-stream>
          </div>
          <div class="col-12">
            <!-- <div class="alert alert-primary my-0 text-center" v-if="result">{{ result }}</div> -->
            <div class="alert alert-success my-0" v-if="isSatisfy">
              <h5 class="text-center text-primary">*ประเมินความพึงพอใจ*</h5>
              <hr/>
              <div class="form-check px-5" v-for="s in optSatisfaction">
                <input class="form-check-input" :id="s.value" type="radio"   :value="s.value" v-model="satisfaction">
                <label class="form-check-label" :for="s.value">
                  {{ s.label }}
                </label>
              </div>
            </div>
            <div class="d-grid my-0" v-if="isSatisfy">
              <button class="btn btn-outline-success  text-center"  @click="save" v-if="satisfaction">บันทึก</button>
            </div>
            <div class="alert alert-danger" v-if="error" v-html="error"></div>
            <div class="d-grid gap-2" v-if="error">
              <button class="btn btn-outline-primary  text-center"  @click="reset">แสกนใหม่</button>
            </div>
            <div class="alert alert-danger text-center" v-if="noFrontCamera">You don't seem to have a front camera on your device</div>
            <div class="alert alert-danger text-center" v-if="noRearCamera">You don't seem to have a rear camera on your device</div>
            
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
</style>
<script setup>
  import { ref, onMounted, onUnmounted,nextTick } from 'vue';
  import { QrcodeStream } from 'vue-qrcode-reader';
  import { api,  start, close } from "@/helpers";
  import { useService } from "./service.js";
  // import axios from "axios";
  const {authStore,appStore,route,gotoCdg} = useService();
  // const authStore = useAuthStore();
  const empid = authStore.userData.ses_empid;
  const result=ref('')
  const error=ref('')
  const loading=ref(true)
  const destroyed=ref(false)
  const facingMode=ref('environment')
  const noRearCamera=ref(false)
  const noFrontCamera=ref(false)
  const paused=ref(false)
  const showScanConfirmation=ref(false)
  const optSatisfaction=[
    {label:'พอใจมาก',value:5},
    {label:'พอใจ',value:4},
    {label:'ปานกลาง',value:3},
    {label:'ไม่พอใจ',value:2},
    {label:'ไม่พอใจมาก',value:1},
  ]
  const satisfaction=ref(null)
  const isSatisfy=ref(false)
  const data=ref([]);
  const jobid=ref('');
  const onCameraOn=()=> {
      loading.value = false
      showScanConfirmation.value=false
  }
  const onCameraOff=()=> {
      showScanConfirmation.value = true
  }
  const switchCamera=()=> {
      switch (facingMode.value) {
        case 'environment':
          facingMode.value = 'user'
          break
        case 'user':
          facingMode.value = 'environment'
          break
      }
      reset()
  }
  const reset=async ()=>{
    destroyed.value = true
    result.value=''
    error.value=''
    showScanConfirmation.value=false
    satisfaction.value=null 
    isSatisfy.value=false
    await nextTick(()=>{
      destroyed.value = false
      loading.value = true
      if(paused.value) paused.value=false      
    })
  }
  const paintBoundingBox=(detectedCodes, ctx)=> {
    for (const detectedCode of detectedCodes) {
      const {
        boundingBox: { x, y, width, height }
      } = detectedCode

      ctx.lineWidth = 2
      ctx.strokeStyle = '#007bff'
      ctx.strokeRect(x, y, width, height)
    }
  }
  const onError=(err)=> {
    console.log(err)
    const triedFrontCamera = facingMode.value === 'user'
    const triedRearCamera =facingMode.value === 'environment'
    const cameraMissingError = err.name === 'OverconstrainedError'
    if (triedRearCamera && cameraMissingError) {
        noRearCamera.value = true
    }
    if (triedFrontCamera && cameraMissingError) {
        noFrontCamera.value = true
    }
    error.value = `[${err.name}]: `
    if (err.name === 'NotAllowedError') {
      error.value += 'you need to grant camera access permission'
    } else if (err.name === 'NotFoundError') {
      error.value += 'no camera on this device'
    } else if (err.name === 'NotSupportedError') {
      error.value += 'secure context required (HTTPS, localhost)'
    } else if (err.name === 'NotReadableError') {
      error.value += 'is the camera already in use?'
    } else if (err.name === 'OverconstrainedError') {
      error.value += 'installed cameras are not suitable'
    } else if (err.name === 'StreamApiNotSupportedError') {
      error.value += 'Stream API is not supported in this browser'
    } else if (err.name === 'InsecureContextError') {
      error.value += 'Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.'
    } else {
      error.value += err.message
    }
  }

  const onDetect= async (detectedCodes)=> {
    jobid.value=route.params.jobid
    result.value = JSON.stringify(
      detectedCodes.map(code => code.rawValue)  
    )
    paused.value = true
    let tmp=result.value
    tmp=tmp.replace(/\[/g,"")
    tmp=tmp.replace(/\]/g,"")
    tmp=tmp.replace(/\"/g,"")
    tmp=tmp.split('#')
    if(!tmp.length || tmp.length!==3 || tmp[0]!=="DOCUMENT_SHARE"){
      error.value='รูปแบบ qrcode ไม่ถูกต้อง'
      return ;
    }
    let txID=tmp[1];
    start()
    // const controller = new AbortController();
    // const CancelToken = axios.CancelToken;
    // const source = CancelToken.source();
    try{
      
      let rs= await api.get(`/paperless/v1/getShare/${txID}`,{ timeout: 1000*60*3});
      
      if(rs.data?.pid == null || rs.data?.birthdate == null || rs.data?.name ==null){
        error.value='กรุณาแชร์ข้อมูลให้ครบดังนี้ <ul><li>เลขประจำตัวประชาชน</li><li>วัน/เดือน/ปีเกิด</li><li>ชื่อ-นามสกุล ภาษาไทย</li></ul>';
        close();
        return;
      }
      //create and get consent with get txID
      //`/paperless/v1/consent/${pid}`
      let rs2=await api.post(`paperless/v1/consent/${rs.data.pid}/${jobid.value}`,{timeout: 1000*60*3});
      close();
      let txID2=rs2.data.data.txID; 
      //
      isSatisfy.value=true;
      data.value={
        pid:rs.data.pid,
        dob:rs.data.birthdate,
        name:rs.data.name,
        txID:txID2,
      }
    }catch(err){
        // console.log(err)
        if (err?.code=='ECONNABORTED' || err?.code=='ERR_BAD_RESPONSE') {
          console.log('Request canceled', err.message);
          error.value=err.message
        } else {
          // console.error('Error:', error);
          console.error('There was a problem with your Axios request:', err);
          error.value=err.response?.data.message
        }
      close();
			return ;
    }
  }
  const save= async ()=>{
    if(!satisfaction.value){
      return  
    }
    //ต้องตรวจสอบ consent status  ต้องเป็น APPROVED  ถ้ายังไม่ approve จะยังไม่ให้ทำรายการต่อ
    start();
    try{
      let rs=await api.get(`paperless/v1/consent/${data.value.txID}`);
      if(rs.data.data.status==='DISAPPROVED'){
        error.value="คำขออนุมัติได้ถูกยกเลิกแล้ว"
        close();
        return;
      }
      if(rs.data.data.status!=='APPROVED'){
        error.value="รอการอนุมัติจากเจ้าหน้าที่"
        close();
        return;
      }
      let rs2=await api.post(`/paperless/v1/approve/${jobid.value}/${satisfaction.value}/${empid}/${data.value.pid}/${data.value.name}/${data.value.dob}/${data.value.txID}/${rs.data.data.CreateDateFormatted}/${rs.data.data.UpdatedDateFormatted}`)
      console.log(rs2);
      await Swal({
          html: `${data.value.name} <br/> อนุมัติรายการเรียบร้อยแล้ว`,
          icon: 'success',
          confirmButtonText: 'ตกลง'
      })
      gotoCdg()
    }catch(err){
      console.error('There was a problem with your Axios request:', err);
      // error.value=err.response.data.message
      error.value="There was a problem with your Axios request";
      close();
    }
    console.log(data.value)

  }
  onMounted(async () => {
    appStore.title="อนุมัติการให้บริการ";
  });
  onUnmounted(() => {
  
  });
</script>