<template>
  <div class="main">
    <filter-bar
      v-if="!$route.query.pcs"
      v-model:month="month"
      v-model:year="year"
      v-model:type="type"
      @search="search()"
    />
    <div class="row justify-content-md-center" v-if="serverItemsLength > 0">
      <!-- <div class="col-8">
      <h5>
        {{ dcs }}
        <button v-if="isRoute" @click="$router.push({path:`/pcs`,query:{type,year,month}})" type="button" class="float-end btn btn-link btn-sm">
          ย้อนกลับ
        </button>
      </h5>
      <datatable
        v-model:server-options="serverOptions"
        :server-items-length="serverItemsLength"
        :loading="loading"
        :headers="headers"
        :items="items"
        hide-footer
        show-index
      >
        <template #item-sv_no="item">
          <span :data-label="headers[0].text">{{ item.sv_no }}</span>
        </template>
        <template #item-sv_date="item">
          <span :data-label="headers[1].text">{{ item.sv_date }}</span>
        </template>
        <template #item-sv_time="item">
          <span :data-label="headers[2].text">{{ item.sv_time }}</span>
        </template>
        <template #item-thiname="item">
          <span :data-label="headers[3].text">{{ item.thiname }}</span>
        </template>
      </datatable>
    </div>
    <div class="col-8">
      <span class="float-end">รวม {{ serverItemsLength }} รายการ</span>
    </div> -->
      <div class="col-sm-12 col-md-7">
        <div class="text-primary d-flex justify-content-between px-2">
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
                <!-- <li v-if="isRoute &&  !$route.query.ccs && $route.query.rcs" class="breadcrumb-item" ><i class="fa-solid fa-sitemap"></i> <a  href="javascript:void(0)" @click="$router.push({path:'/rcs',query:{type,year,month,groupid:$route.query.groupid,rg:$route.query.rg}})">หน้าแรก</a></li> -->
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
                <li
                  v-if="isRoute && $route.query.ccs && $route.query.rcs"
                  class="breadcrumb-item"
                >
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
                <li
                  v-if="
                    isRoute && !$route.query.ccs && !$route.query.rcs && $route.query.pcs
                  "
                  class="breadcrumb-item"
                >
                <i class="fa-solid fa-sitemap"></i>&nbsp;
                  <a
                    href="javascript:void(0)"
                    @click="
                      $router.push({
                        path: '/pcs',
                        query: {
                          type,
                          year,
                          month,
                          groupid: $route.query.groupid,
                          rg: $route.query.rg,
                          cc: $route.query.cc,
                          ccs: $route.query.ccs,
                          rcs: $route.query.rcs,
                          pcs: $route.query.pcs,
                        },
                      })
                    "
                    >หน้าแรก</a
                  >
                </li>
                <li
                  v-if="isRoute && $route.query.rcs && $route.query.pcs"
                  class="breadcrumb-item"
                >
                  <a
                    href="javascript:void(0)"
                    @click="
                      $router.push({
                        path: '/pcs',
                        query: {
                          type,
                          year,
                          month,
                          groupid: $route.query.groupid,
                          rg: $route.query.rg,
                          cc: $route.query.cc,
                          ccs: $route.query.ccs,
                          rcs: $route.query.rcs,
                          pcs: $route.query.pcs,
                        },
                      })
                    "
                    >{{ $route.query.pcs }}</a
                  >
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  <i v-if="!$route.query.pcs" class="fa-solid fa-sitemap"></i>&nbsp;{{ dcs }}
                </li>
              </ol>
            </nav>
          </div>
          <button
            v-if="isRoute"
            @click="
              $router.push({
                path: `/pcs`,
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
            class="float-end btn btn-link btn-sm"
          >
            ย้อนกลับ
          </button>
        </div>
        <div class="card mb-1" v-for="i in items">
          <div class="card-body">
            <h5 class="card-title fs-6">{{ i.sv_no }}</h5>
            <div class="row d-flex justify-content-between px-2">
              <div v-if="i.problem_type == 'P1'" class="col-sm-12 col-md-12">
                <span class="card-title">สัญญา:&nbsp;</span
                ><span class="fw-light">{{ i.contract_desc }} </span>
              </div>
              <div v-if="i.problem_type == 'P3'" class="col-sm-12 col-md-12">
                <span class="card-title">สัญญา:&nbsp;</span>
                <ul>
                  <li style="font-size: 14px" v-for="l in i.contract_desc.split('|')">
                    {{ l }}
                  </li>
                </ul>
              </div>
              <div v-if="i.problem_type == 'P1'" class="col-sm-12 col-md-12">
                <span class="card-title">อุปกรณ์เสีย:&nbsp;</span
                ><span class="fw-light">{{ i.equip }} </span>
              </div>
              <div class="col-sm-12 col-md-5">
                <span class="card-title">วันที่รับแจ้ง:&nbsp;</span
                ><span class="fw-light">{{ i.sv_date }} {{ i.sv_time }}</span>
              </div>
              <div class="col-sm-12 col-md-5">
                <span class="card-title">วันที่รับแล้วเสร็จ:&nbsp;</span
                ><span class="fw-light">{{ i.sv_solve_date }} {{ i.sv_solve_time }}</span>
              </div>
              <div class="col-sm-12 col-md-5">
                <span class="card-title">ผู้รับผิดชอบ:&nbsp;</span
                ><span class="fw-light">{{ i.thiname }} </span>
              </div>
            </div>
          </div>
        </div>
        <div class="ms-2 me-auto w-100">
          <div class="fw-bold">
            รวมทั้งหมด <span class="float-end">{{ sums }} รายการ</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import FilterBar from "../components/filterbar.vue";
import { onMounted, ref, watch } from "vue";
// import datatable from "vue3-easy-data-table";
// import "vue3-easy-data-table/dist/style.css";
import { useService } from "./service";
const {
  route,
  appStore,
  authStore,
  month,
  year,
  type,
  items,
  serverItemsLength,
  getDCSInfo,
  loadFromServer,
} = useService();
const dcs = ref(null);
let custptype = route.query.custptype ?? authStore.userData.ses_placetype;
let custpcode = route.query.custpcode ?? authStore.userData.ses_placecode;
const isRoute = ref(false);
const sums = ref(0);
watch(items, (n) => {
  sums.value = items.value.length;
});
const search = async () => {
  await loadFromServer(custptype, custpcode);
};
onMounted(async () => {
  dcs.value = await getDCSInfo(custptype, custpcode);
  if (route.query.custptype && route.query.custpcode) {
    isRoute.value = true;
  }
  appStore.title = "รายงานการ Service/PM";
  if (isRoute.value) {
    await search();
  }
});
</script>
<style>
.main {
  font-size: 14px;
}
.card:hover {
  background-color: #ddd;
  cursor: pointer;
}
.line {
  width: 100%;
  height: 1px;
  border-bottom: 1px dashed #ddd;
  margin: 40px 0;
}
/* 
@media screen and (max-width: 767px) {
  table tr td {
    width: 100% !important;
  }
  table thead {
    display: none;
  }
  table tr > * {
    display: block;
    width: 100%;
  }
  table tbody tr > td > span:before {
    content: attr(data-label) "\003A\00a0\00a0";
    float: left;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 1em;
  }
} */
</style>
