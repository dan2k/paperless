<template>
    <div class="container m-1">
        <table class="table table-bordered">
            <thead>
                <tr>
                    <td>ลำดับ</td>
                    <td>หน่วยงาน</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(region,index) in regions" :key="index" >
                    <td>{{ index }}</td>
                    <td>{{ region.rg_desc }}</td>
                </tr>
            </tbody>
        </table>        
    </div>
</template>
<script setup>
import { ref , defineProps} from "vue";
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
const {regions}=useReport()
</script>