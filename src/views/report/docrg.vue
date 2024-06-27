<template>
  <div class="container-fluid mx-0 px-0" id="print">
    <table
      class="table table-bordered tbrep1 bg-white mx-auto caption-top"
      v-if="!isHide"
    >
      <thead>
        <tr>
          <th colspan="6" class="p-0 m-0">
            <div
              class="float-start fw-bold noprint"
              style="cursor: pointer"
              @click="back()"
              v-if="!isHide"
            >
              <span><i class="fa-solid fa-left-long"></i>&nbsp;&nbsp;</span>
            </div>

            <div>
              <div class="text-center fw-bold">ใบรายงานการบำรุงรักษาระบบคอมพิวเตอร์</div>
              <div class="text-center fw-bold">
                {{ contract?.contract_name }} เลขที่สัญญา {{ contract?.contract_no_cust }}
              </div>
              <div class="float-start fw-bold" v-if="!isHide">
                ชื่อหน่วยงาน: <span>{{ rg_desc?.rg_desc }}</span>
              </div>
              <div class="float-end fw-bold" v-if="!isHide">
                เดือน{{ mmTh?.text }} <span>ปี {{ yyTh?.text }}</span>
              </div>
            </div>
          </th>
        </tr>
        <tr>
          <th colspan="6" class="p-0 m-0" style="border:1px solid #c7c5c5 !important">
            <table class="table p-0 m-0 w-100 tbrep2">
              <tbody class="fw-bold bg-info bg-gradient text-white">
                <tr>
                  <th width="2%" class="text-center">ลำดับ</th>
                  <th width="35%" class="text-center">รายละเอียด</th>
                  <th width="21%" class="text-center">เกณฑ์ที่กำหนด</th>
                  <th width="30%" class="text-center" colspan="2">การปฏิบัติ</th>
                  <th width="12%" class="text-center">หมายเหตุ</th>
                </tr>
              </tbody>
            </table>
          </th>
        </tr>
      </thead>
      <tbody v-for="(doc, index) in docs" :key="index">
        <tr>
          <td align="center" width="5%">{{ index + 1 }}</td>
          <td class="fw-bold" width="34%">
            {{ doc.ned_name_display }}
            <span v-if="doc.brand">ยี่ห้อ {{ doc.brand }}</span>
            <span v-if="doc.serie">รุ่น {{ doc.serie }}</span>
          </td>
          <td class="fw-bold" width="19%">ทั้งหมด {{ doc.vo }} ชุด</td>
          <td width="16%"></td>
          <td width="16%"></td>
          <td width="11%"></td>
        </tr>

        <tr>
          <td></td>
          <td>- ตรวจสอบสภาพเครื่อง</td>
          <td>เครื่องไม่ชำรุดเสียหาย</td>
          <td>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="checkbox"
                :name="'opt1-' + index"
                :id="'opt1-' + index + '-' + 1"
                :value="1"
              />
              <label class="form-check-label pt-1" :for="'opt1-' + index + '-' + 1"
                >ไม่ชำรุด</label
              >
            </div>
          </td>
          <td>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="checkbox"
                :name="'opt1-' + index"
                :id="'opt1-' + index + '-' + 2"
                :value="2"
              />
              <label class="form-check-label pt-1" :for="'opt1-' + index + '-' + 2"
                >ชำรุด</label
              >
            </div>
          </td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>- ทำความสะอาดตัวเครื่อง</td>
          <td>ต้องไม่มีฝุ่น</td>
          <td>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="checkbox"
                :name="'opt2-' + index"
                :id="'opt2-' + index + '-' + 1"
                :value="1"
              />
              <label class="form-check-label pt-1" :for="'opt2-' + index + '-' + 1"
                >สะอาด</label
              >
            </div>
          </td>
          <td>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="checkbox"
                :name="'opt2-' + index"
                :id="'opt2-' + index + '-' + 2"
                :value="2"
              />
              <label class="form-check-label pt-1" :for="'opt2-' + index + '-' + 2"
                >ไม่สะอาด</label
              >
            </div>
          </td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>- ทดสอบการทำงานของเครื่อง</td>
          <td>เครื่องสามารถทำงานได้ปกติ</td>
          <td>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="checkbox"
                :name="'opt3-' + index"
                :id="'opt3-' + index + '-' + 1"
                :value="1"
              />
              <label class="form-check-label pt-1" :for="'opt3-' + index + '-' + 1"
                >ใช้งานได้ปกติ</label
              >
            </div>
          </td>
          <td>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="checkbox"
                :name="'opt3-' + index"
                :id="'opt3-' + index + '-' + 2"
                :value="2"
              />
              <label class="form-check-label pt-1" :for="'opt3-' + index + '-' + 2"
                >ใช้งานไม่ได้</label
              >
            </div>
          </td>
          <td></td>
        </tr>
      </tbody>
    </table>
    
    
    <div class="footer w-100 mt-5 p-0">
        <div class="w-100" style="height:100px;">&nbsp;</div>
        <div class="text-center fw-bold mx-auto w-75">ลงชื่อ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ประธานกรรมการ</div>
        <div class="text-center ">(&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)<br>จพง.ปค.ชก</div>
        <br><br>
        <table class="w-100 mx-auto">
            <tbody>
                <tr>
                    <td align="center">
                        <div class="text-center fw-bold">ลงชื่อ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; กรรมการ</div>
                        <div class="text-center ">(&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)<br>จ.ปค.ชง.</div>
                    </td>
                    <td align="center">
                        <div class="text-center fw-bold">ลงชื่อ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; กรรมการ</div>
                        <div class="text-center ">(&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)<br>จ.ปค.ชง.</div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="w-100 mx-auto text-center noprint">
      <button v-if="!isHide" class="btn btn-primary btn-sm" @click="print()">
        พิมพ์
      </button>
    </div>
    <div v-if="isHide" class="alert alert-primary w-25 mx-auto text-center">
      กำลังประมวลผล......
    </div>
  </div>
</template>
<style>
.tbrep1,
.tbrep2 {
  font-size: 12px;
  border-collapse: collapse;
}
.link {
  cursor: pointer;
  font-size: 12px !important;
}
.footer{
    display:none;
}
@media print {
  header {
    position: fixed;
    top: -15px;
    left: 5px;
    right: 5px;
  }

  body * {
    visibility: hidden;
  }

  #print * {
    /* force-browsers-to-print-background */
    -webkit-print-color-adjust: exact !important;
    visibility: visible;
  }
  #print {
    position: absolute;
    top: 10px;
    left: 0px !important;
  }
  #print .noprint {
    visibility: hidden;
    display: none;
  }
  
  tbody td,
  tbody tr {
    border-bottom-color: #fff;
    border-bottom-style: none;
    border-bottom-width: 0;
    border-top-color: #fff;
    border-top-style: none;
    border-top-width: 0;
  }
  .tbrep1{
    width:99% !important;
  }
  .tbrep1 thead tr {
    border: 0 none #fff;
  }
  /* .tbrep2 tbody tr {
    border: 1 solid #c7c5c5;
  } */

  .tbrep1 tbody td,
  .tbrep1 tbody tr {
    border-left-color: #c7c5c5 !important;
    border-left-style: solid !important;
    border-left-width: 1px !important;
    border-right-color: #c7c5c5 !important;
    border-right-style: solid !important;
    border-right-width: 1px !important;
  }
  tbody:nth-last-child(1) tr:nth-last-child(1) {
    border-bottom-color: #c7c5c5;
    border-bottom-style: solid;
    border-bottom-width: 1;
  }
  /* .tbrep1  thead tr:nth-child(2) th:nth-child(1) {
    border: 1 solid #c7c5c5 !important;
  } */
  .footer {
    position: static; /* <-- Key line */
    font-size:12px;
    display:inline;
  }
  @page {
    size: "A4";
    margin-top: 7mm;
    margin-bottom: 5mm;
    margin-left: 8.128mm !important;
    margin-right: 8.128mm !important;
    counter-increment: page;
    counter-reset: page 1;
    @top-right {
      content: "Page " counter(page) " of " counter(pages);
    }
  }    
  
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
const {
  regions,
  getDoc,
  reportStore,
  router,
  route,
  authStore,
  months,
  years,
} = useReport();
const isHide = ref(true);
const docs = ref([]);
const rg = ref("");
const rg_desc = ref([]);
const back = () => {
  router.push({ path: `/report/main/` + Date.now() });
};
const mmTh = ref(null);
const yyTh = ref(null);
const contract = ref({});
onMounted(async () => {
  mmTh.value = months.value.filter((it) => it.id == props.month)[0];
  yyTh.value = years.value.filter((it) => it.id == props.year)[0];
  rg.value = route.params.rg;
  console.log(rg);
  reportStore.isLoading = true;
  let tmp = await getDoc(props.contractno, rg.value);
  docs.value = tmp.data;
  contract.value = tmp.contract;
  console.log(tmp);
  isHide.value = false;
  reportStore.isLoading = false;
  rg_desc.value = regions.value.filter((it) => it.rgid == Number(6))[0];
});
const print = () => {
  window.scrollTo(0, 0);
  setTimeout(() => {
    window.print();
  }, 2000);
};
</script>
