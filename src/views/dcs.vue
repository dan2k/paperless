<template>
  <filter-bar
    v-show="!isRoute"
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
      <h5>
        {{ dcs }}
        <button
          v-if="isRoute"
          @click="$router.push({ path: `/pcs`, query: { type, year, month,rg:$route.query.rg,groupid:$route.query.groupid,cc:$route.query.cc } })"
          type="button"
          class="float-end btn btn-link btn-sm"
        >
          ย้อนกลับ
        </button>
      </h5>
      <div class="card mb-1" v-for="i in items">
        <div class="card-body">
          <h5 class="card-title fs-6">{{ i.sv_no }}</h5>
          <div class="row d-flex justify-content-between px-2">
            <div v-if="i.problem_type=='P1'" class="col-sm-12 col-md-12"><span class="card-title">สัญญา:&nbsp;</span><span class="fw-light">{{ i.contract_desc }} </span></div>
            <div v-if="i.problem_type=='P3'" class="col-sm-12 col-md-12">
              <span class="card-title">สัญญา:&nbsp;</span> 
              <ul >
                <li style="font-size:14px;" v-for="l in i.contract_desc.split('|')" >{{ l }}</li>
              </ul>
            </div>
            <div v-if="i.problem_type=='P1'" class="col-sm-12 col-md-12"><span class="card-title">อุปกรณ์เสีย:&nbsp;</span><span class="fw-light">{{ i.equip }} </span></div>
            <div class="col-sm-12 col-md-5"><span class="card-title">วันที่รับแจ้ง:&nbsp;</span><span class="fw-light">{{ i.sv_date }} {{ i.sv_time }}</span></div>
            <div class="col-sm-12 col-md-5"><span class="card-title">วันที่รับแล้วเสร็จ:&nbsp;</span><span class="fw-light">{{ i.sv_solve_date }} {{ i.sv_solve_time }}</span></div>
            <div class="col-sm-12 col-md-5"><span class="card-title">ผู้รับผิดชอบ:&nbsp;</span><span class="fw-light">{{ i.thiname }} </span></div>
            
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
</template>
<script setup>
import FilterBar from "../components/filterbar.vue";
import { onMounted, ref,watch } from "vue";
import { useAppStore } from "@/store";
import { useRouter, useRoute } from "vue-router";
import { api, errAlert, okAlert } from "@/helpers";
import datatable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";
import { useAuthStore } from "../store";
const router = useRouter();
const route = useRoute();
let date = new Date();
let d = date.toJSON();
d = d.split("T");
d = d[0];
d = d.split("-");
const store = useAuthStore();
const store2 = useAppStore();
const month = ref(d[1]);
const year = ref(d[0]);
const type = ref(0);
const dcs = ref(null);
const search = async () => {
  await loadFromServer();
};
const getDCSInfo = async () => {
  try {
    let rs = await api.get(`/paperless/v1/getDCSInfo/${custptype}/${custpcode}`);
    dcs.value = rs.data.data;
  } catch (err) {
    errAlert(err);
  }
};
const headers = [
  { text: "หมายเลขปัญหา", value: "sv_no", width: 120 },
  { text: "วันที่", value: "sv_date" },
  { text: "เวลา", value: "sv_time" },
  { text: "ผู้รับผิดชอบ", value: "thiname" },
];

const items = ref([]);
const loading = ref(false);
const serverItemsLength = ref(0);
let custptype = store.userData.ses_placetype;
let custpcode = store.userData.ses_placecode;
const isRoute = ref(false);
const sums=ref(0);
watch(items,(n)=>{
  sums.value=items.value.length;
})
onMounted(async () => {
  if (route.params.custptype && route.params.custpcode) {
    isRoute.value = true;
  }
  store2.title = "รายงานการ Service/PM";
  if (isRoute.value) {
    custptype = route.params.custptype;
    custpcode = route.params.custpcode;
    year.value = route.params.year;
    month.value = route.params.month;
    type.value = route.params.type;
    await getDCSInfo();
    await search();
  }
});
const serverOptions = ref({
  page: 1,
  rowsPerPage: 100,
  sortBy: "sv_no",
  sortType: "asc",
});

const loadFromServer = async () => {
  loading.value = true;
  try {
    let rs = await api.get(
      `/paperless/v1/getJob/${custptype}/${custpcode}/${type.value}/${year.value}/${month.value}/${serverOptions.value.page}/${serverOptions.value.rowsPerPage}/${serverOptions.value.sortBy}/${serverOptions.value.sortType}`
    );
    items.value = rs.data.data;
    serverItemsLength.value = rs.data.totals;
    if (serverItemsLength.value == 0) {
      okAlert("ไม่พบข้อมูล");
    }
  } catch (err) {
    errAlert(err);
  }
  loading.value = false;
};
</script>
<style>
.card:hover{
  background-color: #ddd;
  cursor:pointer;
}
.line {
  width: 100%;
  height: 1px;
  border-bottom: 1px dashed #ddd;
  margin: 40px 0;
}
@media screen and (max-width: 767px) {
  /* table th,
	table td {
		max-width: 767;
		width: 100%;
	} */

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
  /* table tbody tr > *:first-child {
		
		background-color: #212529;
		color: white;
		text-align: left;
	} */
  table tbody tr > td > span:before {
    content: attr(data-label) "\003A\00a0\00a0";
    float: left;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 1em;
  }
}
</style>
