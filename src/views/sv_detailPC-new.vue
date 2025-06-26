<template>
  <div class="container mx-auto">
    <div class="card col-12 col-md-8 mx-auto my-2 py-2 px-2" style="background-color: white">
      <div class="row mt-2">
        <div class="col-12 text-center text-primary">
          <h5>
            <span class="fw-bold">หมายเลขปัญหา:</span>&nbsp;<span class="fst-normal">{{
              detail.sv_no
            }}</span>
          </h5>
        </div>
      </div>
      <div class="line mt-0 my-2"></div>
      <div class="row d-flex justify-content-between">
        <div class="col-12 ps-4 py-1">
          <span class="fw-bold">ชื่อลูกค้า:</span>&nbsp;<span class="fst-normal">{{
            detail.thicust
          }}</span>
        </div>
      </div>
      <div class="row d-flex justify-content-between">
        <div class="col-12 col-md-5 ps-4 py-1">
          <span class="fw-bold">วันที่เวลา รับแจ้ง:</span>&nbsp;<span class="fst-normal"
            >{{ detail.ptype == "P1" ? detail.s_date : detail.ap_date }}
            {{ detail.ptype == "P1" ? detail.s_time : "08:00" }}</span
          >
        </div>
        <div class="col-12 col-md-5 ps-4 py-1">
          <span class="fw-bold">วันที่เวลา นัดหมาย:</span>&nbsp;<span class="fst-normal">
            {{ detail.ap_date }} {{ detail.ap_time }}</span
          >
        </div>
      </div>

      <div class="row d-flex justify-content-between">
        <div class="col-12 col-md-5 ps-4 py-1">
          <span class="fw-bold">รหัสลูกค้า:</span>&nbsp;<span class="fst-normal">{{
            detail.cust_pcode
          }}</span>
        </div>
        <div class="col-12 col-md-5 ps-4 py-1">
          <span class="fw-bold">หมายเลขสัญญา:</span>&nbsp;<span class="fst-normal">{{
            detail.ptype == "P1" ? detail.contract_no : "รายละเอียดตามสัญญาด้านล่าง"
          }}</span>
        </div>
      </div>
      <div class="row d-flex justify-content-between">
        <div class="col-12 col-md-5 ps-4 py-1">
          <span class="fw-bold">ที่อยู่ลูกค้า:</span>&nbsp;<span class="fst-normal"
            >{{ detail.cust_pdesc }}
            <span v-if="detail.cust_ptype == 1">{{ detail.province_name }}</span></span
          >
        </div>
        <div class="col-12 col-md-5 ps-4 py-1">
          <span class="fw-bold">โทร:</span>&nbsp;<span class="fst-normal">{{
            detail.phone
          }}</span>
        </div>
      </div>
      <div class="row d-flex justify-content-between">
        <div class="col-12 ps-4 py-1">
          <span class="fw-bold">ระบบงาน:</span>&nbsp;<span class="fst-normal">{{
            detail.ptype == "P1" ? "Hardware" : "P.M."
          }}</span>
        </div>
      </div>
      <div class="row d-flex justify-content-between" v-if="detail.ptype=='P1'">
        <div class="col-12 col-md-5 ps-4 py-1">
          <span class="fw-bold">สินค้า:</span>&nbsp;<span class="fst-normal">{{
            detail.type_desc
          }}</span>
        </div>
        <div class="col-12 col-md-5 ps-4 py-1" >
          <span class="fw-bold">รุ่น:</span>&nbsp;<span class="fst-normal" >{{
            detail.pno
          }}</span>
        </div>
      </div>
      <div class="row d-flex justify-content-between" v-if="detail.ptype=='P1'">
        <div class="col-12 ps-4 py-1">
          <span class="fw-bold">หมายเลขเครื่อง:</span>&nbsp;<span class="fst-normal">{{
            detail.sv_sn
          }}</span>
        </div>
      </div>
      <div class="row mx-2 my-1">
        <div class="card col-12 ps-4 py-1">
          <span class="fw-bold">งาน /ปัญหา /อาการเสีย:</span>&nbsp;<span
            class="fst-normal"
          >
            <span style="text-align: justify" v-if="detail.ptype == 'P1'">
              {{ detail.sv_detail }} {{ detail.problem_sub2_desc }}
            </span>
            <ul v-if="detail.ptype == 'P3'">
              <li v-for="c in detail.contract.split('|')">{{ c }}</li>
            </ul>
          </span>
        </div>
      </div>
      <div class="row mx-2 my-1">
        <div class="card  col-12 ps-4 py-1">
          <span class="fw-bold">รายละเอียดดำเนินการ:</span>&nbsp;<span class="fst-normal">
            <ul v-if="detail.ptype == 'P1'" style="list-style-type: none">
              <li>1.ทำการตรวจสอบ {{ detail.sv_solve_detail }}</li>
              <li>2.ดำเนินการ {{ detail.sv_solve_detail2 }}</li>
              <li>3.ทำการทดสอบ {{ detail.sv_solve_detail3 }}</li>
              <li v-if="detail.flag_takeback == 1">4.นำอุปกรณ์กลับศูนย์บริการ</li>
            </ul>
          </span>
          <div v-if="detail.ptype=='P3'" class="px-3  w-100">
            บำรุงรักษาตามสัญญาโครงการ<br/>
            <br/>
          </div>
        </div>
      </div>
      <div class="row d-flex justify-content-between">
        <div class="col-12 col-md-5 ps-4 py-1">
          <span class="fw-bold">วันเวลาเริ่มบริการ:</span>&nbsp;<span class="fst-normal"
            >{{ detail.start_date }} {{ detail.start_time }}
          </span>
        </div>
        <div class="col-12 col-md-5 ps-4 py-1">
          <span class="fw-bold">วันเวลา เสร็จ:</span>&nbsp;<span class="fst-normal"
            >{{ detail.solve_date }} {{ detail.solve_time }}</span
          >
        </div>
      </div>
      <div class="row d-flex justify-content-between">
        <div class="col-12 ps-4 py-1">
          <span class="fw-bold">รวมเวลาบริการ:</span>&nbsp;<span class="fst-normal">
            {{ detail.usetime?.split(":")[0] }} ชั่วโมง
            {{ detail.usetime?.split(":")[1] }} นาที
          </span>
        </div>
      </div>
      
      <div class="row d-flex justify-content-center">
        <div class="col-12 ps-4 py-1" v-if="docs.length">
          <span class="fw-bold"><u>PART USAGE</u></span>
        </div>
        
        <div class="col-12  py-1">
          <ol class="list-group mx-2 list-group-numbered">
            <li v-if="doc2s.length" class="list-group-item d-flex justify-content-between align-items-start">
              <div class="ms-2 me-auto" style="font-size:14px;">
                <div class="fw-bold">หมายเลขเอกสาร: {{ doc2s[0]?.doc_no }}</div>
                <div class="row">
                  <div class="col-12 col-md-6"><span><u>รหัสอุปกรณ์:</u> {{ doc2s[0]?.pno }}</span>&nbsp;</div>
                  <div class="col-12 col-md-6"><span><u>รายละเอียด:</u> {{ doc2s[0]?.pno_desc }}</span>&nbsp;</div>
                  <div class="col-12 col-md-6"><span><u>จำนวน:</u> {{ doc2s[0].draw_amt }}</span>&nbsp;</div>
                  <div class="col-12 col-md-6"><span><u>หมายเลขเครื่อง:</u> {{ doc2s[0]?.sno }}</span>&nbsp;</div>
                </div>
              </div>
            </li>
            <li v-if="docs.length" class="list-group-item d-flex justify-content-between align-items-start">
              <div class="ms-2 me-auto" style="font-size:14px;">
                <div class="fw-bold">หมายเลขเอกสาร: {{ docs[0]?.doc_no }}</div>
                <div class="row">
                  <div class="col-12 col-md-6"><span><u>รหัสอุปกรณ์:</u> {{ docs[0]?.pno }}</span>&nbsp;</div>
                  <div class="col-12 col-md-6"><span><u>รายละเอียด:</u> {{ docs[0]?.pno_desc }}</span>&nbsp;</div>
                  <div class="col-12 col-md-6"><span><u>จำนวน:</u> 1</span>&nbsp;</div>
                  <div class="col-12 col-md-6"><span><u>หมายเลขเครื่อง:</u> {{ docs[0]?.sno }}</span>&nbsp;</div>
                </div>
              </div>
            </li>
          </ol>
        </div>
      </div>
      <div class="row d-flex justify-content-center">
        <div class="col-12 ps-4 py-1 " v-if="docs.length">
          <span class="fw-bold"><u>DEFECTIVE PART</u></span>
        </div>
        <div class="col-12   py-1" v-if="tags.length">
          <ol class="list-group mx-2 list-group-numbered ">
            <li class="list-group-item d-flex justify-content-between align-items-start">
              <div class="col-12 ms-2 me-auto" style="font-size:14px;">
                <div class="fw-bold">Tag no.: {{ tags[0]?.tag_no }}</div>
                <div class="row">
                  <div class="col-12 col-md-6"><span><u>อุปกรณ์:</u> {{ tags[0]?.pno_desc }}</span>&nbsp;</div>
                  <div class="col-12 col-md-6"><span><u>หมายเลขเครื่อง:</u> {{ tags[0]?.ret_sno }}</span>&nbsp;</div>
                </div>
              </div>
            </li>
          </ol>
        </div>
      </div>
      <div class="row d-flex justify-content-center">
        <div class="col-12 ps-4 py-1 " >
          <span class="fw-bold"><u>พนักงานผู้รับผิดชอบ</u></span>
        </div>
        <div class="col-12   py-1" >
          <ul class="mx-2">
            <li v-for=" e in Array.from(new Set([detail.thiname1, detail.thiname2, detail.thiname3]))
              .filter((it, i) => it)">{{ e }}</li>
          </ul>
        </div>
      </div>
      <qrcode
            :value="url"
            style="position: absolute; bottom: 25px; right:10px;"
            :width="100"
            :height="100"
            :qrOptions="{ typeNumber: 0, mode: 'Byte', errorCorrectionLevel: 'H' }"
            :imageOptions="{ hideBackgroundDots: true, imageSize: 0.4, margin: 0 }"
            :dotsOptions="{
              type: 'square',
              color: '#000000',
            }"
            imgclass="img-qr"
            myclass="my-qur"
          />
    </div>

    <div class="row">
      <div class="col-12 col-md-4 mx-auto text-center">
        <button class="btn btn-primary btn-sm me-1" @click="approve2()">อนุมัติ</button>
        <button class="btn btn-primary btn-sm me-1" @click="open(detail.sv_no)">
          พิมพ์
        </button>
        <button class="btn btn-primary btn-sm" @click="gotoCdg()">หน้าแรก</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted,ref } from "vue";
import { useService } from "./service.js";
import qrcode from "qrcode-vue3";
const {
  authStore,
  route,
  detail,
  tags,
  docs,
  doc2s,
  open,
  approve2,
  initDetail2,
  gotoCdg,
} = useService();
const url=ref('')
const empid = authStore.userData.ses_empid;
onMounted(async () => {
  url.value=`https://www.controldata.co.th/mpsicc/paperless/client/approve/${route.params['jobid']}/${empid}`;
  await initDetail2();
  console.log({url});
});
</script>
<style>
.swal2-label {
  font-size: 10px !important;
}
.swal2-title {
  font-size: 16px !important;
}
.swal2-confirm {
  font-size: 12px !important;
}
.swal2-cancel {
  font-size: 12px !important;
}
.swal2-validation-message {
  font-size: 12px !important;
}
</style>
