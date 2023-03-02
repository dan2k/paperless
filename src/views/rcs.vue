<template>
  <filter-bar
    v-if="!isRoute"
    v-model:month="month"
    v-model:year="year"
    v-model:type="type"
    @search="search()"
  />
  <div class="row justify-content-md-center" v-if="data.length">
    <div class="col-sm-12 col-md-7">
      <h5>
        {{ dcs }}
        <button
          v-if="isRoute"
          @click="$router.push({ path: `/ccs`, query: { type, year, month,rg:$route.query.rg,groupid:$route.query.groupid,cc:$route.query.cc } })"
          type="button"
          class="float-end btn btn-link btn-sm"
        >
          ย้อนกลับ
        </button>
      </h5>
      <ol class="list-group ">
        <li
          v-for="d in data"
          class="list-group-item list-group-item-action d-flex justify-content-between align-items-start"
        >
          <div class="ms-2 me-auto w-100">
            <div class="fw-bold">{{ d.cc }}</div>
            <div>
              {{ d.province_name }}
              <span v-if="d.co > 0" class="float-end"
                >
                <button 
                  type="button" 
                  class="btn btn-link btn-sm"
                  @click="$router.push({path:'/pcs',query:{rg:rg,groupid:group_id,cc:d.cc,type,month,year}})"
                  >ดูรายการ</button></span
              >
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
</template>
<script setup>
import FilterBar from "../components/filterbar.vue";
import { onMounted, ref, computed } from "vue";
import { useAppStore } from "@/store";
import { useRouter ,useRoute} from "vue-router";
import { api, errAlert, okAlert } from "@/helpers";
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
const month = ref(route.query.month??d[1]);
const year = ref(route.query.year??d[0]);
const type = ref(route.query.type??0);
const rg = route.query.rg??store.userData.section_id;
const group_id = route.query.groupid??store.userData.group_id;
// const cust_ptype=store.userData.ses_placetype;
// const cust_pcode=store.userData.ses_placecode;
const data = ref([]);
const dcs = ref(null);
const isRoute=ref(false);
const search = async () => {
  await getSumPcs(rg, group_id, type.value, year.value, month.value);
};
const getDCSInfo = async () => {
  try {
    let rs = await api.get(`/paperless/v1/getDCSInfo/3/${rg}`);
    dcs.value = rs.data.data;
  } catch (err) {
    errAlert(err);
  } 
};
const sums = computed(() => {
  return data.value.reduce((p, it) => p + Number(it.co), 0);
});
onMounted( async () => {
  isRoute.value=route.query.rg?true:false;
  store2.title = "รายงานการ Service/PM";
  await getDCSInfo();
  if(route.query.type && route.query.year){
    await search()
  }
});

const getSumPcs = async (rg, groupid, type, year, month) => {
  try {
    let rs = await api.get(
      `/paperless/v1/getSumPcs/${rg}/${groupid}/${type}/${year}/${month}`
    );
    data.value = rs.data.data;
    console.log(data.value);
  } catch (err) {
    errAlert(err);
  }
};
</script>
<style>
.line {
  width: 100%;
  height: 1px;
  border-bottom: 1px dashed #ddd;
  margin: 40px 0;
}
ol li{
  font-size:14px;
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
