<template>
  <div class="container-fluid mx-0 px-0">
    <div class="float-start fw-bold" style="cursor:pointer" @click="back()" v-if="!isHide"><span><i class="fa-solid fa-left-long"></i>&nbsp;&nbsp;</span></div>
    <div class="float-start fw-bold " v-if="!isHide">
      ชื่อหน่วยงาน: <span>{{ rg_desc?.rg_desc }}</span>
    </div>
    <div class="float-end fw-bold" v-if="!isHide">
      เดือน{{ mmTh?.text }} <span>ปี {{ yyTh?.text }}</span>
    </div>
    <table class="table table-bordered tbrep bg-white mx-auto" v-if="!isHide">
      <thead class="fw-bold bg-info bg-gradient text-white">
        <tr>
          <th width="3%" class="text-center">ลำดับ</th>
          <th width="40%">รายละเอียด</th>
          <th width="20%" class="text-center">เกณฑ์ที่กำหนด</th>
          <th width="20%" class="text-center" colspan="2">การปฏิบัติ</th>
          <th width="17%" class="text-center">หมายเหตุ</th>
        </tr>
      </thead>
      <tbody v-for="(doc, index) in docs" :key="index">
        <tr>
          <td>{{ index + 1 }}</td>
          <td class="fw-bold">{{ doc.ned_name_display }} <span v-if="doc.brand">ยี่ห้อ {{ doc.brand }}</span> <span v-if="doc.serie">รุ่น {{ doc.serie }}</span></td>
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
                <input class="form-check-input" type="radio" v-model="doc.opt1" :name="'opt1-'+index" :id="'opt1-'+index+'-'+1" :value="1" :checked="doc.opt1==1">
                <label class="form-check-label pt-1" :for="'opt1-'+index+'-'+1">ไม่ชำรุด</label>
            </div>
          </td>
          <td>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" v-model="doc.opt1" :name="'opt1-'+index" :id="'opt1-'+index+'-'+2" :value="2" :checked="doc.opt1==2">
                <label class="form-check-label pt-1" :for="'opt1-'+index+'-'+2">ชำรุด</label>
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
                <input class="form-check-input" type="radio" v-model="doc.opt2" :name="'opt2-'+index" :id="'opt2-'+index+'-'+1" :value="1" :checked="doc.opt2==1">
                <label class="form-check-label pt-1" :for="'opt2-'+index+'-'+1">สะอาด</label>
            </div>
          </td>
          <td>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" v-model="doc.opt2" :name="'opt2-'+index" :id="'opt2-'+index+'-'+2" :value="2" :checked="doc.opt2==2">
                <label class="form-check-label pt-1" :for="'opt2-'+index+'-'+2">ไม่สะอาด</label>
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
                <input class="form-check-input" type="radio" v-model="doc.opt3" :name="'opt3-'+index" :id="'opt3-'+index+'-'+1" :value="1" :checked="doc.opt3==1">
                <label class="form-check-label pt-1" :for="'opt3-'+index+'-'+1">ใช้งานได้ปกติ</label>
            </div>
           </td>
          <td>
          <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" v-model="doc.opt3" :name="'opt3-'+index" :id="'opt3-'+index+'-'+2" :value="2" :checked="doc.opt3==2">
                <label class="form-check-label pt-1" :for="'opt3-'+index+'-'+2">ใช้งานไม่ได้</label>
            </div>
          </td>
          <td></td>
        </tr>
      </tbody>
    </table>
    
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
/* input[type=radio] {
    appearance: none;
    background-color: #fff;
    width: 15px;
    height: 15px;
    border: 2px solid #ccc;
    border-radius: 2px;
    display: inline-grid;
    place-content: center; 
  }

input[type=radio]::before {
    content: "";
    width: 10px;
    height: 10px;
    transform: scale(0);
    transform-origin: bottom left;
    background-color: #fff;
    clip-path: polygon(13% 50%, 34% 66%, 81% 2%, 100% 18%, 39% 100%, 0 71%);
}

input[type=radio]:checked::before {
    transform: scale(1.5);
}
input[type=radio]:checked{
    background-color:   #0075FF;
    border: 2px solid #0075FF;
} */
/* Style for the radio button itself */
input[type="radio"] {
  -webkit-appearance: none; /* Remove default appearance */
  appearance: none; /* Remove default appearance */
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid #ccc; /* Optional: Add a border */
  border-radius: 3px; /* Optional: Add rounded corners */
  margin-right: 5px;
  background-color: #fff; /* Optional: Set background color */
  cursor: pointer; /* Set cursor to pointer for clickability */
}

/* Style for the checkmark (only when checked) */
input[type="radio"]:checked {
  background-color: #a9b1a9; /* Set background color when checked */
  border-color: #a9b1a9; /* Set border color when checked */
}

/* Style for the checkmark (only when checked) */
input[type="radio"]:checked::before {
  content: "";
  display: block;
  width: 6px;
  height: 13px;
  border-style: solid;
  border-width: 0 3px 3px 0;
  border-color: #fff;
  transform: rotate(45deg) translate(1px, -7px);
}
label{
    cursor:pointer !important;
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
onMounted(async () => {
  mmTh.value = months.value.filter((it) => it.id == props.month)[0];
  yyTh.value = years.value.filter((it) => it.text == props.year)[0];
  rg.value = route.params.rg;
  reportStore.isLoading = true;
  docs.value = await getDoc(props.contractno, rg.value);
  isHide.value = false;
  reportStore.isLoading = false;
  rg_desc.value = regions.value.filter((it) => it.rgid == Number(6))[0];
});
</script>
