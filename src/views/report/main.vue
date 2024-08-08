<template>
  <div class="container-fluid mx-0 px-0">
    <table
      class="table table-bordered table-hover tbrep bg-white mx-auto"
      v-if="!isHide"
    >
      <thead class="bg-info bg-gradient text-white">
        <tr>
          <th width="3%" class="text-center">ลำดับ</th>
          <th width="10%">หน่วยงาน</th>
          <th
            v-for="cat in equips.cats"
            :key="cat.cat_id"
            :width="72 / equips.cats.length + '%'"
            class="text-center"
          >
            {{ cat.cat_desc }}
          </th>
          <th width="13%" class="text-center">ผู้อนุมัติ</th>
          <th width="2%" class="text-center">#</th>
        </tr>
      </thead>
      <tbody v-if="!isHide">
        <tr v-for="(equip, index) in equips.data" :key="index">
          <td align="center" valign="middle">{{ index + 1 }}</td>
          <td @click="gotoPcs(equip.rg)">
            <span class="btn btn-link link">{{ equip.rg_desc }}</span>
          </td>
          <td v-for="cat in equips.cats" :key="cat.cat_id" align="center" valign="middle">
            {{ equip[cat.cat_id] | 0 }}
          </td>
          <td></td>
          <td align="center" valign="middle">
            <span style="cursor: pointer" @click="openDocRg(equip.rg)"
              ><i class="fa-solid fa-print"></i
            ></span>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="w-100 mx-auto text-center">
      <button v-if="!isHide" class="btn btn-primary btn-sm" @click="generateExcel(equips.data,equips.cats)">
        พิมพ์สรุปจำนวนอุปกรณ์
      </button>
    </div>
    <div v-if="isHide" class="alert alert-primary w-25 mx-auto text-center">
      กำลังประมวลผล......
    </div>
  </div>
</template>
<style scoped>
.tbrep {
  font-size: 12px;
}
.link {
  cursor: pointer;
  font-size: 12px !important;
}
</style>
<script setup>
import { ref, defineProps, onMounted } from "vue";
import { useReport } from "./report.js";
const props = defineProps({
  contractno: {
    type: String,
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
});
const { regions, getEquip, reportStore, router, authStore ,generateExcel} = useReport();
const equips = ref([]);
const isHide = ref(true);
const gotoPcs = (rg) => {
  router.push({ path: `/report/pcs/${rg}` });
};

onMounted(async () => {
  reportStore.isLoading = true;
  let level = authStore.userData.sur_level;
  let rg = authStore.userData.section_id;
  let pageLevel = 1;
  equips.value = await getEquip(props.contractno, level, pageLevel, rg, 0);
  isHide.value = false;
  reportStore.isLoading = false;
});
const openDocRg = (rg) => {
  router.push({ path: `/report/docrg/${rg}` });
};

</script>
