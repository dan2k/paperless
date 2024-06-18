<template>
    <div class="container-fluid mx-0 px-0">
        <div class="float-start fw-bold" style="cursor:pointer" @click="back()" v-if="!isHide"><span><i class="fa-solid fa-left-long"></i></span></div>
        <div class="float-end fw-bold" v-if="!isHide">หน่วยงาน: <span>ศูนย์บริหารการทะเบียนภาค {{rg}}</span></div>
        <table class="table table-bordered tbrep bg-white mx-auto" v-if="!isHide">
            <thead class="bg-info bg-gradient text-white">
                <tr>
                    <th width="3%" class="text-center">ลำดับ</th>
                    <th width="10%">หน่วยงาน</th>
                    <th v-for="cat in equips.cats" :key="cat.cat_id" :width="(72/equips.cats.length)+'%'" class="text-center">{{ cat.cat_desc }}</th>
                    <th width="13%" class="text-center">ผู้อนุมัติ</th>
                    <th width="2%" class="text-center">#</th>
                </tr>
            </thead>
            <tbody v-if="!isHide">
                <tr v-for="(equip,index) in equips.data" :key="index" >
                    <td align="center" valign="middle">{{ index+1 }}</td>
                    <td
                        @click="gotoDcs(equip.rg,equip.rg_desc)"
                    >
                        <span class="btn btn-link link">{{ equip.rg_desc }}</span>
                    </td>
                    <td v-for="cat in equips.cats" :key="cat.cat_id" align="center" valign="middle">
                        {{ equip[cat.cat_id]|0 }}
                    </td>
                    <td></td>
                    <td align="center" valign="middle"><i class="fa-solid fa-print"></i></td>
                </tr>
            </tbody>
        </table>    
        <div class="w-100 mx-auto text-center">
            <button v-if="!isHide" class="btn btn-primary btn-sm" @click="generateExcel(equips.data,equips.cats)">
                พิมพ์สรุปจำนวนอุปกรณ์
            </button>
        </div>
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
const {getEquip,reportStore,router,route,authStore,generateExcel}=useReport()
const equips=ref([]);
const isHide=ref(true);
const rg=route.params.rg;
const gotoDcs=(pv,pv_desc)=>{
    router.push({path:`/report/dcs/${rg}/${pv}/${pv_desc}`})
}
const back=()=>{
    router.push({path:`/report/main/`+Date.now()})
}
 onMounted(async()=>{
    reportStore.isLoading=true;
    let level=authStore.userData.sur_level;
    let pageLevel=2
    equips.value=await getEquip(props.contractno,level,pageLevel,rg,0)
    isHide.value=false
    reportStore.isLoading=false;
    console.log({equips})
})
 
</script>
