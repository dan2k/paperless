<template>
    <div class="container-fuld mx-2">
        pcs
    </div>
</template>
<style scoped>
    .tbrep{
        font-size:12px;
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
const {regions,getEquip,reportStore,router,route}=useReport()
const equips=ref([]);
const isHide=ref(true);
const gotoPcs=(rg)=>{
    router.push({path:`/report/pcs/${rg}`})
}
/* onMounted(async()=>{
    console.log(1)
    reportStore.isLoading=true;
    equips.value=await getEquip(props.contractno)
    isHide.value=false
    reportStore.isLoading=false;
    console.log({equips})
})
 */
</script>
