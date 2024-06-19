<template>
    <!-- <h5 class="text-center">รายงานการบำรุงรักษาระบบคอมพิวเตอร์</h5> -->
    <div class="container-fluid alert bg-info bg-gradient text-white main">
        <div class="mb-1">
            <label for="exampleInputEmail1" class="form-label m-0">โครงการ:</label>
            <select class="form-select form-select-sm m-0" 
                v-model="contractno"
                @change="change"
                :disabled="reportStore.isLoading"
            >
                <option value="">-- เลือกโครงการ--</option>
                <option 
                    v-for="con in contractnos" :key="con.contract_no"
                    :value="con.contract_no"
                >{{ con.contract_no_cust }}:{{ con.contract_name }}</option>
                
            </select>
        </div>
        <div class="row d-flex justify-content-center">
            <div class="col-md-3">
                <label for="exampleInputEmail1" class="form-label mt-1">ปี:</label>
                <select class="form-select form-select-sm" 
                        v-model="year"
                        @change="change"
                        :disabled="reportStore.isLoading"
                >
                <option value="">-- ปี --</option>
                    <option v-for="y in years" :key="y.id" :value="y.id">{{ y.text }}</option>
                    
                </select>
            </div>
            <div class="col-md-3">
                <label for="exampleInputEmail1" class="form-label mt-1">เดือน:</label>
                <select class="form-select form-select-sm" 
                    v-model="month"
                    @change="change"
                    :disabled="reportStore.isLoading"
                >
                <option value="">-- เลือกเดือน--</option>
                    <option v-for="m in months" :key="m.id" :value="m.id">{{ m.text }}</option>
                </select>
            </div>  
        </div>
    </div>
    <router-view :contractno="contractno" :year="year" :month="month" :key="$route.params[$route.meta.watchParam]"></router-view>
    <!-- key="$route.fullPath" -->
</template>
<style scoped>
    .main{
        font-size:12px;
    }
    select{
        font-size:12px !important;
    }
    label{
        font-weight:bold !important;
    }
</style>
<script setup>
import {ref,onMounted} from "vue"
import { useRouter,useRoute } from 'vue-router';
import { useReport } from "./report.js"
const contractnos=ref([]);
const contractno=ref("");
const month=ref("")
const year=ref("")
const router=useRouter()
const {appStore,getContract,reportStore,months,years}=useReport()
const change=()=>{
    if(!contractno.value||!year.value|| !month.value) return;
    console.log('yes')
    router.push({path:'/report/main/'+Date.now()})
}
onMounted(async ()=>{
    appStore.setTitle("รายงานการบำรุงรักษาระบบคอมพิวเตอร์")
    contractnos.value=await getContract()
    reportStore.isLoading=false;
    console.log('isLoading',reportStore.isLoading)
    // console.log(contractnos.value);
})
</script>