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
      <button class="btn btn-primary btn-sm" @click="generateExcel()">
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
import * as ExcelJS from "exceljs";
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

const generateExcel = async () => {
  // สร้าง workbook ใหม่
  const workbook = new ExcelJS.Workbook();
  // สร้าง worksheet ใหม่
  const worksheet = workbook.addWorksheet("Sheet1");
  // เพิ่มข้อมูลลงใน worksheet
  let header = equips.value.cats.map((it) => it.cat_desc);
  header = ["ลำดับที่", "หน่วยงาน", ...header];
  //  console.log({'xxx',header})
  worksheet.addRow(header);
  // กำหนดความกว้างของคอลัมน์ 0 เป็น 20
  worksheet.columns[0].width = 8;
  worksheet.columns[1].width = 30;
  let border = {
    top: { style: "thin", color: { argb: "FF6b6969" } },
    left: { style: "thin", color: { argb: "FF6b6969" } },
    bottom: { style: "thin", color: { argb: "FF6b6969" } },
    right: { style: "thin", color: { argb: "FF6b6969" } },
  };
  let fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FF0dcaf0" },
    bgColor: { argb: "FF0000FF" },
  };
  let alignment = { wrapText: true, vertical: "middle", horizontal: "center" };
  let r = 1;
  equips.value.data.forEach((it) => {
    let tmp = [];
    tmp[0] = r;
    tmp[1] = it.rg_desc;
    equips.value.cats.forEach((it2, i) => {
      tmp[i + 2] = Number(it[it2.cat_id]);
    });
    worksheet.addRow(tmp);
    r++;
  });
  worksheet.eachRow(function (row, rowNumber) {
    if (rowNumber > 1) {
      row.height = 30;
    } else {
      row.fill = fill;
      row.height = 60;
      row.font= { bold: true,color: {'argb': 'FFFFFFFF'}}
    }
    row.eachCell(function (cell, colNumber) {
      cell.border = border;
      cell.alignment = alignment;
      if (colNumber > 2) cell.width = 18;
      if(colNumber>2&&rowNumber>1) cell.numFmt='#,##0';
    });
  });
  let cell=worksheet.getCell('Q1').fill={
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFFFFFFF" },
    bgColor: { argb: "FFFFFFFF" },
  }
  // สร้างไฟล์ excel
  const buffer = await workbook.xlsx.writeBuffer();

  // ดาวน์โหลดไฟล์ excel
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "report.xlsx");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
</script>
