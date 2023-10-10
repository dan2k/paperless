<template>
  <Suspense>
    <template #fallback>Loading...</template>

    <div class="main">
      <filter-bar
        v-if="level==2"
        v-model:month="month"
        v-model:year="year"
        v-model:type="type"
        v-model:options="options"
        @search="search()"
        @chan="data.length=0"
      />
      <h4 v-if="level!=2" class="text-center text-primary"><u>รายงาน {{$route.query.type==0?'service':'PM'}} {{ $route.query.month }}/{{ Number($route.query.year)+543 }}</u></h4>
      <div class="row justify-content-md-center" v-if="data?.length">
        <div class="col-sm-12 col-md-7">
          <div class="text-primary d-flex justify-content-between px-2">
            <!-- <i class="fa-solid fa-sitemap"></i> {{ dcs }} -->
            <div class="col-10">
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
                  <li
                    v-if="isRoute && !$route.query.ccs && $route.query.rcs"
                    class="breadcrumb-item"
                  >
                    <i class="fa-solid fa-sitemap"></i>&nbsp;
                    <a
                      href="javascript:void(0)"
                      @click="
                        $router.push({
                          path: '/rcs',
                          query: {
                            type,
                            year,
                            month,
                            groupid: $route.query.groupid,
                            rg: $route.query.rg,
                            ccs: $route.query.ccs,
                            rcs: $route.query.rcs,
                            pcs: $route.query.pcs,
                          },
                        })
                      "
                      >หน้าแรก</a
                    >
                  </li>
                  <li v-if="isRoute && $route.query.ccs" class="breadcrumb-item">
                    <a
                      href="javascript:void(0)"
                      @click="
                        $router.push({
                          path: '/rcs',
                          query: {
                            type,
                            year,
                            month,
                            groupid: $route.query.groupid,
                            rg: $route.query.rg,
                            ccs: $route.query.ccs,
                            rcs: $route.query.rcs,
                            pcs: $route.query.pcs,
                          },
                        })
                      "
                      >{{ $route.query.rcs }}</a
                    >
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    <i v-if="!$route.query.rcs" class="fa-solid fa-sitemap"></i> {{ dcs }}
                  </li>
                </ol>
              </nav>
            </div>
            <button
              v-if="isRoute && level!=2"
              @click="
                $router.push({
                  path: `/rcs`,
                  query: {
                    type,
                    year,
                    month,
                    rg: $route.query.rg,
                    groupid: $route.query.groupid,
                    ccs: $route.query.ccs,
                    rcs: $route.query.rcs,
                    pcs: $route.query.pcs,
                  },
                })
              "
              type="button"
              class="float-end btn btn-link btn-sm"
            >
              ย้อนกลับ
            </button>
          </div>

          <ol class="list-group">
            <li
              v-for="d in data"
              class="list-group-item list-group-item-action d-flex justify-content-between align-items-start"
            >
              <div class="ms-2 me-auto w-100">
                <div :class="{'text-danger':(type==1&&d.rpm!=d.pm)}" class="fw-bold">{{ d.cust_pcode }}</div>
                <div>
                  <span :class="{'text-danger':(type==1&&d.rpm!=d.pm)}">{{ d.cust_pdesc }}</span>
                  <ul v-if="type==1">
                    <li class="text-success">จำนวนสัญญาที่เปิด {{ d.rpm }} รายการ</li>
                    <li class="text-primary">จำนวนสัญญาที่ต้องเปิดทั้งหมด {{ d.pm }} รายการ</li>
                </ul>
                  <span v-if="(d.co>0 && type==0) || (type==1 && d.rpm>0)" class="float-end">
                    <button
                      type="button"
                      class="btn btn-link btn-sm"
                      @click="
                        $router.push({
                          path: `/dcs`,
                          query: {
                            custptype: d.cust_ptype,
                            custpcode: d.cust_pcode,
                            type,
                            year,
                            month,
                            rg: $route.query.rg,
                            groupid: $route.query.groupid,
                            cc: $route.query.cc,
                            ccs: $route.query.ccs,
                            rcs: $route.query.rcs,
                            pcs: dcs,
                          },
                        })
                      "
                    >
                      <!-- <i class="fa-solid fa-angles-right"></i> -->
                      <span v-if="type==0">จำนวน {{ d.co }} รายการ</span>
                      <span v-if="type==1">รายละเอียด</span>
                    </button>
                  </span>
                </div>
              </div>
              <!-- <span class="badge bg-primary rounded-pill">{{ d.co }}</span> -->
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
  </Suspense>
</template>
<script setup>
// import FilterBar from "../components/filterbar.vue";

import { onMounted, ref, computed,reactive,defineAsyncComponent } from "vue";
import { useService } from "./service";
const {
  route,
  appStore,
  authStore,
  month,
  year,
  type,
  getDCSInfo,
  getSumDcs,
} = useService();
const FilterBar = defineAsyncComponent(() => import("../components/filterbar.vue"));
const cc = route.query.cc ?? authStore.userData.cc;
const group_id = route.query.groupid ?? authStore.userData.group_id;
const data = ref([]);
const dcs = ref(null);
const isRoute = ref(false);
const level=authStore.userData.sur_level;
const options=reactive({groupid:group_id,level:2,pv:cc})
const search = async () => {
  data.value.length=0
  data.value = await getSumDcs(cc, group_id, type.value, year.value, month.value);
};
const sums = computed(() => {
  if(type.value==0){
    return data.value.reduce((p, it) => p + Number(it.co), 0);
  }else{
    return {pm:data.value.reduce((p, it) => p + Number(it.pm), 0),rpm:data.value.reduce((p, it) => p + Number(it.rpm), 0)};
  }
});
onMounted(async () => {
  appStore.title = "รายงานการ Service/PM";
  isRoute.value = route.query.cc && route.query.groupid;
  dcs.value = await getDCSInfo(4, cc);
  if (route.query.type && route.query.year) {
    await search();
  }
});
</script>
<style scoped>
.main{
  font-size:14px;
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
