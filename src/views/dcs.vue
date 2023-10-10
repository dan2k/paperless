<template>
   <Suspense>
    <template #fallback>Loading...</template>
  <div class="main">
    <filter-bar
      v-if="!$route.query.pcs"
      v-model:month="month"
      v-model:year="year"
      v-model:type="type"
      v-model:options="options"
      @search="search()"
    />
    <h4 v-if="$route.query.pcs" class="text-center text-primary"><u>รายงาน {{$route.query.type==0?'service':'PM'}} {{ $route.query.month }}/{{ Number($route.query.year)+543 }}</u></h4>
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
            <h5 class="fw-bold fs-6 text-primary">{{ i.sv_no }}</h5>
            <div class="row d-flex justify-content-between px-2">
              <div v-if="i.problem_type == 'P1'" class="col-sm-12 col-md-12">
                <span class="fw-semibold">สัญญา:&nbsp;</span
                ><span class="fw-lighter">{{ i.contract_desc }} </span>
              </div>
              <div v-if="i.problem_type == 'P3'" class="col-sm-12 col-md-12">
                <span class="fw-semibold">สัญญา:&nbsp;</span>
                <ul>
                  <li style="font-size: 14px" v-for="l in i.contract_desc.split('|')">
                    {{ l }}
                  </li>
                </ul>
              </div>
              <div v-if="i.problem_type == 'P1'" class="col-sm-12 col-md-12">
                <span class="fw-semibold">อุปกรณ์เสีย:&nbsp;</span
                ><span class="fw-light">{{ i.equip }} </span>
              </div>
              <div class="col-sm-12 col-md-5">
                <span class="fw-semibold">วันที่รับแจ้ง:&nbsp;</span
                ><span class="fw-light">{{ i.sv_date }} {{ i.sv_time }}</span>
              </div>
              <div class="col-sm-12 col-md-5">
                <span class="fw-semibold">วันที่แล้วเสร็จ:&nbsp;</span
                ><span class="fw-light">{{ i.sv_solve_date }} {{ i.sv_solve_time }}</span>
              </div>
              <div class="col-sm-12 col-md-5" v-if="i.sv_approve_flag==1">
                <span class="fw-semibold">ชื่อลูกค้า:&nbsp;</span
                ><span class="fw-light">{{ i.th_fullname }} </span>
              </div>
              <div class="col-sm-12 col-md-5" >
                <span class="fw-semibold">ผู้รับผิดชอบ:&nbsp;</span
                ><span class="fw-light">{{ i.thiname }} </span>
              </div>
              <div class="col-sm-12 col-md-5">
                <span class="fw-semibold">สถานะ:&nbsp;</span
                >
                <span class="fw-light" v-if="i.problem_type=='P1'">{{ i.status_id<8?'รอการอนุมัติ':'อนุมัติแล้ว' }} </span>
                <span class="fw-light" v-if="i.problem_type=='P3'">{{ i.status_id<2?'รอการอนุมัติ':'อนุมัติแล้ว' }} </span>
              </div>
              <div v-if="i.sv_approve_flag==1" class="col-sm-12 col-md-5">
                <span class="fw-semibold">Verify:&nbsp;</span
                >
                <span class="fw-light text-success" v-if="i.isVerify">✔</span>
                <span class="fw-light text-danger" v-if="!i.isVerify">✘</span>
              </div>
              <div class="line my-1"></div>
              <div clas="col-12"><button class="btn btn-primary btn-sm float-end" @click="open1(i)">พิมพ์</button></div>
            </div>
          </div>
        </div>
        <div class="ms-2 me-auto w-100">

          <div class="fw-bold mt-2">
            รวมทั้งหมด <span class="float-end">{{ sums }} รายการ</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  </Suspense>
</template>
<script setup>
// import FilterBar from "../components/filterbar.vue";
import { onMounted, ref, watch ,reactive,defineAsyncComponent} from "vue";
// import datatable from "vue3-easy-data-table";
// import "vue3-easy-data-table/dist/style.css";
import { useService } from "./service";
const FilterBar = defineAsyncComponent(() => import("../components/filterbar.vue"));

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
  open,
} = useService();
const dcs = ref(null);
let custptype = route.query.custptype ?? authStore.userData.ses_placetype;
let custpcode = route.query.custpcode ?? authStore.userData.ses_placecode;
const isRoute = ref(false);
const group_id = route.query.groupid ?? authStore.userData.group_id;
const options=reactive({groupid:group_id,level:1,custptype,custpcode})
const sums = ref(0);
watch(items, (n) => {
  sums.value = items.value.length;
});
const search = async () => {
  items.value.length=0
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
const open1=async (item)=>{
    if(item.sv_approve_flag==1 && !item.isVerify){
      await Swal({
          title:`<span style="color:red;font-weight:bold;">แจ้งเตือน</span>`,
          html: `รายการนี้ทำการ   verify signature  ไม่ผ่านอันเนื่องมากจากมีการแก้ไขข้อมูลในฐานข้อมูล`,
          icon: 'error',
          confirmButtonText: 'ตกลง',
          backdrop:true,
          allowOutsideClick: false,
      }).then(()=>{
        open(item.sv_no)
      })
      return 
    }
    open(item.sv_no)
}
</script>
<style scoped>
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
