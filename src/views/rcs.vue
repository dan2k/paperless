<template>
  <Suspense>
    <template #fallback>Loading...</template>
  <div class="main">
    <filter-bar
      v-if="!$route.query.rg"
      v-model:month="month"
      v-model:year="year"
      v-model:type="type"
      v-model:options="options"
      @search="search()"
    />
    <h4 v-if="$route.query.rg" class="text-center text-primary"><u>รายงาน {{$route.query.type==0?'service':'PM'}} {{ $route.query.month }}/{{ Number($route.query.year)+543 }}</u></h4>
    <div class="row justify-content-md-center" v-if="data.length">
      <div class="col-sm-12 col-md-7">
        <div class="text-primary d-flex justify-content-between px-2">
          <div class="col-8">
            <nav aria-label="breadcrumb">
              <!-- <i class="fa-solid fa-sitemap"></i> -->
              <ol class="breadcrumb">
                <li v-if="isRoute && $route.query.ccs" class="breadcrumb-item">
                  <i class="fa-solid fa-sitemap"></i>&nbsp;
                  <a
                    href="javascript:void(0)"
                    @click="$router.push({ path: '/ccs', query: { type, year, month } })"
                    >หน้าแรก</a
                  >
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  <i v-if="!$route.query.ccs" class="fa-solid fa-sitemap"></i> {{ dcs }}
                </li>
              </ol>
            </nav>
          </div>
          <button
            v-if="isRoute && $route.query.rg"
            @click="
              $router.push({
                path: `/ccs`,
                query: {
                  type,
                  year,
                  month,
                  rg: $route.query.rg,
                  groupid: $route.query.groupid,
                  cc: $route.query.cc,
                  ccs: $route.query.ccs,
                  rcs: $route.query.rcs,
                  pcs: $route.query.pcs,
                },
              })
            "
            type="button"
            class="btn btn-link btn-sm"
          >
            ย้อนกลับ
          </button>
          <!-- {{ dcs }} -->
        </div>
        <ol class="list-group">
          <li
            v-for="d in data"
            class="list-group-item list-group-item-action d-flex justify-content-between align-items-start"
          >
            <div class="ms-2 me-auto w-100">
              <div class="fw-bold">{{ d.cc }}</div>
              <div>
                {{ d.province_name }}
                <ul v-if="type==1">
                      <li>จำนวนที่เปิด {{ d.rpm }} รายการ</li>
                      <li>จำนวนที่ต้องเปิดทั้งหมด {{ d.pm }} รายการ</li>
                </ul>
                <span v-if="(d.co>0 && type==0) || (type==1 && d.rpm>0)" class="float-end">
                  <button
                    type="button"
                    class="btn btn-link btn-sm"
                    @click="
                      $router.push({
                        path: '/pcs',
                        query: {
                          rg: rg,
                          groupid: group_id,
                          cc: d.province_id,
                          type,
                          month,
                          year,
                          rcs: dcs,
                          ccs: $route.query.ccs,
                        },
                      })
                    "
                  >
                    <!-- <i class="fa-solid fa-angles-right"></i> -->
                      <span v-if="type==0">จำนวน {{ d.co }} รายการ</span>
                      <span v-if="type==1">รายละเอียด</span>
                    </button
                ></span>
              </div>
            </div>
            <!-- <span class="badge bg-primary rounded-pill">{{ d.co }}</span> -->
          </li>
          <li class="py-2 d-flex justify-content-between align-items-start">
            <div class="ms-2 me-auto w-100">
              <div class="fw-bold">
                รวมทั้งหมด 
                  <span v-if="type==0" class="float-end">{{ sums }} รายการ</span>
                  <span v-if="type==1" class="float-end">{{ sums.rpm }}/{{ sums.pm }} รายการ</span>
              </div>
            </div>
          </li>
        </ol>
      </div>
    </div>
  </div>
  </Suspense>
</template>
<script setup>
// import FilterBar from "../components/filterbar.vue";
import { onMounted, ref,reactive,defineAsyncComponent, computed } from "vue";
import { useService } from "./service";
const FilterBar = defineAsyncComponent(() => import("../components/filterbar.vue"));
const {
  route,
  appStore,
  authStore,
  month,
  year,
  type,
  getDCSInfo,
  getSumPcs,
} = useService();

const rg = route.query.rg ?? authStore.userData.section_id;
const group_id = route.query.groupid ?? authStore.userData.group_id;
const data = ref([]);
const dcs = ref(null);
const isRoute = ref(false);
const options=reactive({groupid:group_id,level:3,rg:rg})
const search = async () => {
  data.value.length=0;
  data.value = await getSumPcs(rg, group_id, type.value, year.value, month.value);
};

const sums = computed(() => {
  if(type.value==0){
    return data.value.reduce((p, it) => p + Number(it.co), 0);
  }else{
    return {pm:data.value.reduce((p, it) => p + Number(it.pm), 0),rpm:data.value.reduce((p, it) => p + Number(it.rpm), 0)};
  }
});
onMounted(async () => {
  isRoute.value = route.query.rg ? true : false;
  appStore.title = "รายงานการ Service/PM";
  dcs.value = await getDCSInfo(3, rg);
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
