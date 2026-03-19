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
            <table class="table p-0 m-0 w-100 tbrep2" @click.stop ref="myTable">
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
          <td >
            <div :disabled="false" class="form-check form-check-inline">
              <input
                @click.prevent
                class="form-check-input"
                type="checkbox"
                :name="'opt1-' + index"
                :id="'opt1-' + index + '-' + 1"
                :value="1"
                checked
              />
              <label class="form-check-label pt-1" :for="'opt1-' + index + '-' + 1"
                >ไม่ชำรุด</label
              >
            </div>
          </td>
          <td>
            <div class="form-check form-check-inline">
              <input
                @click.prevent
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
                @click.prevent
                class="form-check-input"
                type="checkbox"
                :name="'opt2-' + index"
                :id="'opt2-' + index + '-' + 1"
                :value="1"
                checked
              />
              <label class="form-check-label pt-1" :for="'opt2-' + index + '-' + 1"
                >สะอาด</label
              >
            </div>
          </td>
          <td>
            <div class="form-check form-check-inline">
              <input
                @click.prevent
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
                @click.prevent
                class="form-check-input"
                type="checkbox"
                :name="'opt3-' + index"
                :id="'opt3-' + index + '-' + 1"
                :value="1"
                checked
              />
              <label class="form-check-label pt-1" :for="'opt3-' + index + '-' + 1"
                >ใช้งานได้ปกติ</label
              >
            </div>
          </td>
          <td>
            <div class="form-check form-check-inline">
              <input
                @click.prevent
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

      <!-- ===== CHANGED: tfoot เปลี่ยนให้แสดง footer ตาม footerMode ===== -->
      <tfoot class="footer-tfoot">
        <tr>
          <td colspan="6" style="border:none; padding-top: 20px;">
            <div class="footer w-100 p-0">
              <div class="w-100" style="height:30px;">&nbsp;</div>

              <!-- ===== CHANGED: footer โหมดคณะกรรมการ (เดิม) — แสดงเมื่อ footerMode !== 'receive' ===== -->
              <template v-if="footerMode !== 'receive'">
                <div class="text-center fw-bold mx-auto w-75">ลงชื่อ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ประธานกรรมการ</div>
                <div v-if="isShowCommittee" class="text-center">(&nbsp;{{ officers.data?.filter((ob)=>ob.level==1)[0]?.th_fullname }}&nbsp;)<br>{{officers.data?.filter((ob)=>ob.level==1)[0]?.position_desc}}</div>
                <div v-else class="text-center">(&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)<br></div>
                <br><br>
                <table class="w-100 mx-auto footer-sig-table" style="border:none !important; border-collapse:collapse;">
                  <tbody>
                    <tr>
                      <td align="center" style="border:none !important; padding:8px;">
                        <div class="text-center fw-bold">ลงชื่อ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; กรรมการ</div>
                        <div v-if="isShowCommittee" class="text-center">(&nbsp;{{ officers.data?.filter((ob)=>ob.level==2)[0]?.th_fullname }}&nbsp;)<br>{{officers.data?.filter((ob)=>ob.level==2)[0]?.position_desc}}</div>
                        <div v-else class="text-center">(&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)<br></div>
                      </td>
                      <td align="center" style="border:none !important; padding:8px;">
                        <div class="text-center fw-bold">ลงชื่อ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; กรรมการ</div>
                        <div v-if="isShowCommittee" class="text-center">(&nbsp;{{ officers.data?.filter((ob)=>ob.level==3)[0]?.th_fullname }}&nbsp;)<br>{{officers.data?.filter((ob)=>ob.level==3)[0]?.position_desc}}</div>
                        <div v-else class="text-center">(&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)<br></div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </template>

              <!-- ===== CHANGED: footer โหมดตรวจรับ (ใหม่) — แสดงเมื่อ footerMode === 'receive' ===== -->
              <template v-else>
                <table class="w-100 mx-auto footer-sig-table" style="border:none !important; border-collapse:collapse;">
                  <tbody>
                    <tr>
                      <!-- ===== CHANGED: คอลัมน์ซ้าย ผู้ดำเนินการ ===== -->
                      <td align="left" style="border:none !important; padding:8px;">
                        <div class="text-center fw-bold">
                          ลงชื่อ............................................ผู้ดำเนินการ
                        </div>
                        <div class="">
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(..............................................)
                        </div>
                        <div class="text-center">บริษัท คอนโทรล ดาต้า (ประเทศไทย) จำกัด</div>
                      </td>
                      <!-- ===== CHANGED: คอลัมน์ขวา ผู้ตรวจรับงาน ===== -->
                      <td align="left" style="border:none !important; padding:8px;">
                        <div class="text-center fw-bold">
                          ลงชื่อ............................................ผู้ตรวจสอบ
                        </div>
                        <div class="">
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(..............................................)
                        </div>
                        <div class="text-center">
                          &nbsp;
                        </div>
                        <div class="text-center">วันที่ ............/............/............&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </template>

            </div>
          </td>
        </tr>
      </tfoot>
      <!-- ===== END CHANGED ===== -->

    </table>

    <!-- footer สำหรับแสดงบนหน้าจอ (ไม่พิมพ์) -->
    <div class="w-100 mx-auto text-center d-flex justify-content-center align-items-center gap-3 mb-3 noprint d-print-none">
      <!-- ปุ่มพิมพ์ -->
      <button v-if="!isHide" class="btn btn-primary btn-sm" @click="print()">
        <i class="bi bi-printer"></i> พิมพ์
      </button>

      <!-- ===== CHANGED: เปลี่ยนจาก checkbox switch เป็น radio group 3 ตัวเลือก ===== -->
      <div class="d-flex align-items-center gap-3">

        <!-- Radio: ไม่แสดงรายชื่อ (ค่าเริ่มต้น) -->
        <div class="form-check mb-0">
          <input
            class="form-check-input"
            type="radio"
            id="modeNone"
            value="none"
            v-model="footerMode"
            style="cursor: pointer;"
          />
          <label class="form-check-label fw-bold" for="modeNone" style="cursor: pointer;">
            ไม่แสดงรายชื่อ
          </label>
        </div>

        <!-- ===== CHANGED: Radio: แสดงรายชื่อคณะกรรมการ (แทน checkbox เดิม) ===== -->
        <div class="form-check mb-0">
          <input
            class="form-check-input"
            type="radio"
            id="modeCommittee"
            value="committee"
            v-model="footerMode"
            style="cursor: pointer;"
          />
          <label class="form-check-label fw-bold" for="modeCommittee" style="cursor: pointer;">
            แสดงรายชื่อคณะกรรมการ
          </label>
        </div>

        <!-- ===== CHANGED: Radio: ตรวจรับ (ใหม่) ===== -->
        <div class="form-check mb-0">
          <input
            class="form-check-input"
            type="radio"
            id="modeReceive"
            value="receive"
            v-model="footerMode"
            style="cursor: pointer;"
          />
          <label class="form-check-label fw-bold" for="modeReceive" style="cursor: pointer;">
            ตรวจรับ
          </label>
        </div>

      </div>
      <!-- ===== END CHANGED ===== -->

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

  .tbrep1 {
    width: 99% !important;
    border: none !important;
  }
  .tbrep1 thead tr {
    border: 0 none #fff;
  }

  .tbrep1 tbody td {
    border-top: none !important;
    border-bottom: none !important;
    border-left: 1px solid #c7c5c5 !important;
    border-right: 1px solid #c7c5c5 !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }
  .tbrep1 tbody tr {
    border-top: none !important;
    border-bottom: none !important;
  }
  .tbrep1 tbody tr:first-of-type td {
    padding-top: 8px !important;
  }
  .tbrep1 tbody tr:first-child > td {
    border-top: 1px solid #c7c5c5 !important;
  }
  .tbrep1 tbody {
    border-bottom: 1px solid #c7c5c5 !important;
    border-left: 1px solid #c7c5c5 !important;
    border-right: 1px solid #c7c5c5 !important;
  }

  .tbrep1 tfoot,
  .tbrep1 tfoot td,
  .tbrep1 tfoot tr {
    border: none !important;
    background: transparent !important;
  }

  .footer-tfoot {
    display: table-row-group !important;
    page-break-inside: avoid !important;
    break-inside: avoid !important;
  }

  table.footer-sig-table,
  table.footer-sig-table > tbody,
  table.footer-sig-table > tbody > tr,
  table.footer-sig-table > tbody > tr > td {
    border: none !important;
    border-width: 0 !important;
    border-style: none !important;
    border-color: transparent !important;
    box-shadow: none !important;
    outline: none !important;
    background: transparent !important;
  }

  .footer {
    position: static;
    font-size: 12px;
    display: block;
    page-break-inside: avoid !important;
    break-inside: avoid !important;
  }

  @page {
    size: A4;
    margin-top: 15mm;
    margin-bottom: 5mm;
    margin-left: 8.128mm;
    margin-right: 8.128mm;
    @top-right {
      margin-top: 3mm;
      font-size: 12px;
      font-weight: bold;
      content: counter(page) "/" counter(pages);
    }
  }
}
</style>

<script setup>
import { ref, defineProps, onMounted, computed } from "vue"; // CHANGED: เพิ่ม computed import
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
  getOfficer,
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
const officers = ref([]);
const myTable = ref(null);

// ===== CHANGED: แทนที่ isShowCommittee (boolean) ด้วย footerMode (string) =====
// ค่าที่เป็นไปได้: 'none' | 'committee' | 'receive'
const footerMode = ref('none');

// ===== CHANGED: computed เพื่อให้ v-if="isShowCommittee" ใน template ยังทำงานได้ =====
const isShowCommittee = computed(() => footerMode.value === 'committee');
// ===== END CHANGED =====

onMounted(async () => {
  mmTh.value = months.value.filter((it) => it.id == props.month)[0];
  yyTh.value = years.value.filter((it) => it.id == props.year)[0];
  rg.value = route.params.rg;
  console.log(rg.value);
  reportStore.isLoading = true;
  let tmp = await getDoc(props.contractno, rg.value);
  docs.value = tmp.data;
  contract.value = tmp.contract;
  console.log(tmp);
  officers.value = await getOfficer(rg.value, props.month, props.year);
  isHide.value = false;
  reportStore.isLoading = false;
  rg_desc.value = regions.value.filter((it) => it.rgid == Number(rg.value))[0];
});

const print = () => {
  window.print();
};
</script>