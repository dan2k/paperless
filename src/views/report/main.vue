<template>
  <div class="container-fluid mx-0 px-0">
    <table
      class="table table-bordered tbrep bg-white mx-auto"
      v-if="!isHide"
      id="tbrep"
      ref="tbreb"
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
      <button class="btn btn-primary btn-sm" @click="exportTableToExcel('tbrep')">
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
import XLSX from "xlsx-js-style";
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
const { regions, getEquip, reportStore, router, authStore } = useReport();
const equips = ref([]);
const isHide = ref(true);
const gotoPcs = (rg) => {
  router.push({ path: `/report/pcs/${rg}` });
};
const tbreb = ref(null);
onMounted(async () => {
  reportStore.isLoading = true;
  let level = authStore.userData.sur_level;
  let pageLevel = 1;
  equips.value = await getEquip(props.contractno, level, pageLevel, 0, 0);
  isHide.value = false;
  reportStore.isLoading = false;
});
const openDocRg = (rg) => {
  router.push({ path: `/report/docrg/${rg}` });
};
const exportTableToExcel=(tableID, filename = '')=>{
    var table = document.getElementById(tableID);
    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.table_to_sheet(table);

    // Extract and apply styles
    const range = XLSX.utils.decode_range(ws['!ref']);
    for (let row = range.s.r; row <= range.e.r; row++) {
        for (let col = range.s.c; col <= range.e.c; col++) {
            const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
            if (!ws[cellAddress]) continue;
            const cell = ws[cellAddress];
            const htmlCell = table.rows[row].cells[col];

            // Apply header styles
            if (row === 0) {
                cell.s = {
                    fill: {
                        // fgColor: { rgb: "FF4CAF50" } // Green background
                    },
                    font: {
                        color: { rgb: "FFFFFFFF" } // White font
                    },
                    alignment: {
                        horizontal: 'center'
                    }
                };
            } else {
                cell.s = {
                    alignment: {
                        horizontal: htmlCell.style.textAlign || 'left'
                    }
                };
            }

            // Apply body cell styles if any
            if (htmlCell.style.backgroundColor) {
                cell.s.fill = {
                    fgColor: { rgb: htmlCell.style.backgroundColor.replace('#', 'FF') }
                };
            }
        }
    }

    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, filename ? `${filename}.xlsx` : 'tableData.xlsx');
}
</script>
