<template>
    <h5 class="text-center">รายงานการบำรุงรักษาระบบคอมพิวเตอร์</h5>
    <div class="container alert alert-info">
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label m-0">โครงการ:</label>
            <select class="form-select form-select-sm m-0" 
                v-model="contractno"
                @change="change"
            >
                <option value="1">test1</option>
                <option value="2">test2</option>
            </select>
        </div>
        <div class="row">
            <div class="col-md-3">
                <label for="exampleInputEmail1" class="form-label m-0">ปี:</label>
                <select class="form-select form-select-sm" 
                        v-model="year"
                        @change="change"
                >
                    <option value="1">test1</option>
                    <option value="2">test2</option>
                </select>
            </div>
            <div class="col-md-3">
                <label for="exampleInputEmail1" class="form-label m-0">เดือน:</label>
                <select class="form-select form-select-sm" 
                    v-model="month"
                    @change="change"
                >
                    <option value="1">test1</option>
                    <option value="2">test2</option>
                </select>
            </div>  
        </div>
    </div>
    <router-view :contractno="contractno" :year="year" :month="month"></router-view>
</template>
<script setup>
import {ref} from "vue"
import { useRouter,useRoute } from 'vue-router';
const contractno=ref(null);
const month=ref(null)
const year=ref(null)
const router=useRouter()
const change=()=>{
    if(!contractno.value||!year.value|| !month.value) return;
    router.push({name:'report-main'})
}
</script>