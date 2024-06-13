<template>
    <div class="container-fuld mx-2">
        <table class="table table-bordered tbrep bg-white mx-auto" v-if="!isHide">
            <thead>
                <tr>
                    <th width="3%" class="text-center">ลำดับ</th>
                    <th width="8%">หน่วยงาน</th>
                    <th v-for="cat in equips.cats" :key="cat.cat_id" :width="(72/equips.cats.length)+'%'" class="text-center">{{ cat.cat_desc }}</th>
                    <th width="12%" class="text-center">ผู้อนุมัติ</th>
                    <th width="5%" class="text-center">#</th>
                </tr>
            </thead>
            <tbody v-if="!isHide">
                <tr v-for="(equip,index) in equips.data" :key="index" >
                    <td>{{ index+1 }}</td>
                    <td>{{ equip.rg_desc }}</td>
                    <td v-for="cat in equips.cats" :key="cat.cat_id" align="center">
                        {{ equip[cat.cat_id]|0 }}
                    </td>
                    <td></td>
                    <td align="center">xxx</td>
                </tr>
            </tbody>
        </table>    
        <div v-if="isHide" class="alert alert-primary w-25 mx-auto text-center">กำลังประมวลผล......</div>
    </div>
</template>
<style scoped>
    .tbrep{
        font-size:10px;
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
const {regions,getEquip}=useReport()
const equips=ref([]);
const isHide=ref(true);
onMounted(async()=>{
    console.log(1)
    equips.value=await getEquip(props.contractno)
    isHide.value=false
    console.log({equips})
})

</script>
