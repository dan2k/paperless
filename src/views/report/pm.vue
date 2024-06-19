<template>
    <div class="container-fluid mx-0 px-0">
        <div class="float-start fw-bold" style="cursor:pointer" @click="back()" v-if="!isHide"><span><i class="fa-solid fa-left-long"></i></span></div>
       
        <div v-if="isHide" class="alert alert-primary w-25 mx-auto text-center">กำลังประมวลผล......</div>
    </div>
</template>
<style scoped>
    .tbrep{
        font-size:12px;
    }
    .link{
        cursor:pointer;
        font-size:12px !important;
    }
</style>
<script setup>
import { ref , defineProps,onMounted} from "vue";
import { useReport } from "./report.js"
const props = defineProps({
      contractno: {
        type: String,
        required: true 
      },
      month: {
        type: String,
        required: true 
      },
      year: {
        type: String,
        required: true 
      },
});
const {reportStore,router,route,authStore,generateExcel}=useReport()
const isHide=ref(true);
const rg=route.params.rg;
const pv=route.params.pv;
const pv_desc=route.params.pv_desc;
const custptype=route.params.custptype;
const custpcode=route.params.custpcode;
const back=()=>{
    router.push({path:`/report/dcs/${rg}/${pv}/${pv_desc}`});
}
 onMounted(async()=>{
    reportStore.isLoading=true;
    // let level=authStore.userData.sur_level;
    // let pageLevel=3
    // equips.value=await getEquip(props.contractno,level,pageLevel,rg,pv)
    isHide.value=false
    reportStore.isLoading=false;
    // console.log({equips})
})
 
</script>
