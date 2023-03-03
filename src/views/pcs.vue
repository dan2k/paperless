<template>
  <div class="main">
    <filter-bar
      v-if="!$route.query.rg"
      v-model:month="month"
      v-model:year="year"
      v-model:type="type"
      @search="search()"
    />
    <div class="row justify-content-md-center" v-if="data.length">
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
            v-if="isRoute && $route.query.rg"
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
              <div class="fw-bold">{{ d.cust_pcode }}</div>
              <div>
                {{ d.cust_pdesc }}
                <span v-if="d.co > 0" class="float-end">
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
                    รายละเอียด
                  </button>
                </span>
              </div>
            </div>
            <span class="badge bg-primary rounded-pill">{{ d.co }}</span>
          </li>
          <li class="py-2 d-flex justify-content-between align-items-start">
            <div class="ms-2 me-auto w-100">
              <div class="fw-bold">
                รวมทั้งหมด <span class="float-end">{{ sums }} รายการ</span>
              </div>
            </div>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>
<script setup>
import FilterBar from "../components/filterbar.vue";
import { onMounted, ref, computed } from "vue";
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

const cc = route.query.cc ?? authStore.userData.cc;
const group_id = route.query.groupid ?? authStore.userData.group_id;
const data = ref([]);
const dcs = ref(null);
const isRoute = ref(false);
const search = async () => {
  data.value = await getSumDcs(cc, group_id, type.value, year.value, month.value);
};
const sums = computed(() => {
  return data.value.reduce((p, it) => p + Number(it.co), 0);
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
<style>
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
