<template>
  <div style="font-family: sarabun" class="mainx">
    <div style="width: 100%">
      <div style="width: 30%; float: left">
        <div
          style="            padding: 0px 0px;
            margin-left: 25px;
            font-weight: bold;
            font-size: 20px;
            letter-spacing: -4px;
          "
        >
          CDG
        </div>
        <!-- <div style="width: 80%; ">
          Controldata ( Thailand ) Ltd.
        </div> -->
        <div style="width: 100%; text-align: left">
          <b
            >Controldata&nbsp;&nbsp;&nbsp;&nbsp;(&nbsp;Thailand&nbsp;&nbsp;)&nbsp;&nbsp;Ltd.</b
          >
        </div>
      </div>
      <div style="width: 47%; float: left; text-align: center; padding-top: 10px">
        <h6>SERVICE REPORT</h6>
      </div>
      <div style="width: 22%; float: right">
        <div style="width: 100%; text-align: right; padding-top: 30px">
          <b>SERVICE ID:</b> {{ detail.sv_no }}
        </div>
      </div>
    </div>
    <div style="clear: both; vertical-align: bottom; width: 100%"></div>
    <div style="width: 100%">
      <div style="width: 40%; float: right">
        <div style="width: 27%; font-weight: bold; float: left; text-align: center">
          รับแจ้ง วันที่ :
        </div>
        <div class="underline" style="width: 25%; float: left; text-align: center">
          {{ detail.ptype == "P1" ? detail.s_date : detail.ap_date }}
        </div>
        <div style="width: 23%; font-weight: bold; float: left; text-align: center">
          เวลา :
        </div>
        <div class="underline" style="width: 25%; float: right; text-align: center">
          {{ detail.ptype == "P1" ? detail.s_time : "08:00" }}
        </div>
      </div>
    </div>
    <div
      style="clear: both; vertical-align: bottom; width: 100%; margin-bottom: 3px"
    ></div>
    <div style="width: 100%; clear: both; vertical-align: bottom">
      <div style="float: left; width: 50%">
        <div style="width: 20%; font-weight: bold; float: left">
          <div style="width: 65%; float: left">ชื่อลูกค้า</div>
          <div style="width: 30%; float: right; text-align: right; padding-right: 2px">
            :
          </div>
        </div>
        <div class="underline" style="width: 80%; float: right; text-align: left">
          {{ detail.thicust }}
        </div>
      </div>
      <div style="float: right; width: 40%">
        <div style="width: 27%; font-weight: bold; float: left; text-align: center">
          นัดหมาย วันที่ :
        </div>
        <div class="underline" style="width: 25%; float: left; text-align: center">
          {{ detail.ap_date }}
        </div>
        <div style="width: 23%; font-weight: bold; float: left; text-align: center">
          เวลา :
        </div>
        <div class="underline" style="width: 25%; float: right; text-align: center">
          {{ detail.ap_time }}
        </div>
      </div>
    </div>
    <div
      style="clear: both; vertical-align: bottom; width: 100%; margin-bottom: 3px"
    ></div>
    <div style="width: 100%">
      <div style="float: left; width: 50%">
        <div style="width: 20%; font-weight: bold; float: left">
          <div style="width: 65%; float: left">รหัสลูกค้า</div>
          <div style="width: 30%; float: right; text-align: right; padding-right: 2px">
            :
          </div>
        </div>
        <div class="underline" style="width: 80%; float: right; text-align: left">
          {{ detail.cust_pcode }}
        </div>
      </div>
      <div style="float: right; width: 40%"></div>
    </div>
    <div
      style="clear: both; vertical-align: bottom; width: 100%; margin-bottom: 3px"
    ></div>
    <div style="width: 100%">
      <div style="float: left; width: 100%">
        <div style="width: 16%; font-weight: bold; float: left">
          <div style="width: 75%; float: left">หมายเลขสัญญา</div>
          <div style="width: 15%; float: right; text-align: right; padding-right: 1px">
            :
          </div>
        </div>
        <div class="underline" style="width: 83%; float: right; text-align: left">
          {{ detail.ptype == "P1" ? detail.contract_no : "รายละเอียดตามสัญญาด้านล่าง" }}
        </div>
      </div>
    </div>
    <div
      style="clear: both; vertical-align: bottom; width: 100%; margin-bottom: 3px"
    ></div>
    <div style="width: 100%">
      <div style="float: left; width: 100%">
        <div style="width: 13%; font-weight: bold; float: left">
          <div style="width: 72%; float: left">ที่อยู่ ลูกค้า</div>
          <div style="width: 10%; float: right; text-align: right; padding-right: 2px">
            :
          </div>
        </div>
        <div class="underline" style="width: 87%; float: right; text-align: left">
          {{ detail.cust_pdesc }}
          <span v-if="detail.cust_ptype == 1">{{ detail.province_name }}</span>
        </div>
      </div>
    </div>
    <div
      style="clear: both; vertical-align: bottom; width: 100%; margin-bottom: 3px"
    ></div>
    <div style="width: 100%">
      <div style="float: left; width: 50%">
        <div style="width: 20%; font-weight: bold; float: left">
          <div style="width: 65%; float: left">โทร</div>
          <div style="width: 30%; float: right; text-align: right; padding-right: 2px">
            :
          </div>
        </div>
        <div class="underline" style="width: 80%; float: right; text-align: left">
          &nbsp;{{ detail.phone }}
        </div>
      </div>
      <div style="float: right; width: 40%"></div>
    </div>
    <div
      style="clear: both; vertical-align: bottom; width: 100%; margin-bottom: 3px"
    ></div>
    <div class="dservice" style="position: relative">
      <div class="hservice">SERVICE</div>
      <div style="width: 100%">
        <div style="width: 50%; float: left">
          <div style="width: 33%; float: left">
            <input type="checkbox" value="1" />&nbsp;รับประกัน
          </div>
          <div style="width: 33%; float: left">
            <input type="checkbox" value="1" checked="true" />&nbsp;สัญญาบำรุงรักษา
          </div>
          <div style="width: 33%; float: left">
            <input type="checkbox" value="1" />&nbsp;PERCALL
          </div>
        </div>
        <div style="width: 50%; float: right; text-align: right; padding-top: 4px">
          อื่น
          ๆ:..........................................................................................................
        </div>
      </div>
      <div
        style="clear: both; vertical-align: bottom; width: 100%; margin-bottom: 3px"
      ></div>
      <div style="width: 100%"></div>
      <div style="width: 100%">
        <div style="width: 11%; float: left">
          <input type="checkbox" value="1" :checked="detail.ptype == 'P1'" />&nbsp;HW
        </div>
        <div style="width: 11%; float: left">
          <input type="checkbox" value="1" />&nbsp;APP
        </div>
        <div style="width: 11%; float: left">
          <input type="checkbox" value="1" />&nbsp;SYS
        </div>
        <div style="width: 11%; float: left">
          <input type="checkbox" value="1" />&nbsp;DBA
        </div>
        <div style="width: 11%; float: left">
          <input type="checkbox" value="1" />&nbsp;NET
        </div>
        <div style="width: 11%; float: left">
          <input type="checkbox" value="1" :checked="detail.ptype == 'P3'" />&nbsp;PM
        </div>
        <div style="width: 11%; float: left">
          <input type="checkbox" value="1" />&nbsp;PROJECT
        </div>
        <!-- <div style="width: 11%; float: left">
          <input type="checkbox" value="1" />&nbsp;HW
        </div> -->
        <div style="width: 11%; float: left">
          <input type="checkbox" value="1" />&nbsp;อื่น ๆ
        </div>
      </div>
      <div
        style="clear: both; vertical-align: bottom; width: 100%; margin-bottom: 3px"
      ></div>
      <div style="width: 100%">
        <div style="float: left; width: 50%">
          <div style="width: 20%; font-weight: bold; float: left">
            <div style="width: 65%; float: left">ระบบงาน</div>
            <div style="width: 30%; float: right; text-align: right; padding-right: 2px">
              :
            </div>
          </div>
          <div class="underline" style="width: 80%; float: right; text-align: left">
            {{ detail.ptype == "P1" ? "Hardware" : "P.M." }}
          </div>
        </div>
        <div style="float: right; width: 40%">
          <div style="width: 30%; font-weight: bold; float: left; text-align: center">
            หมายเลขปัญหา
          </div>
          <div class="underline" style="width: 70%; float: left; text-align: left">
            {{ detail.sv_no }}
          </div>
        </div>
      </div>
      <div
        style="clear: both; vertical-align: bottom; width: 100%; margin-bottom: 3px"
      ></div>
      <div style="width: 100%">
        <div style="float: left; width: 33%">
          <div style="width: 20%; font-weight: bold; float: left">
            <div style="width: 100%; float: left">สินค้า</div>
          </div>
          <div class="underline" style="width: 80%; float: right; text-align: left">
            &nbsp;{{ detail.type_desc }}
          </div>
        </div>
        <div style="float: left; width: 25%">
          <div style="width: 10%; font-weight: bold; float: left">
            <div style="width: 100%; float: left; text-align: left">รุ่น</div>
          </div>
          <div class="underline" style="width: 80%; float: left; text-align: left">
            &nbsp;{{ detail.pno }}
          </div>
        </div>
        <div style="float: right; width: 40%">
          <div style="width: 30%; font-weight: bold; float: left; text-align: center">
            หมายเลขเครื่อง
          </div>
          <div class="underline" style="width: 70%; float: left; text-align: left">
            &nbsp;{{ detail.sv_sn }}
          </div>
        </div>
      </div>

      <div
        style="clear: both; vertical-align: bottom; width: 100%; margin-bottom: 3px"
      ></div>

      <div style="width: 100%; height: 150px">
        <b>งาน /ปัญหา /อาการเสีย:&nbsp; </b>
        <span style="text-align: justify" v-if="detail.ptype == 'P1'">
          {{ detail.sv_detail }} {{ detail.problem_sub2_desc }}
        </span>
        <ul v-if="detail.ptype == 'P3'">
          <li v-for="c in detail.contract.split('|')">{{ c }}</li>
        </ul>
      </div>
      <div
        style="clear: both; vertical-align: bottom; width: 100%; margin-bottom: 3px"
      ></div>

      <div style="width: 100%; height: 150px">
        <b>รายละเอียดดำเนินการ:&nbsp; </b>
        <span v-if="detail.ptype == 'P1'">
          1.ทำการตรวจสอบ {{ detail.sv_solve_detail }} <br />
          2.ดำเนินการ {{ detail.sv_solve_detail2 }} <br />
          3.ทำการทดสอบ {{ detail.sv_solve_detail3 }} <br />
          <span v-if="detail.flag_takeback == 1">4.นำอุปกรณ์กลับศูนย์บริการ</span>
        </span>
      </div>
      <div
        style="clear: both; vertical-align: bottom; width: 100%; margin-bottom: 3px"
      ></div>
      <div style="width: 100%">
        <div style="width: 55%; float: left">
          <div style="width: 22%; float: left; font-weight: bold">เวลาเริ่ม บริการ</div>
          <div class="underline" style="width: 17%; float: left">
            &nbsp;{{ detail.start_time }}
          </div>
          <div style="width: 12%; float: left; font-weight: bold">เสร็จสิ้น</div>
          <div class="underline" style="width: 20%; float: left">
            &nbsp;{{ detail.solve_time }}
          </div>
        </div>
        <div style="width: 45%; float: right">
          <div style="width: 25%; float: left; font-weight: bold">รวมเวลาบริการ</div>
          <div class="underline" style="width: 20%; float: left">
            &nbsp;{{ detail.usetime?.split(":")[0] }}
          </div>
          <div style="width: 12%; float: left; font-weight: bold">ชั่วโมง</div>
          <div class="underline" style="width: 20%; float: left">
            &nbsp;{{ detail.usetime?.split(":")[1] }}
          </div>
          <div style="width: 22%; float: left; font-weight: bold">นาที</div>
        </div>
      </div>
      <div
        style="clear: both; vertical-align: bottom; width: 100%; margin-bottom: 3px"
      ></div>
    </div>
    <div class="dusage" style="position: relative">
      <div class="husage">PART USAGE</div>
      <div style="text-align: center; width: 99%; margin-left: auto; margin-right: auto">
        <table>
          <thead>
            <tr>
              <th width="15%">รหัสอุปกรณ์</th>
              <th width="40%">รายละเอียด</th>
              <th width="5%">จำนวน</th>
              <th width="20%">หมายเลขเครื่อง</th>
              <th width="20%">เลขที่ใบเบิก</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="doc2s.length">
              <td class="underline">{{ doc2s[0].pno }}</td>
              <td class="underline">{{ doc2s[0].pno_desc }}</td>
              <td class="underline">{{ doc2s[0].draw_amt }}</td>
              <td class="underline">-</td>
              <td class="underline">{{ doc2s[0].doc_no }}</td>
            </tr>
            <tr>
              <td class="underline">{{ docs[0]?.pno }}</td>
              <td class="underline">{{ docs[0]?.pno_desc }}</td>
              <td class="underline">
                {{ detail.ptype == "P1" && docs?.length > 0 ? "1" : "&nbsp;" }}
              </td>
              <td class="underline">{{ docs[0]?.sno }}</td>
              <td class="underline">{{ docs[0]?.doc_no }}</td>
            </tr>
            <tr>
              <td class="underline">&nbsp;</td>
              <td class="underline">&nbsp;</td>
              <td class="underline">&nbsp;</td>
              <td class="underline">&nbsp;</td>
              <td class="underline">&nbsp;</td>
            </tr>
            <tr v-if="doc2s.length < 1">
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style="width: 100%; font-weight: bold; font-size: 16px; padding-left: 10px">
        DEFECTIVE PART
      </div>
      <div style="width: 100%">
        <div style="float: left; width: 42%">
          <div style="width: 20%; font-weight: bold; float: left">
            <div style="width: 100%; float: left; padding-left: 10px">อุปกรณ์</div>
          </div>
          <div class="underline" style="width: 80%; float: right; text-align: left">
            &nbsp;{{ tags[0]?.pno_desc }}
          </div>
        </div>
        <div style="float: left; width: 39%">
          <div style="width: 30%; font-weight: bold; float: left">
            <div style="width: 100%; float: left; text-align: left">หมายเลขเครื่อง</div>
          </div>
          <div class="underline" style="width: 70%; float: left; text-align: left">
            &nbsp;{{ tags[0]?.ret_sno }}
          </div>
        </div>
        <div style="float: right; width: 18%">
          <div style="width: 30%; font-weight: bold; float: left; text-align: center">
            Tag no
          </div>
          <div class="underline" style="width: 70%; float: left; text-align: left">
            &nbsp;{{ tags[0]?.tag_no }}
          </div>
        </div>
      </div>
      <div
        style="clear: both; vertical-align: bottom; width: 100%; margin-bottom: 3px"
      ></div>
      <div style="width: 100%">
        <div style="float: left; width: 42%">
          <div style="width: 20%; font-weight: bold; float: left">
            <div style="width: 100%; float: left; padding-left: 10px">อุปกรณ์</div>
          </div>
          <div class="underline" style="width: 80%; float: right; text-align: left">
            &nbsp;
          </div>
        </div>
        <div style="float: left; width: 39%">
          <div style="width: 30%; font-weight: bold; float: left">
            <div style="width: 100%; float: left; text-align: left">หมายเลขเครื่อง</div>
          </div>
          <div class="underline" style="width: 70%; float: left; text-align: left">
            &nbsp;
          </div>
        </div>
        <div style="float: right; width: 18%">
          <div style="width: 30%; font-weight: bold; float: left; text-align: center">
            Tag no
          </div>
          <div class="underline" style="width: 70%; float: left; text-align: left">
            &nbsp;
          </div>
        </div>
      </div>
    </div>
    <div
      style="clear: both; vertical-align: bottom; width: 100%; margin-bottom: 3px"
    ></div>
    <div style="width: 100%">
      <div style="width: 50%; float: left">
        <div style="width: 21%; float: left">พนักงานบริษัท :</div>
        <div class="underline" style="width: 78%; float: left">&nbsp;</div>
      </div>
      <div style="width: 50%; float: right">
        <div style="width: 21%; float: left; text-align: right">ลูกค้า :</div>
        <div class="underline" style="width: 78%; float: left">&nbsp;</div>
      </div>
    </div>
    <div
      style="clear: both; vertical-align: bottom; width: 100%; margin-bottom: 3px"
    ></div>
    <div style="width: 100%">
      <div style="width: 50%; float: left">
        <div style="width: 21%; float: left; text-align: right">(</div>
        <div class="underline" style="width: 71%; float: left; text-align: center">
          &nbsp;{{
            Array.from(new Set([detail.thiname1, detail.thiname2, detail.thiname3]))
              .filter((it, i) => it !== "" && it !== null)
              .join(",")
          }}
        </div>
        <div style="width: 7%; float: left; text-align: left">)</div>
      </div>
      <div style="width: 50%; float: left">
        <div style="width: 21%; float: left; text-align: right">(</div>
        <div class="underline" style="width: 71%; float: left">&nbsp;</div>
        <div style="width: 7%; float: left; text-align: left">)</div>
      </div>
    </div>
    <div
      style="clear: both; vertical-align: bottom; width: 100%; margin-bottom: 142px"
    ></div>
    <div class="ft">CDG GROUP,CONTROLDATA (THAILAND) LTD. MOI SITE</div>
  </div>
  <div class="row">
    <div class="col-12 col-md-4 mx-auto text-center">
      <button class="btn btn-primary btn-sm me-1" @click="approve()">อนุมัติ</button>
      <button class="btn btn-primary btn-sm me-1" @click="open(detail.sv_no)">
        พิมพ์
      </button>
      <button
        class="btn btn-primary btn-sm"
        @click="gotoCdg()"
      >
        หน้าแรก
      </button>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from "vue";
import { useService } from "./service.js";
const {
  detail,
  tags,
  docs,
  doc2s,
  open,
  approve,
  initDetail,
} = useService();
onMounted(async () => {
  initDetail()
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
.mainx {
  position: relative;
  font-size: 12px;
  width: 70%;
  margin: auto auto;
  padding: 12px;
  border-style: solid;
  border-color: #f6eded;
  border-width: 1px;
  background-color: #fff;
}
div.underline {
  border-bottom-style: dotted;
  border-bottom-width: 1px;
  border-bottom-color: gray;
}
div.dservice {
  margin-top: 20px;
  border: 1px solid black;
  border-radius: 5px;
  width: 100%;
  height: 440px;
  padding: 5px 5px;
  margin-left: auto;
  margin-right: auto;
}
.dservice input[type="checkbox"] {
  width: 10px;
  height: 10px;
}
div.hservice {
  position: absolute;
  top: -11px;
  right: 47%;
  background-color: white;
  z-index: 9999;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  padding-left: 5px;
}
div.dusage {
  margin-top: 15px;
  border: 1px solid black;
  border-radius: 5px;
  width: 100%;
  height: 230px;
  padding: 5px 5px;
}
div.husage {
  position: absolute;
  top: -11px;
  right: 45%;
  background-color: white;
  z-index: 999;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  padding-left: 5px;
}

table,
td,
th {
  border: 1px solid #ddd;
  text-align: left;
}

table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  padding: 3px;
}
.ft {
  width: 96%;
  position: absolute;
  bottom: 7px;
  border-top-style: solid;
  border-top-width: 1px;
  text-align: right;
  z-index: 990;
}
.l {
  /* ความสูงของตัวอักษร เท่ากับความสูงของเส้นประ */
  line-height: 14px;
  /* สีพื้นหลัง สีเดียวกันกับการวาด grid */
  background-color: #fff;
  /* ขนาดของ grid 2em เท่ากับความสูงของตัวอีกษร */
  background-size: 2px 2px, 2px 14px;
  /* วาด grid */
  background-image: linear-gradient(to bottom, transparent 5px, #fff 5px),
    linear-gradient(to right, #fff 1px, transparent 1px),
    linear-gradient(to right, transparent 2px, #fff 2px),
    linear-gradient(to bottom, gray 1px, transparent 1px);
  /* ลบเส้นประที่ขอบ */
  box-shadow: 0 0 0 1px inset #fff;
  /* ใช้ padding แทน margin ในกรณีที่ต้องการให้ข้อความห่างจากขอบ */
  padding: 0px;
  margin: 0;
}
</style>
