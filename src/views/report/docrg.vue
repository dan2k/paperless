<template>
  <div class="container-fluid mx-0 px-0" id="print">
    <div
      class="float-start fw-bold noprint"
      style="cursor: pointer"
      @click="back()"
      v-if="!isHide"
    >
      <span><i class="fa-solid fa-left-long"></i>&nbsp;&nbsp;</span>
    </div>
    <div class="float-start fw-bold" v-if="!isHide">
      ชื่อหน่วยงาน: <span>{{ rg_desc?.rg_desc }}</span>
    </div>
    <div class="float-end fw-bold" v-if="!isHide">
      เดือน{{ mmTh?.text }} <span>ปี {{ yyTh?.text }}</span>
    </div>

    <table class="table table-bordered tbrep bg-white mx-auto caption-top" v-if="!isHide">
      <thead class="fw-bold bg-info bg-gradient text-white">
        <tr>
          <th width="2%" class="text-center">ลำดับ</th>
          <th width="35%">รายละเอียด</th>
          <th width="21%" class="text-center">เกณฑ์ที่กำหนด</th>
          <th width="30%" class="text-center" colspan="2">การปฏิบัติ</th>
          <th width="15%" class="text-center">หมายเหตุ</th>
        </tr>
      </thead>
      <tbody v-for="(doc, index) in docs" :key="index">
        <tr>
          <td align="center">{{ index + 1 }}</td>
          <td class="fw-bold">
            {{ doc.ned_name_display }}
            <span v-if="doc.brand">ยี่ห้อ {{ doc.brand }}</span>
            <span v-if="doc.serie">รุ่น {{ doc.serie }}</span>
          </td>
          <td class="fw-bold">ทั้งหมด {{ doc.vo }} ชุด</td>
          <td></td>
          <td></td>
          <td></td>
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
    <div class="w-100 mx-auto text-center noprint">
      <!-- <button v-if="!isHide" class="btn btn-primary btn-sm" @click="generatePDF2()">
        print
      </button> -->
      <button v-if="!isHide" class="btn btn-primary btn-sm" @click="print()">
        พิมพ์
      </button>
    </div>
    <!-- <div id="pdf" style="font-family: sarabun" class="mainx noprint">
      <div class="divTable">
        <div class="divTableHeading">
          <div class="divTableRow hhead">
            <div class="divTableHead" style="border-right-width: 0px;border-bottom-width: 0px;text-align:center">ลำดับที่</div>
            <div class="divTableHead" style="border-right-width: 0px;border-bottom-width: 0px;text-align:center">รายละเอียด</div>
            <div class="divTableHead" style="border-right-width: 0px;border-bottom-width: 0px;text-align:center">เกณฑ์ที่กำหนด</div>
            <div class="divTableHead" style="border-right-width: 0px;border-bottom-width: 0px;text-align:center">การปฏิบัติ</div>
            <div class="divTableHead" style="border-bottom-width: 0px;text-align:center">หมายเหตุ</div>
          </div>
        </div>
        <div class="divTableBody">
          <div class="divTableRow hhead" >
            <div class="divTableCell" style="border-right-width: 0px;border-bottom-width: 0px;text-align:center">1</div>
            <div class="divTableCell" style="border-right-width: 0px;border-bottom-width: 0px;">
              เครื่องคอมพิวเตอร์โน้ตบุ๊ก สำหรับงานประมวลผล ยี่ห้อ Lenovo รุ่น V330
            </div>
            <div class="divTableCell" style="border-right-width: 0px;border-bottom-width: 0px;">ทั้งหมด 80 ชุด</div>
            <div class="divTableCell" style="border-right-width: 0px;border-bottom-width: 0px;">
              <div class="divTable" style="width:100%;height:100%;">
                <div class="divTableBody">
                  <div class="divTableRow">
                    <div class="divTableCell" style="width:50%;border-width:0px;border-right-width:1px;"></div>
                    <div class="divTableCell" style="width:50%;border-width:0px;"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="divTableCell" style="border-bottom-width: 0px;">&nbsp;</div>
          </div>
          <div class="divTableRow">
            <div class="divTableCell" style="border-right-width: 0px;border-bottom-width: 0px;">&nbsp;</div>
            <div class="divTableCell" style="border-right-width: 0px;border-bottom-width: 0px;">&nbsp;- ตรวจสอบสภาพเครื่อง</div>
            <div class="divTableCell" style="border-right-width: 0px;border-bottom-width: 0px;">&nbsp;เครื่องไม่ชำรุดเสียหาย</div>
            <div class="divTableCell" style="border-right-width: 0px;border-bottom-width: 0px;">
              <div class="divTable" style="width:100%;height:100%;">
                <div class="divTableBody">
                  <div class="divTableRow">
                    <div class="divTableCell" style="width:50%;border-width:0px;border-right-width:1px;"> ☐ ไม่ชำรุด</div>
                    <div class="divTableCell" style="width:50%;border-width:0px;"> ☐ ชำรุด</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="divTableCell" style="border-bottom-width: 0px;">&nbsp;</div>
          </div>
          <div class="divTableRow">
            <div class="divTableCell" style="border-right-width: 0px;border-bottom-width: 0px;">&nbsp;</div>
            <div class="divTableCell" style="border-right-width: 0px;border-bottom-width: 0px;">&nbsp;- ทำความสะอาดตัวเครื่อง</div>
            <div class="divTableCell" style="border-right-width: 0px;border-bottom-width: 0px;">ต้องไม่มีฝุ่น&nbsp;</div>
            <div class="divTableCell" style="border-right-width: 0px;border-bottom-width: 0px;">
                <div class="divTable" style="width:100%;height:100%;">
                <div class="divTableBody">
                  <div class="divTableRow">
                    <div class="divTableCell" style="width:50%;border-width:0px;border-right-width:1px;"> ☐ สะอาด</div>
                    <div class="divTableCell" style="width:50%;border-width:0px;"> ☐ ไม่สะอาด</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="divTableCell" style="border-bottom-width: 0px;">&nbsp;</div>
          </div>
          <div class="divTableRow">
            <div class="divTableCell" style="border-right-width: 0px;border-bottom-width: 0px;">&nbsp;</div>
            <div class="divTableCell" style="border-right-width: 0px;border-bottom-width: 0px;">- ทดสอบการทำงานของเครื่อง&nbsp;</div>
            <div class="divTableCell" style="border-right-width: 0px;border-bottom-width: 0px;">เครื่องสามารถใช้งานได้ตามปกติ&nbsp;</div>
            <div class="divTableCell" style="border-right-width: 0px;border-bottom-width: 0px;">
              <div class="divTable" style="width:100%;height:100%;">
                <div class="divTableBody">
                  <div class="divTableRow">
                    <div class="divTableCell" style="width:50%;border-width:0px;border-right-width:1px;"> ☐ ใช้งานได้ปกติ</div>
                    <div class="divTableCell" style="width:50%;border-width:0px;"> ☐ ใช้งานไม่ได้</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="divTableCell" style="border-bottom-width: 0px;">&nbsp;</div>
          </div>
          <div class="divTableRow hhead" >
            <div class="divTableCell" style="border-right-width: 0px;border-bottom-width: 0px;text-align:center">2</div>
            <div class="divTableCell" style="border-right-width: 0px;border-bottom-width: 0px;">
              เครื่องคอมพิวเตอร์โน้ตบุ๊ก สำหรับงานประมวลผล ยี่ห้อ Lenovo รุ่น V330
            </div>
            <div class="divTableCell" style="border-right-width: 0px;border-bottom-width: 0px;">ทั้งหมด 80 ชุด</div>
            <div class="divTableCell" style="border-right-width: 0px;border-bottom-width: 0px;">
              <div class="divTable" style="width:100%;height:100%;">
                <div class="divTableBody">
                  <div class="divTableRow">
                    <div class="divTableCell" style="width:50%;border-width:0px;border-right-width:1px;"></div>
                    <div class="divTableCell" style="width:50%;border-width:0px;"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="divTableCell" style="border-bottom-width: 0px;">&nbsp;</div>
          </div>
          <div class="divTableRow">
            <div class="divTableCell" style="border-right-width: 0px;border-bottom-width: 0px;">&nbsp;</div>
            <div class="divTableCell" style="border-right-width: 0px;border-bottom-width: 0px;">&nbsp;- ตรวจสอบสภาพเครื่อง</div>
            <div class="divTableCell" style="border-right-width: 0px;border-bottom-width: 0px;">&nbsp;เครื่องไม่ชำรุดเสียหาย</div>
            <div class="divTableCell" style="border-right-width: 0px;border-bottom-width: 0px;">
              <div class="divTable" style="width:100%;height:100%;">
                <div class="divTableBody">
                  <div class="divTableRow">
                    <div class="divTableCell" style="width:50%;border-width:0px;border-right-width:1px;"> ☐ ไม่ชำรุด</div>
                    <div class="divTableCell" style="width:50%;border-width:0px;"> ☐ ชำรุด</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="divTableCell" style="border-bottom-width: 0px;">&nbsp;</div>
          </div>
          <div class="divTableRow">
            <div class="divTableCell" style="border-right-width: 0px;border-bottom-width: 0px;">&nbsp;</div>
            <div class="divTableCell" style="border-right-width: 0px;border-bottom-width: 0px;">&nbsp;- ทำความสะอาดตัวเครื่อง</div>
            <div class="divTableCell" style="border-right-width: 0px;border-bottom-width: 0px;">ต้องไม่มีฝุ่น&nbsp;</div>
            <div class="divTableCell" style="border-right-width: 0px;border-bottom-width: 0px;">
                <div class="divTable" style="width:100%;height:100%;">
                <div class="divTableBody">
                  <div class="divTableRow">
                    <div class="divTableCell" style="width:50%;border-width:0px;border-right-width:1px;"> ☐ สะอาด</div>
                    <div class="divTableCell" style="width:50%;border-width:0px;"> ☐ ไม่สะอาด</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="divTableCell" style="border-bottom-width: 0px;">&nbsp;</div>
          </div>
          <div class="divTableRow">
            <div class="divTableCell" style="border-right-width: 0px;border-bottom-width: 0px;">&nbsp;</div>
            <div class="divTableCell" style="border-right-width: 0px;border-bottom-width: 0px;">- ทดสอบการทำงานของเครื่อง&nbsp;</div>
            <div class="divTableCell" style="border-right-width: 0px;border-bottom-width: 0px;">เครื่องสามารถใช้งานได้ตามปกติ&nbsp;</div>
            <div class="divTableCell" style="border-right-width: 0px;border-bottom-width: 0px;">
              <div class="divTable" style="width:100%;height:100%;">
                <div class="divTableBody">
                  <div class="divTableRow">
                    <div class="divTableCell" style="width:50%;border-width:0px;border-right-width:1px;"> ☐ ใช้งานได้ปกติ</div>
                    <div class="divTableCell" style="width:50%;border-width:0px;"> ☐ ใช้งานไม่ได้</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="divTableCell" style="border-bottom-width: 0px;">&nbsp;</div>
          </div>
        </div>
      </div>
    </div> -->
    <div v-if="isHide" class="alert alert-primary w-25 mx-auto text-center">
      กำลังประมวลผล......
    </div>
  </div>
</template>
<style>
/* .mainx {
  position: relative;
  font-size: 6px;
  width: 447px;
  margin: 0px 0px;
  padding: 12px;
  background-color: #fff;
}
.divTable{
	display: table;
	width: 100%;
    font-size:6px;
}
.divTableRow {
	display: table-row;
}
.hhead{
    height:20px;
    
}
.divTableCell, .divTableHead {
	border: 1px solid #999999;
	display: table-cell;
	padding: 0px;
    margin:0px;
    height:12px;
    vertical-align: middle;
}
.divTableHeading {
	background-color: #EEE;
	display: table-header-group;
	font-weight: bold;
}
.divTableFoot {
	background-color: #EEE;
	display: table-footer-group;
	font-weight: bold;
}
.divTableBody {
	display: table-row-group;
} */

/* ############################################# */
@media print {
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
  tbody td,tbody  tr {
	border-bottom-color: #fff;
	border-bottom-style: none;
	border-bottom-width: 0;
	border-top-color: #fff;
	border-top-style: none;
	border-top-width: 0;
 }
 tbody:nth-last-child(1)  tr:nth-last-child(1) {
	border-bottom-color: #dee2e6;
	border-bottom-style: solid;
	border-bottom-width: 1;
 }
  @page {
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
/*################################################*/
.tbrep {
  font-size: 12px;
  border-collapse: collapse;
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
const {
  regions,
  getDoc,
  reportStore,
  router,
  route,
  authStore,
  months,
  years,
  generatePDF2,
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
onMounted(async () => {
  mmTh.value = months.value.filter((it) => it.id == props.month)[0];
  yyTh.value = years.value.filter((it) => it.id == props.year)[0];
  rg.value = route.params.rg;
  console.log(rg);
  reportStore.isLoading = true;
  docs.value = await getDoc(props.contractno, rg.value);
  isHide.value = false;
  reportStore.isLoading = false;
  rg_desc.value = regions.value.filter((it) => it.rgid == Number(6))[0];
});
const print = () => {
  window.scrollTo(0,0);
  setTimeout(() => {
      window.print();
  }, 2000);
};
</script>
