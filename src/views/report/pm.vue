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
const {reportStore,router,route,authStore,getPm}=useReport()
const isHide=ref(true);
const rg=route.params.rg;
const pv=route.params.pv;
const pv_desc=route.params.pv_desc;
const custptype=route.params.custptype;
const custpcode=route.params.custpcode;
const yymm=props.year+''+props.month;
const contractno=props.contractno;
const pms=ref([]);
const data=ref([])
const back=()=>{
    router.push({path:`/report/dcs/${rg}/${pv}/${pv_desc}`});
}
 onMounted(async()=>{
    reportStore.isLoading=true;
    // let level=authStore.userData.sur_level;
    // let pageLevel=3
    // equips.value=await getEquip(props.contractno,level,pageLevel,rg,pv)
    pms.value=await getPm(contractno,custptype,custpcode,yymm)
    // console.log(pms.value.data)
    let tmp_type=await Object.keys(pms.value.data);
    for(let i=0;i<tmp_type.length;i++){
        let tmp2=pms.value.data[tmp_type[i]][0].type_desc;
        data.value[i]={type_id:tmp_type[i],type_desc:tmp2,data:pms.value.data[tmp_type[i]]}
    }
    console.log(data.value)
    isHide.value=false
    reportStore.isLoading=false;
    // console.log({equips})
})
 
</script>
