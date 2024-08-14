<template>
    <div class="container-fiuld mx-0">
        <div class="mb-3 row">
            <label for="places" class="col-sm-2 col-form-label text-end">สถานที่:</label>
            <div class="col-sm-7">
                <select id="places" class="form-select form-select-sm" v-model="place">
                    <option value="">-- เลือกสถานที่ --</option>
                    <option v-for="(p,i) in places.data" :value="p" :key="i">{{ p.cust_pdesc }}</option>

                </select>
            </div>
        </div>
        {{ place }}
    </div>
</template>
<script setup>
import { useAdmin } from "./admin"
import { onMounted,ref } from "vue";
const {authStore,getPlace}=useAdmin();
const placetype=authStore.userData.ses_placetype;
const sectionid=authStore.userData.section_id;
const places=ref([])
const place=ref("")
onMounted(async ()=>{
    places.value=await getPlace(placetype,sectionid)
    console.log(places.value)
});
</script>