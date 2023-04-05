<template>
  <Suspense>
    <div class="main">
      <filter-bar
        v-model:month="month"
        v-model:year="year"
        v-model:type="type"
        v-model:options="options"
        @search="search()"
        @chan="data.length=0"
      />

      <div class="row justify-content-md-center" v-if="data.length">
        <div class="col-sm-12 col-md-7">
          <ol class="list-group">
            <li
              v-for="d in data"
              class="list-group-item list-group-item-action d-flex justify-content-between align-items-start"
            >
              <div class="ms-2 me-auto w-100">
                <div>
                  <span :class="{'text-danger':(type==1&&d.rpm!=d.pm)}">{{ d.desc }}</span>
                   <ul v-if="type==1">
                      <li class="text-success">จำนวนที่เปิด {{ d.rpm }} รายการ</li>
                      <li class="text-primary">จำนวนที่ต้องเปิดทั้งหมด {{ d.pm }} รายการ</li>
                   </ul>
                  <span v-if="(d.co>0 && type==0) || (type==1 && d.rpm>0)" class="float-end">
                    <button
                      type="button"
                      class="btn btn-link btn-sm"
                      @click="
                        $router.push({
                          path: '/rcs',
                          query: {
                            rg: d.rg,
                            groupid: group_id,
                            type,
                            month,
                            year,
                            ccs: 'หน้าแรก',
                          },
                        })
                      "
                    >
                      <!-- <i class="fa-solid fa-angles-right"></i> -->
                      <span v-if="type==0">จำนวน {{ d.co }} รายการ</span>
                      <span v-if="type==1">รายละเอียด</span>
                    </button></span
                  >
                </div>
              </div>
              <!-- <span class="badge bg-primary rounded-pill">{{ type==0?d.co:d.rpm }}</span> -->
            </li>
            <li class="py-2 d-flex justify-content-between align-items-start">
              <div class="ms-2 me-auto w-100">
                <div class="fw-bold">
                  รวมทั้งหมด 
                  <span v-if="type==0" class="float-end">{{ sums }} รายการ</span>
                  <span v-if="type==1" class="float-end"><span class="text-success">{{ sums.rpm }}</span>/<span class="text-primary">{{ sums.pm }}</span> รายการ</span>
                </div>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </div>
    <template #fallback>Loading...</template>
  </Suspense>
</template>
<script setup>
// import FilterBar from "../components/filterbar.vue";

import { onMounted, ref, reactive,computed, defineAsyncComponent } from "vue";
import { useService } from "./service";
const FilterBar = defineAsyncComponent(() => import("../components/filterbar.vue"));
const { route, appStore, authStore, month, year, type, getSumRcs } = useService();
// const rg = authStore.userData.section_id;
const group_id = authStore.userData.group_id;
const data = ref([]);
const search = async () => {
  data.value.length=0
  data.value = await getSumRcs(group_id, type.value, year.value, month.value);
};
const options=reactive({groupid:group_id,level:4})
const sums = computed(() => {
  if(type.value==0){
    return data.value.reduce((p, it) => p + Number(it.co), 0);
  }else{
    return {pm:data.value.reduce((p, it) => p + Number(it.pm), 0),rpm:data.value.reduce((p, it) => p + Number(it.rpm), 0)};
  }
});
onMounted(async () => {
  appStore.title = "รายงานการ Service/PM";
  if (route.query.type && route.query.year) {
    await search();
  }
});
</script>
<style scoped>
.main {
  font-size: 14px;
}
.line {
  width: 100%;
  height: 1px;
  border-bottom: 1px dashed #ddd;
  margin: 40px 0;
}
ol li {
  font-size: 14px;
}
</style>
