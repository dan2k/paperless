<template>
    <!-- <h5 class="text-center">รายงานการบำรุงรักษาระบบคอมพิวเตอร์</h5> -->
    <div class="container alert alert-info">
        <div class="mb-1">
            <label for="exampleInputEmail1" class="form-label m-0">โครงการ:</label>
            <select class="form-select form-select-sm m-0" 
                v-model="contractno"
                @change="change"
            >
                <option 
                    v-for="con in contractnos" :key="con.contract_no"
                    :value="con.contract_no"
                >{{ con.contract_no_cust }}:{{ con.contract_name }}</option>
                
            </select>
        </div>
        <div class="row">
            <div class="col-md-3">
                <label for="exampleInputEmail1" class="form-label m-0">ปี:</label>
                <select class="form-select form-select-sm" 
                        v-model="year"
                        @change="change"
                >
                    <option v-for="y in years" :key="y.id" :value="y.text">{{ y.text }}</option>
                    
                </select>
            </div>
            <div class="col-md-3">
                <label for="exampleInputEmail1" class="form-label m-0">เดือน:</label>
                <select class="form-select form-select-sm" 
                    v-model="month"
                    @change="change"
                >
                    <option v-for="m in months" :key="m.id" :value="m.text">{{ m.text }}</option>
                </select>
            </div>  
        </div>
    </div>
    <router-view :contractno="contractno" :year="year" :month="month"></router-view>
</template>
<script setup>
import {ref,onMounted} from "vue"
import { useRouter,useRoute } from 'vue-router';
import { useReport } from "./report.js"
const contractnos=ref([]);
const contractno=ref(null);
const years=ref([
    {id:'2024',text:'2567'}
]);
const months=ref([
    {id:'01',text:'มกราคม'},
    {id:'02',text:'กุมภาพันธ์'},
    {id:'03',text:'มีนาคม'},
    {id:'04',text:'เมษายน'},
    {id:'05',text:'พฤษภาคม'},
    {id:'06',text:'มิถุนายน'},
    {id:'07',text:'กรกฏาคม'},
    {id:'08',text:'สิงหาคม'},
    {id:'09',text:'กันยายน'},
    {id:'10',text:'ตุลาคม'},
    {id:'11',text:'พฤศจิกายน'},
    {id:'12',text:'ธันวาคม'},
])
const month=ref(null)
const year=ref(null)
const router=useRouter()
const {appStore,getContract}=useReport()
const change=()=>{
    if(!contractno.value||!year.value|| !month.value) return;
    router.push({name:'report-main'})
}
onMounted(async ()=>{
    appStore.setTitle("รายงานการบำรุงรักษาระบบคอมพิวเตอร์")
    contractnos.value=await getContract()
    // console.log(contractnos.value);
})
</script>