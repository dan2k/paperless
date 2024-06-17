<template>
    <div class="container-fluid mx-0 px-0">
        <div class="float-start fw-bold" v-if="!isHide">ชื่อหน่วยงาน: <span>{{pv_desc}}</span></div>
        <div class="float-end fw-bold" v-if="!isHide">เดือน{{ mmTh.text }} <span>ปี {{yyTh.text}}</span></div>
        
    </div >
</template>
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
const {getEquip,reportStore,router,route,authStore,months,years}=useReport()
const isHide=ref(true);
const rg=route.params.rg;
const back=()=>{
    router.push({path:`/report/main/`+Date.now()});
}
const mmTh=ref(null)
const yyTh=ref(null);
onMounted(async()=>{
    mmTh.value=months.filter((it)=>it.id==month)
    yyTh.value=years.filter((it)=>it.id==year)
    reportStore.isLoading=true;
    // equips.value=await getEquip(props.contractno,level,pageLevel,rg,pv)
    isHide.value=false
    reportStore.isLoading=false;
})
</script>