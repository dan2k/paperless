<template>
  <filter-bar
    v-model:month="month"
    v-model:year="year"
    v-model:type="type"
    @search="search()"
  />
  <div class="row justify-content-md-center" v-if="serverItemsLength>0">
    <div class="col-8">
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
          <span  :data-label="headers[0].text">{{ item.sv_no }}</span>
        </template>
        <template #item-sv_date="item">
          <span  :data-label="headers[1].text">{{ item.sv_date }}</span>
        </template>
        <template #item-sv_time="item">
          <span  :data-label="headers[2].text">{{ item.sv_time }}</span>
        </template>
        <template #item-thiname="item">
          <span  :data-label="headers[3].text">{{ item.thiname }}</span>
        </template>
      </datatable>
    </div>
    <div class="col-8">
      <span class="float-end">รวม {{ serverItemsLength }} รายการ</span>
    </div>
  </div>
</template>
<script setup>
import FilterBar from "../components/filterbar.vue";
import { onMounted, ref } from "vue";
import { useAppStore } from "@/store";
import { useRouter } from "vue-router";
import { api, errAlert,okAlert } from "@/helpers";
import datatable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";
import { useAuthStore } from "../store";
const router = useRouter();
let date = new Date();
let d = date.toJSON();
d = d.split("T");
d = d[0];
d = d.split("-");
const store=useAuthStore();
const store2 = useAppStore();
const month = ref(d[1]);
const year = ref(d[0]);
const type = ref(0);
const search = async () => {
  await loadFromServer();
};
const headers = [
  { text: "หมายเลขปัญหา", value: "sv_no", width: 120 },
  { text: "วันที่", value: "sv_date" },
  { text: "เวลา", value: "sv_time" },
  { text: "ผู้รับผิดชอบ", value: "thiname" },
];

const items = ref([]);
onMounted(() => {
  store2.title = "รายงานการ Service/PM";
});
const serverOptions = ref({
  page: 1,
  rowsPerPage: 100,
  sortBy: "sv_no",
  sortType: "asc",
});
const loading = ref(false);
const serverItemsLength = ref(0);

const custptype=store.userData.ses_placetype;
const custpcode=store.userData.ses_placecode;

const loadFromServer = async () => {
  loading.value = true;
  try {
    let rs = await api.get(
      `/paperless/v1/getJob/${custptype}/${custpcode}/${type.value}/${year.value}/${month.value}/${serverOptions.value.page}/${serverOptions.value.rowsPerPage}/${serverOptions.value.sortBy}/${serverOptions.value.sortType}`
    );
    items.value = rs.data.data;
    serverItemsLength.value = rs.data.totals;
    if(serverItemsLength.value==0){
        okAlert("ไม่พบข้อมูล")
    }
  } catch (err) {
    errAlert(err);
  }
  loading.value = false;
};
</script>
<style >
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
  
  table tr td{width:100% !important;}
	table thead {
		display: none;
	}
	table tr > * {
		display: block;
    width:100%;
	}
	/* table tbody tr > *:first-child {
		
		background-color: #212529;
		color: white;
		text-align: left;
	} */
	table tbody tr > td>span:before {
		content: attr(data-label) "\003A\00a0\00a0";
		float: left;
		text-transform: uppercase;
		font-weight: bold;
		font-size: 1em;
	}
}
</style>
